# Profile Completion Flow - Visual Guide

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TUTOR ONBOARDING FLOW                        │
└─────────────────────────────────────────────────────────────────┘

Step 1: Complete Onboarding
┌──────────────────────────────────────┐
│  http://localhost:3003/tutor-onboarding │
│                                      │
│  ✓ Auth & Profile                   │
│  ✓ Subjects & Skills                │
│  ✓ Qualification Test               │
│  ✓ Payment                          │
│  ✓ ID Verification                  │
│  ✓ Bank Details                     │
│                                      │
│  [Go to Dashboard] ──────────────┐  │
└──────────────────────────────────│───┘
                                   │
                                   ▼
Step 2: Redirect to Profile Page
┌──────────────────────────────────────┐
│  http://localhost:3001/profile       │
│                                      │
│  ⚠️ PROFILE INCOMPLETE BANNER        │
│  ┌────────────────────────────────┐ │
│  │ ⚠️ Complete Your Profile       │ │
│  │ Add photo, video, bio, subjects│ │
│  │ [Complete Profile] (disabled)  │ │
│  └────────────────────────────────┘ │
│                                      │
│  Missing:                            │
│  ❌ Profile Photo                    │
│  ❌ YouTube Video                    │
│  ❌ Bio (20+ chars)                  │
│  ✓ Subjects (from onboarding)       │
│                                      │
│  [Edit Profile] ─────────────────┐  │
└──────────────────────────────────│───┘
                                   │
                                   ▼
Step 3: Edit Profile
┌──────────────────────────────────────┐
│  Edit Profile Modal                  │
│                                      │
│  • Upload Profile Photo              │
│  • Add YouTube Video Link            │
│  • Write Bio (20+ characters)        │
│  • Add About Me                      │
│  • Set Pricing                       │
│                                      │
│  [Save] ─────────────────────────┐  │
└──────────────────────────────────│───┘
                                   │
                                   ▼
Step 4: Profile Complete
┌──────────────────────────────────────┐
│  http://localhost:3001/profile       │
│                                      │
│  ✅ PROFILE COMPLETE BANNER          │
│  ┌────────────────────────────────┐ │
│  │ ✅ Profile Complete!            │ │
│  │ Your profile is ready           │ │
│  │ [Go to Dashboard →] (enabled)  │ │
│  └────────────────────────────────┘ │
│                                      │
│  ✅ Profile Photo                    │
│  ✅ YouTube Video (displayed)        │
│  ✅ Bio                              │
│  ✅ Subjects                         │
│                                      │
│  [Go to Dashboard] ──────────────┐  │
└──────────────────────────────────│───┘
                                   │
                                   ▼
Step 5: Access Dashboard
┌──────────────────────────────────────┐
│  http://localhost:3003/dashboard     │
│                                      │
│  🎉 Welcome to your Dashboard!       │
│                                      │
│  • View Schedule                     │
│  • Manage Students                   │
│  • Track Earnings                    │
│  • View Analytics                    │
│                                      │
└──────────────────────────────────────┘
```

## Protection Mechanism

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD ACCESS CONTROL                      │
└─────────────────────────────────────────────────────────────────┘

User tries to access: http://localhost:3003/dashboard
                              │
                              ▼
                    Check localStorage
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
  No onboarding      Student onboarded      Tutor onboarded
        │                     │                     │
        ▼                     ▼                     ▼
  Redirect to          Allow access        Check profile_incomplete
  /onboarding                                      │
                                    ┌──────────────┼──────────────┐
                                    │                             │
                                    ▼                             ▼
                            profile_incomplete = true    profile_incomplete = false
                                    │                             │
                                    ▼                             ▼
                            Redirect to                   Allow dashboard access
                            http://localhost:3001/profile
```

## localStorage State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    localStorage KEYS                             │
└─────────────────────────────────────────────────────────────────┘

After Onboarding Complete:
┌────────────────────────────────────────┐
│ admin_onboarding_complete: "true"      │
│ profile_incomplete: "true"             │
└────────────────────────────────────────┘
                │
                ▼
        Redirect to Profile
                │
                ▼
After Profile Complete:
┌────────────────────────────────────────┐
│ admin_onboarding_complete: "true"      │
│ profile_incomplete: (removed)          │
│ hg_avatar: "data:image/png;base64..."  │
│ hg_profile_data: "{...}"               │
└────────────────────────────────────────┘
                │
                ▼
        Access Dashboard Allowed
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT STRUCTURE                           │
└─────────────────────────────────────────────────────────────────┘

Profile Page (http://localhost:3001/profile)
│
├── ProfileCompletionBanner
│   ├── Checks: avatarUrl, ytLink, bio, subjects
│   ├── Shows: Warning (incomplete) or Success (complete)
│   └── Button: "Go to Dashboard" (enabled when complete)
│
├── YouTube Video Section (conditional)
│   └── Displays if ytLink exists
│
├── Cover Banner
│   └── Upload cover photo
│
├── Profile Info
│   ├── Avatar (click to upload)
│   ├── Name, Bio, Location
│   └── Stats (sessions, students, rating)
│
├── Tabs
│   ├── About
│   ├── Activity
│   ├── Reviews
│   └── Credentials
│
└── EditProfileModal (when Edit clicked)
    ├── Name, Bio, About
    ├── YouTube Video Link ⭐
    ├── Location, Pricing
    ├── Languages
    ├── Experience
    └── Education
```

## Required Fields Checklist

```
Profile Completion Requirements:
┌────────────────────────────────────────┐
│ ☐ Profile Photo (avatarUrl)            │
│ ☐ YouTube Video (ytLink)               │
│ ☐ Bio (min 20 characters)              │
│ ☐ Subjects (from onboarding)           │
└────────────────────────────────────────┘

When all checked:
┌────────────────────────────────────────┐
│ ✅ Profile Photo                        │
│ ✅ YouTube Video                        │
│ ✅ Bio                                  │
│ ✅ Subjects                             │
│                                        │
│ [Go to Dashboard →] ✅ ENABLED         │
└────────────────────────────────────────┘
```
