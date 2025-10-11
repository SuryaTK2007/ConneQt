import { databases } from "../lib/appwrite";
import { ID, Query } from "appwrite";
import GooglePeopleService from "./googlePeopleService";

const DATABASE_ID = "main_db";
const CONNECTIONS_COLLECTION_ID = "user_connections";
const ENHANCED_PROFILES_COLLECTION_ID = "enhanced_profiles";

/**
 * Connection Recommendation Service
 * Manages fetching Google connections and generating recommendations
 */
class ConnectionService {
  constructor() {
    this.googlePeople = new GooglePeopleService();
  }

  /**
   * Sync user's Google profile and connections data
   * @param {string} userId - Appwrite user ID
   * @returns {Promise<Object>} Sync results
   */
  async syncGoogleData(userId) {
    try {
      console.log("Starting Google data sync for user:", userId);

      // Fetch user's own profile from Google
      const userProfile = await this.googlePeople.getMyProfile();
      console.log("Fetched user profile:", userProfile);

      // Save/update enhanced profile
      await this.saveEnhancedProfile(userId, userProfile);

      // Fetch user's Google connections
      const connections = await this.googlePeople.getConnections();
      console.log(`Fetched ${connections.length} connections`);

      // Find connections that exist on ConneQt platform
      const platformConnections = await this.findPlatformConnections(
        connections
      );
      console.log(
        `Found ${platformConnections.length} connections who are ConneQt users`
      );

      // Save platform connections as recommendations
      await this.saveRecommendations(userId, platformConnections);

      return {
        success: true,
        userProfile,
        connectionsCount: connections.length,
        recommendationsCount: platformConnections.length,
        recommendations: platformConnections.slice(0, 10), // Return top 10 for immediate display
      };
    } catch (error) {
      console.error("Failed to sync Google data:", error);
      throw error;
    }
  }

  /**
   * Save or update user's enhanced profile
   * @param {string} userId - Appwrite user ID
   * @param {Object} profileData - Google profile data
   * @returns {Promise}
   */
  async saveEnhancedProfile(userId, profileData) {
    try {
      // Check if enhanced profile already exists
      const existingProfiles = await databases.listDocuments(
        DATABASE_ID,
        ENHANCED_PROFILES_COLLECTION_ID,
        [Query.equal("user_id", userId)]
      );

      const profileDoc = {
        user_id: userId,
        skills: profileData.skills || [],
        interests: profileData.interests || [],
        organizations: JSON.stringify(profileData.organizations || []),
        location: profileData.location || "",
        bio: profileData.bio || "",
        occupation: profileData.occupation || "",
        photo_url: profileData.photo || "",
        last_updated: new Date().toISOString(),
      };

      if (existingProfiles.documents.length > 0) {
        // Update existing profile
        await databases.updateDocument(
          DATABASE_ID,
          ENHANCED_PROFILES_COLLECTION_ID,
          existingProfiles.documents[0].$id,
          profileDoc
        );
      } else {
        // Create new profile
        await databases.createDocument(
          DATABASE_ID,
          ENHANCED_PROFILES_COLLECTION_ID,
          ID.unique(),
          profileDoc
        );
      }
    } catch (error) {
      console.error("Failed to save enhanced profile:", error);
      throw error;
    }
  }

  /**
   * Find Google connections that are ConneQt platform users
   * @param {Array} googleConnections - Array of Google connections
   * @returns {Promise<Array>} Array of connections who are ConneQt users
   */
  async findPlatformConnections(googleConnections) {
    try {
      console.log("Checking which Google connections are ConneQt users...");

      // Get all user profiles from ConneQt database
      const allUsersResponse = await databases.listDocuments(
        "main_db", // DATABASE_ID
        "user_profiles", // USER_PROFILES_COLLECTION_ID
        [Query.limit(1000)] // Get up to 1000 users
      );

      const conneQtUsers = allUsersResponse.documents;
      console.log(`Found ${conneQtUsers.length} ConneQt users in database`);

      // Create a map of ConneQt user emails for fast lookup
      const emailToUserMap = new Map();
      conneQtUsers.forEach((user) => {
        if (user.email) {
          emailToUserMap.set(user.email.toLowerCase(), user);
        }
      });

      // Find Google connections that match ConneQt users
      const platformConnections = [];

      for (const connection of googleConnections) {
        if (connection.email) {
          const conneQtUser = emailToUserMap.get(
            connection.email.toLowerCase()
          );

          if (conneQtUser) {
            // This Google contact is also a ConneQt user!
            platformConnections.push({
              ...connection,
              conneQtUserId: conneQtUser.user_id,
              conneQtName: conneQtUser.name,
              joinedAt: conneQtUser.joined_at,
              isConneQtUser: true,
              recommendationReasons: [
                "Friend on ConneQt",
                "In your Google contacts",
              ],
            });

            console.log(
              `✅ Found match: ${connection.name} (${connection.email}) is a ConneQt user`
            );
          }
        }
      }

      console.log(
        `Found ${platformConnections.length} Google contacts who are ConneQt users`
      );
      return platformConnections;
    } catch (error) {
      console.error("Failed to find platform connections:", error);
      return []; // Return empty array on error
    }
  }

  /**
   * Save connection recommendations to database
   * @param {string} userId - Appwrite user ID
   * @param {Array} recommendations - Array of connection recommendations
   * @returns {Promise}
   */
  async saveRecommendations(userId, recommendations) {
    try {
      // Clear existing recommendations for this user
      await this.clearExistingRecommendations(userId);

      // Save new recommendations
      const savePromises = recommendations.map(async (recommendation) => {
        const connectionDoc = {
          user_id: userId,
          connection_id: recommendation.id,
          connection_name: recommendation.name,
          connection_email: recommendation.email || "",
          similarity_score: 1.0, // Since these are all confirmed connections, set high score
          recommendation_reasons: recommendation.recommendationReasons || [],
          profile_data: JSON.stringify({
            photo: recommendation.photo,
            organizations: recommendation.organizations,
            location: recommendation.location,
            skills: recommendation.skills,
            interests: recommendation.interests,
            bio: recommendation.bio,
            occupation: recommendation.occupation,
            isConneQtUser: recommendation.isConneQtUser || false,
            conneQtUserId: recommendation.conneQtUserId || null,
            conneQtName: recommendation.conneQtName || null,
            joinedAt: recommendation.joinedAt || null,
          }),
          created_at: new Date().toISOString(),
        };

        return databases.createDocument(
          DATABASE_ID,
          CONNECTIONS_COLLECTION_ID,
          ID.unique(),
          connectionDoc
        );
      });

      await Promise.all(savePromises);
      console.log(
        `Saved ${recommendations.length} recommendations to database`
      );
    } catch (error) {
      console.error("Failed to save recommendations:", error);
      throw error;
    }
  }

  /**
   * Clear existing recommendations for a user
   * @param {string} userId - Appwrite user ID
   * @returns {Promise}
   */
  async clearExistingRecommendations(userId) {
    try {
      const existingConnections = await databases.listDocuments(
        DATABASE_ID,
        CONNECTIONS_COLLECTION_ID,
        [Query.equal("user_id", userId)]
      );

      const deletePromises = existingConnections.documents.map((doc) =>
        databases.deleteDocument(
          DATABASE_ID,
          CONNECTIONS_COLLECTION_ID,
          doc.$id
        )
      );

      await Promise.all(deletePromises);
      console.log(
        `Cleared ${existingConnections.documents.length} existing recommendations`
      );
    } catch (error) {
      console.error("Failed to clear existing recommendations:", error);
      // Don't throw here, as this is not critical
    }
  }

  /**
   * Get stored recommendations for a user
   * @param {string} userId - Appwrite user ID
   * @param {number} limit - Number of recommendations to fetch
   * @returns {Promise<Array>} Array of recommendations
   */
  async getStoredRecommendations(userId, limit = 20) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONNECTIONS_COLLECTION_ID,
        [
          Query.equal("user_id", userId),
          Query.orderDesc("similarity_score"),
          Query.limit(limit),
        ]
      );

      return response.documents.map((doc) => {
        const profileData = JSON.parse(doc.profile_data || "{}");
        return {
          id: doc.connection_id,
          name: doc.connection_name,
          email: doc.connection_email,
          similarityScore: doc.similarity_score,
          recommendationReasons: doc.recommendation_reasons || [],
          profileData,
          createdAt: doc.created_at,
          isConneQtUser: profileData.isConneQtUser || false,
          conneQtUserId: profileData.conneQtUserId || null,
          conneQtName: profileData.conneQtName || null,
          joinedAt: profileData.joinedAt || null,
        };
      });
    } catch (error) {
      console.error("Failed to get stored recommendations:", error);
      return [];
    }
  }

  /**
   * Get user's enhanced profile
   * @param {string} userId - Appwrite user ID
   * @returns {Promise<Object|null>} Enhanced profile or null
   */
  async getEnhancedProfile(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ENHANCED_PROFILES_COLLECTION_ID,
        [Query.equal("user_id", userId)]
      );

      if (response.documents.length === 0) {
        return null;
      }

      const profile = response.documents[0];
      return {
        userId: profile.user_id,
        skills: profile.skills || [],
        interests: profile.interests || [],
        organizations: JSON.parse(profile.organizations || "[]"),
        location: profile.location || "",
        bio: profile.bio || "",
        occupation: profile.occupation || "",
        photoUrl: profile.photo_url || "",
        lastUpdated: profile.last_updated,
      };
    } catch (error) {
      console.error("Failed to get enhanced profile:", error);
      return null;
    }
  }

  /**
   * Search for mentors based on criteria
   * @param {string} userId - Current user ID
   * @param {Object} criteria - Search criteria
   * @returns {Promise<Array>} Array of potential mentors
   */
  async findMentors(userId, criteria = {}) {
    try {
      const recommendations = await this.getStoredRecommendations(userId, 50);

      // Filter for potential mentors
      const mentors = recommendations.filter((connection) => {
        const profileData = connection.profileData || {};
        const reasons = connection.recommendationReasons || [];

        // Check if they're marked as potential mentor
        const isPotentialMentor = reasons.includes("Potential mentor");

        // Check if they have leadership experience
        const hasLeadership = profileData.organizations?.some(
          (org) =>
            org.title &&
            (org.title.toLowerCase().includes("manager") ||
              org.title.toLowerCase().includes("director") ||
              org.title.toLowerCase().includes("lead") ||
              org.title.toLowerCase().includes("senior") ||
              org.title.toLowerCase().includes("principal"))
        );

        // Apply additional criteria filters
        let matchesCriteria = true;

        if (criteria.skills && criteria.skills.length > 0) {
          const connectionSkills = profileData.skills || [];
          const hasMatchingSkills = criteria.skills.some((skill) =>
            connectionSkills.some((connSkill) =>
              connSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );
          matchesCriteria = matchesCriteria && hasMatchingSkills;
        }

        if (criteria.location) {
          const connectionLocation = profileData.location || "";
          const locationMatch = connectionLocation
            .toLowerCase()
            .includes(criteria.location.toLowerCase());
          matchesCriteria = matchesCriteria && locationMatch;
        }

        if (criteria.industry) {
          const connectionOrgs = profileData.organizations || [];
          const industryMatch = connectionOrgs.some((org) =>
            org.name.toLowerCase().includes(criteria.industry.toLowerCase())
          );
          matchesCriteria = matchesCriteria && industryMatch;
        }

        return (isPotentialMentor || hasLeadership) && matchesCriteria;
      });

      return mentors.slice(0, 10); // Return top 10 mentors
    } catch (error) {
      console.error("Failed to find mentors:", error);
      return [];
    }
  }

  /**
   * Get connection statistics for a user
   * @param {string} userId - Appwrite user ID
   * @returns {Promise<Object>} Connection statistics
   */
  async getConnectionStats(userId) {
    try {
      const [recommendations, enhancedProfile] = await Promise.all([
        this.getStoredRecommendations(userId, 1000),
        this.getEnhancedProfile(userId),
      ]);

      const conneQtUsers = recommendations.filter(
        (conn) => conn.isConneQtUser
      ).length;

      const googleContacts = recommendations.filter((conn) =>
        conn.recommendationReasons.includes("In your Google contacts")
      ).length;

      const mutualConnections = recommendations.filter((conn) =>
        conn.recommendationReasons.includes("Friend on ConneQt")
      ).length;

      return {
        totalRecommendations: recommendations.length,
        conneQtUsers,
        googleContacts,
        mutualConnections,
        hasEnhancedProfile: !!enhancedProfile,
        lastSyncDate: enhancedProfile?.lastUpdated || null,
      };
    } catch (error) {
      console.error("Failed to get connection stats:", error);
      return {
        totalRecommendations: 0,
        conneQtUsers: 0,
        googleContacts: 0,
        mutualConnections: 0,
        hasEnhancedProfile: false,
        lastSyncDate: null,
      };
    }
  }
}

const connectionService = new ConnectionService();
export default connectionService;
