import { account } from "../lib/appwrite";
import { ID } from "appwrite";

class AuthService {
  /**
   * Create a new user account
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User full name
   * @returns {Promise} User account object
   */
  async signup(email, password, name) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Automatically log in after signup
      if (userAccount) {
        return await this.login(email, password);
      }

      return userAccount;
    } catch (error) {
      console.error("Signup error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Session object
   */
  async login(email, password) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Logout current user session
   * @returns {Promise}
   */
  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Get currently logged in user
   * @returns {Promise} User object or null
   */
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      // User not logged in
      if (error.code === 401) {
        return null;
      }
      console.error("Get current user error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current active session
   * @returns {Promise} Session object or null
   */
  async getSession() {
    try {
      return await account.getSession("current");
    } catch (error) {
      if (error.code === 401) {
        return null;
      }
      console.error("Get session error:", error);
      return null;
    }
  }

  /**
   * Update user name
   * @param {string} name - New name
   * @returns {Promise} Updated user object
   */
  async updateName(name) {
    try {
      return await account.updateName(name);
    } catch (error) {
      console.error("Update name error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Update user email
   * @param {string} email - New email
   * @param {string} password - Current password
   * @returns {Promise} Updated user object
   */
  async updateEmail(email, password) {
    try {
      return await account.updateEmail(email, password);
    } catch (error) {
      console.error("Update email error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Update user password
   * @param {string} newPassword - New password
   * @param {string} oldPassword - Current password
   * @returns {Promise} Updated user object
   */
  async updatePassword(newPassword, oldPassword) {
    try {
      return await account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error("Update password error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Send password recovery email
   * @param {string} email - User email
   * @returns {Promise}
   */
  async sendPasswordRecovery(email) {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      return await account.createRecovery(email, redirectUrl);
    } catch (error) {
      console.error("Password recovery error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Complete password recovery
   * @param {string} userId - User ID
   * @param {string} secret - Recovery secret
   * @param {string} password - New password
   * @returns {Promise}
   */
  async completePasswordRecovery(userId, secret, password) {
    try {
      return await account.updateRecovery(userId, secret, password);
    } catch (error) {
      console.error("Complete password recovery error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Handle and format Appwrite errors
   * @param {Error} error - Appwrite error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    let message = "An unexpected error occurred. Please try again.";

    if (error.message) {
      // Common Appwrite error messages
      if (error.message.includes("Invalid credentials")) {
        message = "Invalid email or password. Please try again.";
      } else if (error.message.includes("user with the same email")) {
        message = "An account with this email already exists.";
      } else if (error.message.includes("Password must be")) {
        message = "Password must be at least 8 characters long.";
      } else if (error.message.includes("Invalid email")) {
        message = "Please enter a valid email address.";
      } else if (error.message.includes("Network request failed")) {
        message = "Network error. Please check your connection.";
      } else if (error.code === 401) {
        message = "Your session has expired. Please login again.";
      } else if (error.code === 429) {
        message = "Too many requests. Please try again later.";
      } else {
        message = error.message;
      }
    }

    const formattedError = new Error(message);
    formattedError.code = error.code;
    formattedError.type = error.type;
    return formattedError;
  }
}

const authService = new AuthService();
export default authService;
