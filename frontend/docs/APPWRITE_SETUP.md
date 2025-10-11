# Appwrite Integration Guide for ConneQt

This guide will help you set up Appwrite authentication for the ConneQt project.

## Prerequisites

- Node.js and npm installed
- An Appwrite Cloud account (or self-hosted Appwrite instance)

## Setup Instructions

### 1. Create an Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) and sign up/login
2. Create a new project
3. Note down your **Project ID** from the project settings

### 2. Configure Web Platform

1. In your Appwrite project dashboard, go to **Settings** → **Platforms**
2. Click **Add Platform** → **Web**
3. Add your application hostname:
   - For local development: `http://localhost:5173` (or your Vite dev server port)
   - For production: Your deployed domain (e.g., `https://yourapp.com`)

### 3. Enable Authentication Methods

1. Go to **Auth** → **Settings** in your Appwrite dashboard
2. Enable **Email/Password** authentication
3. (Optional) Configure email templates for password recovery and email verification
4. (Optional) Enable other OAuth providers if needed (Google, GitHub, etc.)

### 4. Configure Environment Variables

1. In the `frontend` directory, you'll find a `.env` file
2. Update it with your Appwrite credentials:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
```

Replace `your_project_id_here` with your actual Appwrite Project ID.

**Note:** If you're using a self-hosted Appwrite instance, change the endpoint URL accordingly.

### 5. Install Dependencies

```bash
cd frontend
npm install
```

### 6. Run the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

### Authentication Files

```
frontend/src/
├── lib/
│   └── appwrite.js              # Appwrite client configuration
├── services/
│   └── authService.js           # Authentication service methods
├── context/
│   └── AuthContext.jsx          # Global authentication state management
├── components/
│   └── ProtectedRoute.jsx       # Route guard for authenticated pages
└── pages/
    └── AuthPage.jsx             # Login/Signup page
```

## Features Implemented

### ✅ User Authentication

- **Signup**: Create new user accounts with email, password, and name
- **Login**: Authenticate users with email and password
- **Logout**: End user sessions securely
- **Session Persistence**: Automatically restore user sessions on page reload
- **Protected Routes**: Redirect unauthenticated users to login page

### ✅ Error Handling

- Network error handling
- Invalid credentials detection
- Password validation (minimum 8 characters)
- Duplicate email detection
- Session expiration handling
- Rate limiting protection

### ✅ User Experience

- Loading states during authentication
- Error messages with clear feedback
- Automatic redirect after successful authentication
- User profile display with logout option
- Session check on app initialization

## Authentication Service API

The `authService` provides the following methods:

```javascript
// Sign up a new user
await authService.signup(email, password, name);

// Login user
await authService.login(email, password);

// Logout current user
await authService.logout();

// Get current logged-in user
const user = await authService.getCurrentUser();

// Check if user is authenticated
const isAuth = await authService.isAuthenticated();

// Get current session
const session = await authService.getSession();

// Update user name
await authService.updateName(newName);

// Update user email
await authService.updateEmail(newEmail, currentPassword);

// Update user password
await authService.updatePassword(newPassword, oldPassword);

// Send password recovery email
await authService.sendPasswordRecovery(email);
```

## Using Authentication Context

The `AuthContext` provides global authentication state:

```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, loading, login, signup, logout, isAuthenticated } = useAuth();

  // user: Current user object or null
  // loading: Boolean indicating auth check in progress
  // isAuthenticated: Boolean indicating if user is logged in
  // login, signup, logout: Authentication methods

  return (
    <div>
      {isAuthenticated ? <p>Welcome, {user.name}!</p> : <p>Please log in</p>}
    </div>
  );
}
```

## Protected Routes

Wrap any route that requires authentication with `ProtectedRoute`:

```javascript
import ProtectedRoute from "./components/ProtectedRoute";

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

## Security Best Practices

1. **Never commit `.env` files**: The `.env` file is already in `.gitignore`
2. **Use strong passwords**: Enforce minimum 8 characters (already implemented)
3. **Enable email verification**: Configure in Appwrite dashboard for production
4. **Set up rate limiting**: Configure in Appwrite dashboard to prevent brute force attacks
5. **Use HTTPS**: Always use HTTPS in production
6. **Session management**: Sessions expire automatically based on Appwrite settings

## Common Issues and Solutions

### Issue: "Invalid credentials" error on login

**Solution**: Verify that:

- The email and password are correct
- The user account exists in Appwrite
- Email verification is not required (or the email is verified)

### Issue: CORS errors

**Solution**: Ensure you've added your application hostname to the Web Platform in Appwrite settings.

### Issue: "Project not found" error

**Solution**: Double-check your `VITE_APPWRITE_PROJECT_ID` in the `.env` file.

### Issue: Session not persisting after page reload

**Solution**: Ensure cookies are enabled in your browser and you're not blocking third-party cookies.

## Database Integration (Future Enhancement)

To add database functionality:

1. Create a database in Appwrite dashboard
2. Create collections for your data models
3. Define attributes for each collection
4. Set up appropriate permissions
5. Use the `databases` export from `lib/appwrite.js`:

```javascript
import { databases } from "../lib/appwrite";

// Create a document
await databases.createDocument("database_id", "collection_id", "unique()", {
  field: "value",
});

// List documents
const documents = await databases.listDocuments("database_id", "collection_id");
```

## Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Web SDK](https://appwrite.io/docs/sdks#client)
- [Appwrite Authentication Guide](https://appwrite.io/docs/authentication)
- [Appwrite Community Discord](https://discord.com/invite/appwrite)

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your Appwrite configuration
3. Review the Appwrite documentation
4. Check Appwrite service status
5. Join the Appwrite Discord community for help

---

**Note**: Remember to update the `.env` file with your actual Appwrite Project ID before running the application!
