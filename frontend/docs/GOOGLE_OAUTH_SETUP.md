# Google OAuth Setup Guide

This guide will help you configure Google OAuth authentication for your ConneQt application.

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one

### 1.2 Enable Google+ API
1. Go to **APIs & Services** → **Library**
2. Search for "Google+ API" or "People API"
3. Click on it and press **Enable**

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in required fields:
     - App name: `ConneQt`
     - User support email: Your email
     - Developer contact information: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed

4. Create OAuth client ID:
   - Application type: **Web application**
   - Name: `ConneQt Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://your-production-domain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:5173/oauth/callback` (for development)
     - `https://your-production-domain.com/oauth/callback` (for production)

5. Click **Create**
6. Copy the **Client ID** and **Client Secret**

## Step 2: Configure Appwrite OAuth

### 2.1 Access Appwrite Console
1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io/)
2. Select your `conneqt` project

### 2.2 Enable Google OAuth Provider
1. Navigate to **Auth** → **Settings**
2. Find **OAuth2 Providers** section
3. Enable **Google**
4. Enter your credentials:
   - **App ID**: Your Google OAuth Client ID
   - **App Secret**: Your Google OAuth Client Secret

5. Click **Update**

## Step 3: Configure Redirect URLs

### 3.1 Update Platform Settings
1. In Appwrite Console, go to **Settings** → **Platforms**
2. Find your Web platform
3. Make sure the hostname includes your OAuth callback:
   - For development: `http://localhost:5173`
   - For production: `https://your-domain.com`

## Step 4: Test the Integration

### 4.1 Start Development Server
```bash
cd frontend
npm run dev
```

### 4.2 Test OAuth Flow
1. Go to `http://localhost:5173/auth`
2. Click **Continue with Google**
3. You should be redirected to Google's OAuth consent screen
4. After granting permissions, you should be redirected back to your app
5. The app should automatically log you in and redirect to `/home`

## Step 5: Production Deployment

### 5.1 Update Environment Variables
Make sure your production environment has the correct Appwrite configuration:

```env
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=conneqt
```

### 5.2 Update Google OAuth Settings
1. Go back to Google Cloud Console
2. Update your OAuth client settings:
   - Add your production domain to **Authorized JavaScript origins**
   - Add your production callback URL to **Authorized redirect URIs**

### 5.3 Update Appwrite Platform Settings
1. In Appwrite Console, add your production domain to the Web platform
2. Verify the OAuth callback URL is accessible

## Troubleshooting

### Common Issues

#### 1. "redirect_uri_mismatch" Error
**Problem**: The redirect URI in the request doesn't match any registered redirect URIs.

**Solution**: 
- Check that your callback URL in Google Cloud Console matches exactly: `http://localhost:5173/oauth/callback`
- Ensure the protocol (http/https) matches
- Verify there are no trailing slashes

#### 2. "access_denied" Error
**Problem**: User cancelled the OAuth flow or app is not approved.

**Solution**:
- Make sure the OAuth consent screen is properly configured
- Add test users if the app is in testing mode
- Check if all required scopes are properly configured

#### 3. "invalid_client" Error
**Problem**: The client credentials are incorrect.

**Solution**:
- Verify the Client ID and Client Secret in Appwrite Console
- Make sure you're using the correct Google Cloud project
- Regenerate credentials if necessary

#### 4. OAuth Callback Page Shows Loading Forever
**Problem**: The callback processing is failing.

**Solution**:
- Check browser console for errors
- Verify the user profile creation is working
- Check network requests in developer tools

#### 5. User Profile Not Created
**Problem**: OAuth login works but user profile is missing from database.

**Solution**:
- Check the database permissions
- Verify the user service is properly configured
- Look at console logs for error messages

### Development Tips

1. **Test with Incognito Mode**: Always test OAuth in incognito/private browsing mode to avoid cached sessions

2. **Check Network Tab**: Monitor the network requests in browser developer tools to debug OAuth flow

3. **Console Logging**: The app includes detailed console logging for debugging OAuth issues

4. **Database Verification**: Check the `user_profiles` collection in Appwrite Console to verify user data is being stored

## Security Considerations

1. **Never Commit Secrets**: Keep your Google OAuth Client Secret secure and never commit it to version control

2. **Use HTTPS in Production**: Always use HTTPS for production OAuth flows

3. **Validate Redirect URIs**: Only add trusted domains to your OAuth redirect URIs

4. **Scope Limitation**: Only request the minimum required OAuth scopes (`email`, `profile`, `openid`)

5. **Session Management**: The app properly handles session expiration and cleanup

## Additional Features

The implementation includes:

- ✅ **Automatic User Profile Creation**: OAuth users get profiles created in the database
- ✅ **Error Handling**: Comprehensive error handling for OAuth failures
- ✅ **Loading States**: User-friendly loading indicators during OAuth flow
- ✅ **Fallback Authentication**: Email/password authentication still works alongside OAuth
- ✅ **Session Persistence**: OAuth sessions persist across browser restarts
- ✅ **Logout Support**: Proper cleanup when users log out

## Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Verify all URLs and credentials are correct
3. Test in incognito mode
4. Check Appwrite Console logs
5. Refer to [Appwrite OAuth Documentation](https://appwrite.io/docs/authentication#oauth2)
6. Check [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

---

Your Google OAuth integration is now complete! Users can sign up and log in using their Google accounts seamlessly.