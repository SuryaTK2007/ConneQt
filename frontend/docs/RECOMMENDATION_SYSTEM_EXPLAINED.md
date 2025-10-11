# 🔍 ConneQt Recommendation System - How It Works

## Overview

The recommendation system in ConneQt analyzes your Google contacts and suggests relevant connections and potential mentors based on **similarity matching algorithms**.

**Important**: The recommendations are based on your **Google contacts only** - they do NOT match against users already in the ConneQt database.

---

## 📊 How The System Works

### 1. **Data Source: Google Contacts Only**

When you click "Sync Google Data", the system:

```javascript
// Step 1: Fetch YOUR Google profile
const userProfile = await googlePeople.getMyProfile();

// Step 2: Fetch YOUR Google contacts/connections
const connections = await googlePeople.getConnections(); // Up to 100 contacts

// Step 3: Compare YOUR profile with each of YOUR contacts
const recommendations = generateRecommendations(userProfile, connections);
```

**Key Point**: The system analyzes your existing Google contacts - it does NOT search the ConneQt database to find other users.

---

## 🎯 Recommendation Algorithm

### Similarity Scoring System (0-1 scale)

The algorithm calculates a similarity score by comparing multiple factors:

#### **1. Organization/Company Match (30% weight)**

```javascript
// Checks if you and the contact work(ed) at the same companies
// Examples:
// - Both worked at Google
// - Both worked at Microsoft
// - Common organization history

Score: 0.3 × (common companies / total companies)
```

#### **2. Skills Match (25% weight)**

```javascript
// Compares your skills with the contact's skills
// Examples:
// - Both have "JavaScript", "React", "Node.js"
// - Common technical or professional skills

Score: 0.25 × (common skills / total skills)
```

#### **3. Interests Match (20% weight)**

```javascript
// Checks for shared interests or hobbies
// Examples:
// - Both interested in "AI/ML", "Entrepreneurship"
// - Common professional or personal interests

Score: 0.2 × (common interests / total interests)
```

#### **4. Location Match (15% weight)**

```javascript
// Checks if you're in the same location
// Examples:
// - Both in "San Francisco"
// - Both in "California"
// - Same city or region

Score: 0.15 (if locations match)
```

#### **5. Occupation/Industry Match (10% weight)**

```javascript
// Compares job titles or industries
// Examples:
// - Both "Software Engineers"
// - Both in "Technology" sector

Score: 0.1 (if occupations similar)
```

### **Final Score Calculation**

```javascript
finalScore =
  (orgScore + skillScore + interestScore + locationScore + occupationScore) /
  numberOfFactors;

// Only contacts with score > 0.1 are included
// Results sorted by highest score first
// Top 20 recommendations saved to database
```

---

## 💡 Recommendation Reasons

Each recommendation includes human-readable reasons:

| Reason                   | Criteria                                                             |
| ------------------------ | -------------------------------------------------------------------- |
| **"Works at [Company]"** | You both work(ed) at the same organization                           |
| **"Shares X skills"**    | You have X common skills                                             |
| **"Similar interests"**  | You have common interests                                            |
| **"Same location"**      | You're in the same geographic area                                   |
| **"Potential mentor"**   | Contact has senior role (Manager, Director, Lead, Senior, Principal) |

---

## 🔄 Data Flow Diagram

```
User Clicks "Sync Google Data"
        ↓
┌─────────────────────────────────────────┐
│  1. Fetch User's Google Profile         │
│     - Name, Email, Photo                │
│     - Organizations, Skills, Interests  │
│     - Location, Bio, Occupation         │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  2. Fetch User's Google Contacts        │
│     (Up to 100 contacts)                │
│     - Same profile data for each contact│
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  3. Calculate Similarity Scores         │
│     For Each Contact:                   │
│     - Compare organizations             │
│     - Compare skills                    │
│     - Compare interests                 │
│     - Compare location                  │
│     - Compare occupation                │
│     - Calculate weighted score (0-1)    │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  4. Filter & Sort                       │
│     - Remove score < 0.1                │
│     - Sort by highest score             │
│     - Take top 20 recommendations       │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  5. Save to ConneQt Database            │
│     Collection: user_connections        │
│     - Clear old recommendations         │
│     - Save new recommendations          │
│     - Store profile data as JSON        │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  6. Display in UI                       │
│     - Show recommendation cards         │
│     - Display similarity percentage     │
│     - Show recommendation reasons       │
│     - Highlight potential mentors       │
└─────────────────────────────────────────┘
```

---

## ❓ Key Questions Answered

### **Q: Will it show my contact as a recommendation if that contact also uses ConneQt?**

**A: NO.** The system only analyzes your Google contacts. It does NOT:

- Search the ConneQt database for users
- Match against other ConneQt users
- Cross-reference with the `user_profiles` collection
- Check if contacts are registered on ConneQt

### **Q: What if my Google contact IS in the ConneQt database?**

**A:** The system will still recommend them based on your Google contact data, but it won't know they're a ConneQt user. The recommendation is based purely on Google People API data, not database lookups.

### **Q: Can I see connections between other ConneQt users?**

**A: NO.** The current implementation is **user-centric**:

- You only see recommendations from YOUR Google contacts
- You don't see other users' connections
- No social graph across the platform
- Each user's recommendations are independent

### **Q: Does the system check if contacts are ConneQt users?**

**A: NO.** Currently, there is no integration between:

- Google contacts data
- ConneQt `user_profiles` database
- Cross-platform user matching

---

## 🔄 How Recommendations Are Stored

### Database Collections

#### **1. `user_connections` Collection**

Stores all recommendations for each user:

```json
{
  "$id": "unique_doc_id",
  "user_id": "your_appwrite_user_id",
  "connection_id": "people/123456789",
  "connection_name": "John Doe",
  "connection_email": "john@example.com",
  "similarity_score": 0.75,
  "recommendation_reasons": [
    "Works at Google",
    "Shares 5 skills",
    "Potential mentor"
  ],
  "profile_data": "{...JSON...}",
  "created_at": "2025-10-11T..."
}
```

#### **2. `enhanced_profiles` Collection**

Stores YOUR enhanced profile from Google:

```json
{
  "$id": "unique_doc_id",
  "user_id": "your_appwrite_user_id",
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["AI/ML", "Entrepreneurship"],
  "organizations": "[{...JSON...}]",
  "location": "San Francisco, CA",
  "bio": "Software Engineer...",
  "occupation": "Software Engineer",
  "photo_url": "https://...",
  "last_updated": "2025-10-11T..."
}
```

---

## 🚀 Example Scenario

### Your Profile:

```json
{
  "name": "Alice Smith",
  "skills": ["JavaScript", "React", "Node.js"],
  "organizations": [{ "name": "Google", "title": "Software Engineer" }],
  "location": "San Francisco, CA",
  "interests": ["AI/ML", "Startups"]
}
```

### Contact #1: Bob Johnson

```json
{
  "name": "Bob Johnson",
  "skills": ["JavaScript", "React", "Python"],
  "organizations": [{ "name": "Google", "title": "Senior Engineer" }],
  "location": "San Francisco, CA",
  "interests": ["AI/ML"]
}
```

**Similarity Score Calculation:**

- ✅ Same company (Google): 0.3 × (1/1) = **0.30**
- ✅ 2 common skills (JS, React): 0.25 × (2/3) = **0.17**
- ✅ 1 common interest (AI/ML): 0.2 × (1/2) = **0.10**
- ✅ Same location: **0.15**
- ✅ Similar occupation: **0.10**

**Final Score: 0.82 / 5 factors = 0.164** ⭐⭐⭐ (16.4% match)

**Reasons:**

1. "Works at Google" 🏢
2. "Shares 2 skills" 💻
3. "Similar interests" 💡
4. "Same location" 📍
5. "Potential mentor" (Senior title) ⭐

---

## 🔮 Future Enhancement Ideas

To answer your question about matching with ConneQt users, here are potential enhancements:

### **1. Cross-Platform User Matching**

```javascript
// Check if Google contact is a ConneQt user
const isConneQtUser = await checkIfUserExists(contact.email);

if (isConneQtUser) {
  recommendation.isConneQtUser = true;
  recommendation.conneQtUserId = user.$id;
  recommendation.canMessage = true;
}
```

### **2. Platform-Wide Recommendations**

```javascript
// Recommend OTHER ConneQt users based on profile similarity
const platformRecommendations = await findSimilarUsers(userProfile);
```

### **3. Mutual Connections**

```javascript
// Find contacts who are also connected to your connections
const mutualConnections = await findMutualConnections(userId);
```

### **4. Smart Introductions**

```javascript
// Suggest connections through mutual contacts
"You and John both know Sarah - she could introduce you";
```

---

## 🎯 Summary

**Current System:**

- ✅ Analyzes YOUR Google contacts only
- ✅ Uses AI-powered similarity matching
- ✅ Identifies potential mentors
- ✅ Stores recommendations in database
- ❌ Does NOT match against ConneQt users
- ❌ Does NOT check if contacts are platform members
- ❌ Does NOT enable cross-platform networking

**The recommendations are essentially an intelligent analysis tool** that helps you identify which of your existing Google contacts might be valuable professional connections or mentors, based on shared professional attributes.

To enable matching with ConneQt database users, you would need to implement additional logic to cross-reference Google contact emails with the `user_profiles` collection's email field.
