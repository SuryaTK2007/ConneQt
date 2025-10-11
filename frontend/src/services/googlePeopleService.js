import { account } from "../lib/appwrite";

/**
 * Google People API Service
 * Handles fetching user profile data and connections from Google People API
 */

class GooglePeopleService {
  constructor() {
    this.baseUrl = "https://people.googleapis.com/v1";
  }

  /**
   * Get access token from current session
   * @returns {Promise<string>} Access token
   */
  async getAccessToken() {
    try {
      // Get the current session which should contain the OAuth token
      const session = await account.getSession("current");

      // For OAuth sessions, the access token should be available
      // Note: This might need adjustment based on how Appwrite exposes OAuth tokens
      return session.providerAccessToken || session.accessToken;
    } catch (error) {
      console.error("Failed to get access token:", error);
      throw new Error("Unable to access Google APIs. Please re-authenticate.");
    }
  }

  /**
   * Fetch user's own profile from Google People API
   * @returns {Promise<Object>} User profile data
   */
  async getMyProfile() {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/people/me?personFields=names,emailAddresses,photos,organizations,locations,skills,biographies,interests,occupations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseProfileData(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  }

  /**
   * Fetch user's connections from Google People API
   * @param {number} pageSize - Number of connections to fetch
   * @returns {Promise<Array>} Array of connection profiles
   */
  async getConnections(pageSize = 100) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/people/me/connections?personFields=names,emailAddresses,photos,organizations,locations,skills,biographies,interests,occupations&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.connections?.map((connection) =>
          this.parseProfileData(connection)
        ) || []
      );
    } catch (error) {
      console.error("Failed to fetch connections:", error);
      throw error;
    }
  }

  /**
   * Parse and normalize profile data from Google People API
   * @param {Object} profileData - Raw profile data from Google API
   * @returns {Object} Normalized profile data
   */
  parseProfileData(profileData) {
    const profile = {
      id: profileData.resourceName,
      name: this.extractName(profileData.names),
      email: this.extractEmail(profileData.emailAddresses),
      photo: this.extractPhoto(profileData.photos),
      organizations: this.extractOrganizations(profileData.organizations),
      location: this.extractLocation(profileData.locations),
      skills: this.extractSkills(profileData.skills),
      bio: this.extractBio(profileData.biographies),
      interests: this.extractInterests(profileData.interests),
      occupation: this.extractOccupation(profileData.occupations),
    };

    return profile;
  }

  /**
   * Extract primary name from names array
   */
  extractName(names) {
    if (!names || names.length === 0) return "";
    const primary = names.find((name) => name.metadata?.primary) || names[0];
    return (
      primary.displayName ||
      `${primary.givenName || ""} ${primary.familyName || ""}`.trim()
    );
  }

  /**
   * Extract primary email from emailAddresses array
   */
  extractEmail(emails) {
    if (!emails || emails.length === 0) return "";
    const primary =
      emails.find((email) => email.metadata?.primary) || emails[0];
    return primary.value || "";
  }

  /**
   * Extract photo URL from photos array
   */
  extractPhoto(photos) {
    if (!photos || photos.length === 0) return "";
    const primary =
      photos.find((photo) => photo.metadata?.primary) || photos[0];
    return primary.url || "";
  }

  /**
   * Extract organizations/work experience
   */
  extractOrganizations(organizations) {
    if (!organizations || organizations.length === 0) return [];
    return organizations.map((org) => ({
      name: org.name || "",
      title: org.title || "",
      department: org.department || "",
      startDate: org.startDate || null,
      endDate: org.endDate || null,
      current: org.current || false,
    }));
  }

  /**
   * Extract location information
   */
  extractLocation(locations) {
    if (!locations || locations.length === 0) return "";
    const primary =
      locations.find((loc) => loc.metadata?.primary) || locations[0];
    return primary.value || "";
  }

  /**
   * Extract skills (Note: Skills might not be available in all cases)
   */
  extractSkills(skills) {
    if (!skills || skills.length === 0) return [];
    return skills.map((skill) => skill.value || "").filter(Boolean);
  }

  /**
   * Extract biography/about information
   */
  extractBio(biographies) {
    if (!biographies || biographies.length === 0) return "";
    const primary =
      biographies.find((bio) => bio.metadata?.primary) || biographies[0];
    return primary.value || "";
  }

  /**
   * Extract interests
   */
  extractInterests(interests) {
    if (!interests || interests.length === 0) return [];
    return interests.map((interest) => interest.value || "").filter(Boolean);
  }

  /**
   * Extract occupation information
   */
  extractOccupation(occupations) {
    if (!occupations || occupations.length === 0) return "";
    const primary =
      occupations.find((occ) => occ.metadata?.primary) || occupations[0];
    return primary.value || "";
  }

  /**
   * Generate connection recommendations based on profile similarity
   * @param {Object} userProfile - Current user's profile
   * @param {Array} connections - User's connections
   * @returns {Array} Recommended connections/mentors
   */
  generateRecommendations(userProfile, connections) {
    const recommendations = connections.map((connection) => {
      const score = this.calculateSimilarityScore(userProfile, connection);
      return {
        ...connection,
        similarityScore: score,
        recommendationReasons: this.getRecommendationReasons(
          userProfile,
          connection
        ),
      };
    });

    // Sort by similarity score and return top recommendations
    return recommendations
      .filter((rec) => rec.similarityScore > 0.1) // Only include meaningful matches
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 20); // Return top 20 recommendations
  }

  /**
   * Calculate similarity score between two profiles
   * @param {Object} profile1 - First profile
   * @param {Object} profile2 - Second profile
   * @returns {number} Similarity score (0-1)
   */
  calculateSimilarityScore(profile1, profile2) {
    let score = 0;
    let factors = 0;

    // Organization/company similarity
    if (profile1.organizations && profile2.organizations) {
      const org1Names = profile1.organizations.map((org) =>
        org.name.toLowerCase()
      );
      const org2Names = profile2.organizations.map((org) =>
        org.name.toLowerCase()
      );
      const commonOrgs = org1Names.filter((org) => org2Names.includes(org));
      if (commonOrgs.length > 0) {
        score +=
          0.3 *
          (commonOrgs.length / Math.max(org1Names.length, org2Names.length));
      }
      factors++;
    }

    // Skills similarity
    if (
      profile1.skills &&
      profile2.skills &&
      profile1.skills.length > 0 &&
      profile2.skills.length > 0
    ) {
      const skills1 = profile1.skills.map((skill) => skill.toLowerCase());
      const skills2 = profile2.skills.map((skill) => skill.toLowerCase());
      const commonSkills = skills1.filter((skill) => skills2.includes(skill));
      if (commonSkills.length > 0) {
        score +=
          0.25 *
          (commonSkills.length / Math.max(skills1.length, skills2.length));
      }
      factors++;
    }

    // Interests similarity
    if (
      profile1.interests &&
      profile2.interests &&
      profile1.interests.length > 0 &&
      profile2.interests.length > 0
    ) {
      const interests1 = profile1.interests.map((interest) =>
        interest.toLowerCase()
      );
      const interests2 = profile2.interests.map((interest) =>
        interest.toLowerCase()
      );
      const commonInterests = interests1.filter((interest) =>
        interests2.includes(interest)
      );
      if (commonInterests.length > 0) {
        score +=
          0.2 *
          (commonInterests.length /
            Math.max(interests1.length, interests2.length));
      }
      factors++;
    }

    // Location similarity
    if (profile1.location && profile2.location) {
      const location1 = profile1.location.toLowerCase();
      const location2 = profile2.location.toLowerCase();
      if (location1.includes(location2) || location2.includes(location1)) {
        score += 0.15;
      }
      factors++;
    }

    // Industry/occupation similarity
    if (profile1.occupation && profile2.occupation) {
      const occ1 = profile1.occupation.toLowerCase();
      const occ2 = profile2.occupation.toLowerCase();
      if (occ1.includes(occ2) || occ2.includes(occ1)) {
        score += 0.1;
      }
      factors++;
    }

    return factors > 0 ? score / factors : 0;
  }

  /**
   * Get human-readable reasons for recommendation
   * @param {Object} userProfile - Current user's profile
   * @param {Object} connection - Connection profile
   * @returns {Array} Array of recommendation reasons
   */
  getRecommendationReasons(userProfile, connection) {
    const reasons = [];

    // Check organization overlap
    if (userProfile.organizations && connection.organizations) {
      const userOrgs = userProfile.organizations.map((org) =>
        org.name.toLowerCase()
      );
      const connOrgs = connection.organizations.map((org) =>
        org.name.toLowerCase()
      );
      const commonOrgs = userOrgs.filter((org) => connOrgs.includes(org));
      if (commonOrgs.length > 0) {
        reasons.push(`Works at ${commonOrgs[0]}`);
      }
    }

    // Check skills overlap
    if (userProfile.skills && connection.skills) {
      const userSkills = userProfile.skills.map((skill) => skill.toLowerCase());
      const connSkills = connection.skills.map((skill) => skill.toLowerCase());
      const commonSkills = userSkills.filter((skill) =>
        connSkills.includes(skill)
      );
      if (commonSkills.length > 0) {
        reasons.push(
          `Shares ${commonSkills.length} skill${
            commonSkills.length > 1 ? "s" : ""
          }`
        );
      }
    }

    // Check interests overlap
    if (userProfile.interests && connection.interests) {
      const userInterests = userProfile.interests.map((interest) =>
        interest.toLowerCase()
      );
      const connInterests = connection.interests.map((interest) =>
        interest.toLowerCase()
      );
      const commonInterests = userInterests.filter((interest) =>
        connInterests.includes(interest)
      );
      if (commonInterests.length > 0) {
        reasons.push(`Similar interests`);
      }
    }

    // Check location
    if (userProfile.location && connection.location) {
      const userLoc = userProfile.location.toLowerCase();
      const connLoc = connection.location.toLowerCase();
      if (userLoc.includes(connLoc) || connLoc.includes(userLoc)) {
        reasons.push(`Same location`);
      }
    }

    // Check if they could be a mentor (more experience)
    if (connection.organizations && connection.organizations.length > 0) {
      const hasLeadershipRole = connection.organizations.some(
        (org) =>
          org.title &&
          (org.title.toLowerCase().includes("manager") ||
            org.title.toLowerCase().includes("director") ||
            org.title.toLowerCase().includes("lead") ||
            org.title.toLowerCase().includes("senior") ||
            org.title.toLowerCase().includes("principal"))
      );
      if (hasLeadershipRole) {
        reasons.push("Potential mentor");
      }
    }

    return reasons.slice(0, 3); // Return top 3 reasons
  }
}

export default GooglePeopleService;
