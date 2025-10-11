# Google People API Integration Setup Guide

This guide will help you set up the Google People API integration for connection recommendations and mentor suggestions in ConneQt.

## Overview

The Google People API integration provides:
- **Smart Connection Recommendations**: AI-powered suggestions based on profile similarity
- **Mentor Discovery**: Identify potential mentors from your network
- **Profile Enhancement**: Enrich user profiles with Google data
- **Skill-based Matching**: Find connections with similar skills and interests

## Prerequisites

1. **Google OAuth Setup**: Follow the `GOOGLE_OAUTH_SETUP.md` first
2. **Appwrite Database**: Ensure your Appwrite database is properly configured
3. **Valid Google Account**: With contacts/connections to analyze

## Google Cloud Console Setup

### 1. Enable Additional APIs

In your Google Cloud Console project:

1. Go to **APIs & Services** → **Library**
2. Enable the following APIs:
   - **People API** (for accessing profile and connection data)
   - **Contacts API** (for reading contact information)

### 2. Update OAuth Scopes

1. Go to **APIs & Services** → **OAuth 2.0**
2. Edit your OAuth client
3. Add the following scopes to your OAuth consent screen:
   ```
   https://www.googleapis.com/auth/contacts.readonly
   https://www.googleapis.com/auth/contacts.other.readonly
   https://www.googleapis.com/auth/userinfo.profile
   https://www.googleapis.com/auth/userinfo.email
   ```

### 3. Test User Configuration

If your app is in testing mode:
1. Go to **OAuth consent screen**
2. Add test users who will be able to use the connection features
3. Include yourself and any other developers/testers

## Features Implemented

### 🔍 Smart Connection Analysis

The system analyzes connections based on:
- **Shared Organizations**: Common workplaces or companies
- **Skill Overlap**: Similar professional skills
- **Interest Matching**: Common hobbies and interests
- **Location Proximity**: Geographic closeness
- **Industry Alignment**: Similar professional domains

### 🎯 Mentor Detection

Automatically identifies potential mentors by:
- **Leadership Roles**: Manager, Director, Lead, Senior positions
- **Experience Level**: Years of experience in relevant fields
- **Skill Expertise**: Advanced skills in user's areas of interest
- **Company Seniority**: Higher-level positions at known companies

### 📊 Recommendation Scoring

Each recommendation includes:
- **Similarity Score**: 0-100% match based on profile analysis
- **Recommendation Reasons**: Human-readable explanations
- **Contact Information**: When available and permitted
- **Profile Data**: Organizations, skills, location, etc.

## Database Schema

### Enhanced Profiles Collection
```javascript
{
  user_id: string,           // Appwrite user ID
  skills: array<string>,     // Professional skills
  interests: array<string>,  // Personal interests
  organizations: string,     // JSON array of work history
  location: string,          // Geographic location
  bio: string,              // Personal biography
  occupation: string,        // Current job title
  photo_url: string,        // Profile photo URL
  last_updated: datetime    // Last sync timestamp
}
```

### User Connections Collection
```javascript
{
  user_id: string,                    // Owner of recommendations
  connection_id: string,              // Google People API resource ID
  connection_name: string,            // Connection's name
  connection_email: string,           // Email (if available)
  similarity_score: float,            // 0.0-1.0 similarity score
  recommendation_reasons: array,      // Why this was recommended
  profile_data: string,              // JSON of connection profile
  created_at: datetime               // Recommendation timestamp
}
```

## Usage Instructions

### 1. Initial Setup

Users must first:
1. Sign up/login using Google OAuth
2. Grant permissions for contacts access
3. Navigate to `/connections` page
4. Click "Sync Google Data"

### 2. Data Synchronization

The sync process:
1. Fetches user's Google profile data
2. Retrieves user's connections/contacts
3. Analyzes profile similarities
4. Generates and stores recommendations
5. Identifies potential mentors

### 3. Finding Connections

Users can:
- **Browse All Recommendations**: View all suggested connections
- **Filter by Mentors**: Focus on potential mentors only
- **Search by Criteria**: Filter by skills, location, industry
- **View Match Reasons**: Understand why someone was recommended

### 4. Contact Actions

For each recommendation:
- **Send Email**: Direct mailto links (when email available)
- **View Profile**: Access detailed profile information
- **Connection Reasons**: See why they were matched

## API Rate Limits

### Google People API Limits
- **100 requests per 100 seconds per user**
- **1,000 requests per 100 seconds** (total)

### Best Practices
- Cache connection data in Appwrite database
- Sync periodically, not on every page load
- Implement exponential backoff for API failures
- Show loading states during sync operations

## Privacy & Security

### Data Handling
- **Minimal Data Storage**: Only store necessary profile information
- **User Consent**: Clear permissions for contact access
- **Data Retention**: Allow users to clear their connection data
- **Secure Storage**: Encrypted storage in Appwrite database

### Privacy Compliance
- **GDPR Compliance**: Users can delete their data
- **Transparency**: Clear explanation of data usage
- **Opt-out Options**: Users can disable connection features
- **Data Minimization**: Only request necessary scopes

## Troubleshooting

### Common Issues

#### 1. "Insufficient Permissions" Error
**Problem**: Missing required OAuth scopes.

**Solution**:
- Check Google Cloud Console OAuth scopes
- Re-authenticate users to get new permissions
- Verify contacts API is enabled

#### 2. "Rate Limit Exceeded" Error
**Problem**: Too many API requests.

**Solution**:
- Implement request throttling
- Use cached data when possible
- Add retry logic with exponential backoff

#### 3. "Access Token Expired" Error
**Problem**: OAuth token has expired.

**Solution**:
- Implement token refresh logic
- Handle re-authentication gracefully
- Store refresh tokens securely

#### 4. No Connections Found
**Problem**: User has no Google contacts.

**Solution**:
- Explain that Google contacts are needed
- Suggest connecting Google account with contacts
- Provide alternative connection methods

#### 5. Poor Recommendation Quality
**Problem**: Irrelevant connection suggestions.

**Solution**:
- Improve similarity scoring algorithm
- Add user feedback mechanisms
- Allow users to hide certain recommendations

### Debugging Tips

1. **Check Browser Console**: Look for API errors and network issues
2. **Monitor Network Tab**: Verify API requests and responses
3. **Test with Multiple Accounts**: Different connection patterns
4. **Verify Database Permissions**: Ensure proper Appwrite access
5. **Google Cloud Logs**: Check API usage and errors

## Advanced Features

### 1. Machine Learning Enhancement
- **Collaborative Filtering**: Learn from user interactions
- **Feedback Loop**: Improve recommendations based on user actions
- **Content-based Filtering**: Enhanced skill and interest matching

### 2. Social Graph Analysis
- **Network Effects**: Consider mutual connections
- **Influence Scoring**: Identify key network nodes
- **Community Detection**: Find professional clusters

### 3. Integration Opportunities
- **LinkedIn Integration**: Cross-platform connection analysis
- **Company Directory**: Internal employee connections
- **Event Attendance**: Meeting-based recommendations

## Performance Optimization

### 1. Caching Strategy
```javascript
// Cache recommendations for 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000;

// Background sync for active users
const scheduleBackgroundSync = (userId) => {
  // Implement background sync logic
};
```

### 2. Pagination
```javascript
// Load recommendations in batches
const loadMoreRecommendations = async (offset = 0, limit = 20) => {
  // Implement pagination logic
};
```

### 3. Search Optimization
```javascript
// Index common search fields
const searchFields = ['skills', 'organizations', 'location'];
```

## Analytics & Metrics

Track important metrics:
- **Sync Success Rate**: How often data sync completes successfully
- **Recommendation Accuracy**: User feedback on suggestions
- **Connection Success**: How many recommendations lead to actual connections
- **Feature Usage**: Which features are most popular

## Security Considerations

1. **API Key Protection**: Never expose Google API keys in frontend code
2. **Token Security**: Securely store and refresh OAuth tokens
3. **Data Encryption**: Encrypt sensitive profile data
4. **Access Control**: Proper Appwrite permissions and security rules
5. **Audit Logging**: Track data access and modifications

## Future Enhancements

1. **Real-time Updates**: Live sync of connection changes
2. **Advanced Filtering**: More sophisticated search options
3. **Recommendation Explanations**: AI-powered insights
4. **Social Features**: Group recommendations and introductions
5. **Integration APIs**: Allow third-party apps to access recommendations

---

Your Google People API integration is now complete! Users can discover meaningful connections and potential mentors from their Google network with intelligent recommendations.