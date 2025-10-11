import { databases } from "../lib/appwrite";
import { ID, Query } from "appwrite";

const DATABASE_ID = "main_db";
const USER_PROFILES_COLLECTION_ID = "user_profiles";

class UserService {
  /**
   * Create a user profile in the database
   * @param {string} userId - Appwrite user ID
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @returns {Promise} User profile document
   */
  async createUserProfile(userId, name, email) {
    try {
      const userProfile = await databases.createDocument(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        ID.unique(),
        {
          user_id: userId,
          name: name,
          email: email,
          joined_at: new Date().toISOString(),
        }
      );

      return userProfile;
    } catch (error) {
      console.error("Create user profile error:", error);
      throw error;
    }
  }

  /**
   * Get user profile by user ID
   * @param {string} userId - Appwrite user ID
   * @returns {Promise} User profile document or null
   */
  async getUserProfile(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        [Query.equal("user_id", userId)]
      );

      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.error("Get user profile error:", error);
      return null;
    }
  }

  /**
   * List all user profiles
   * @param {number} limit - Number of users to fetch (default: 25)
   * @param {number} offset - Offset for pagination (default: 0)
   * @returns {Promise} List of user profiles
   */
  async listUserProfiles(limit = 25, offset = 0) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc("joined_at")]
      );

      return {
        users: response.documents,
        total: response.total,
      };
    } catch (error) {
      console.error("List user profiles error:", error);
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {string} documentId - Document ID of the user profile
   * @param {Object} data - Data to update
   * @returns {Promise} Updated user profile
   */
  async updateUserProfile(documentId, data) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        documentId,
        data
      );
    } catch (error) {
      console.error("Update user profile error:", error);
      throw error;
    }
  }

  /**
   * Delete user profile
   * @param {string} documentId - Document ID of the user profile
   * @returns {Promise}
   */
  async deleteUserProfile(documentId) {
    try {
      return await databases.deleteDocument(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        documentId
      );
    } catch (error) {
      console.error("Delete user profile error:", error);
      throw error;
    }
  }

  /**
   * Search users by name or email
   * @param {string} query - Search query
   * @returns {Promise} Matching user profiles
   */
  async searchUsers(query) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        [Query.search("name", query), Query.orderDesc("joined_at")]
      );

      return response.documents;
    } catch (error) {
      console.error("Search users error:", error);
      throw error;
    }
  }

  /**
   * Ensure user profile exists, create if it doesn't
   * @param {string} userId - Appwrite user ID
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @returns {Promise} User profile document
   */
  async ensureUserProfile(userId, name, email) {
    try {
      // Try to get existing profile
      let profile = await this.getUserProfile(userId);

      // If profile doesn't exist, create it
      if (!profile) {
        console.log("Creating user profile for:", userId);
        profile = await this.createUserProfile(userId, name, email);
        console.log("User profile created:", profile);
      } else {
        console.log("User profile already exists:", profile);
      }

      return profile;
    } catch (error) {
      console.error("Ensure user profile error:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
