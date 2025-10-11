import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
    loginWithGoogle: async () => { },
    refreshUser: async () => { },
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        try {
            await authService.signup(email, password, name);
            const currentUser = await authService.getCurrentUser();

            // Create user profile in database
            try {
                await userService.createUserProfile(currentUser.$id, name, email);
                console.log('User profile created successfully');
            } catch (profileError) {
                console.warn('Failed to create user profile:', profileError);
                // Don't fail the signup if profile creation fails
            }

            setUser(currentUser);
            return { success: true };
        } catch (error) {
            console.error('Signup failed:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout failed:', error);
            return { success: false, error: error.message };
        }
    };

    const loginWithGoogle = async () => {
        try {
            // This will redirect to Google OAuth, so no need to handle response here
            await authService.loginWithGoogle();
            return { success: true };
        } catch (error) {
            console.error('Google login failed:', error);
            return { success: false, error: error.message };
        }
    };

    const refreshUser = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return { success: true, user: currentUser };
        } catch (error) {
            console.error('Refresh user failed:', error);
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        loginWithGoogle,
        refreshUser,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
