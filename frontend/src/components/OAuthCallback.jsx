import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import userService from '../services/userService';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const { loading, refreshUser } = useAuth();
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                setProcessing(true);
                console.log('OAuth callback: Starting authentication process...');

                // Wait a moment for the session to be established
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Get the current user after OAuth login
                const currentUser = await authService.getCurrentUser();
                console.log('OAuth callback: Current user:', currentUser);

                if (currentUser) {
                    // Ensure user profile exists (create if not)
                    console.log('OAuth callback: Ensuring user profile exists...');
                    try {
                        await userService.ensureUserProfile(
                            currentUser.$id,
                            currentUser.name || 'Google User',
                            currentUser.email
                        );
                        console.log('OAuth callback: User profile is ready');
                    } catch (profileError) {
                        console.error('OAuth callback: Failed to ensure user profile:', profileError);
                        // Don't fail the login if profile creation fails
                        // User can still access the app and profile can be created later
                    }

                    // Refresh the user in AuthContext
                    console.log('OAuth callback: Refreshing user in context...');
                    await refreshUser();

                    console.log('OAuth callback: Redirecting to home page...');
                    // Redirect to home page
                    navigate('/home', { replace: true });
                } else {
                    console.error('OAuth callback: No user found after authentication');
                    setError('Authentication failed. Please try again.');
                    setTimeout(() => navigate('/auth'), 3000);
                }
            } catch (err) {
                console.error('OAuth callback error:', err);
                setError('Authentication failed: ' + err.message);
                setTimeout(() => navigate('/auth'), 3000);
            } finally {
                setProcessing(false);
            }
        };

        // Only handle callback once when loading is complete
        if (!loading && processing) {
            handleOAuthCallback();
        }
    }, [loading, navigate, processing]);

    if (loading || processing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-400">Completing authentication...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authentication Failed</h2>
                        <p className="text-gray-600 dark:text-gray-400">{error}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Redirecting to login page...</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default OAuthCallback;