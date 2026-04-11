# Profile Completion Flow Implementation

## Overview
This implementation ensures that tutors must complete their profile before accessing the dashboard. After completing the onboarding process, tutors are redirected to their profile page where they must add required information.

## Changes Made

### 1. Modified Onboarding Flow (`AdminStep6GoLive.tsx`)
- Changed the "Go to Dashboard" button to redirect to `http://localhost:3001/profile` instead of `/dashboard`
- Added `profile_incomplete` flag to localStorage to track profile completion status
- Uses `window.location.href` for cross-port navigation

```typescript
const handleGoLive = () => { 
  localStorage.setItem('admin_onboarding_complete', 'true'); 
  localStorage.setItem('profile_incomplete', 'true');
  localStorage.removeItem('tutor_onboarding_step'); 
  window.location.href = 'http://localhost:3001/profile'; 
};
```

### 2. Dashboard Protection (`dashboard/page.tsx`)
- Added validation to check if tutor profile is incomplete
- Redirects tutors back to profile page if `profile_incomplete` flag is set
- Only allows dashboard access after profile completion

```typescript
useEffect(() => {
  const studentOnboarded = localStorage.getItem("onboarding_complete");
  const tutorOnboarded = localStorage.getItem("admin_onboarding_complete");
  const profileIncomplete = localStorage.getItem("profile_incomplete");
  
  if (!studentOnboarded && !tutorOnboarded) {
    router.replace("/onboarding");
  } else if (tutorOnboarded && profileIncomplete === 'true') {
    window.location.href = 'http://localhost:3001/profile';
  }
}, [router]);
```

### 3. Profile Completion Banner Component
Created `ProfileCompletionBanner.tsx` that:
- Displays at the top of the profile page
- Shows completion status with visual indicators
- Checks for required fields:
  - Profile photo (avatar)
  - YouTube introduction video
  - Bio (minimum 20 characters)
  - At least one subject
- Enables "Go to Dashboard" button only when all requirements are met
- Removes `profile_incomplete` flag and redirects to dashboard when complete

### 4. Profile Page Enhancements (`profile/page.tsx`)
- Added ProfileCompletionBanner component
- Added YouTube video display section (shows when video link exists)
- Implemented profile data persistence to localStorage
- Saves profile data when edited through EditProfileModal

## Required Profile Fields

For a tutor to access the dashboard, they must complete:

1. **Profile Photo**: Upload an avatar image
2. **YouTube Video**: Add a YouTube introduction video link
3. **Bio**: Write a bio with at least 20 characters
4. **Subjects**: Have at least one subject (from onboarding)

## User Flow

1. **Onboarding Complete** → Tutor completes all onboarding steps
2. **Redirect to Profile** → Clicks "Go to Dashboard" → Redirected to `http://localhost:3001/profile`
3. **Profile Completion Banner** → Shows what needs to be completed
4. **Edit Profile** → Tutor clicks "Edit" button to add:
   - Profile photo (via avatar upload)
   - YouTube video link (in Edit Profile modal)
   - Bio and other details
5. **Complete Profile** → Once all required fields are filled, banner turns green
6. **Access Dashboard** → Click "Go to Dashboard" button → Redirected to `http://localhost:3003/dashboard`

## Testing

To test the flow:

1. Start both servers:
   - Port 3003: `cd homeguru && npm run dev`
   - Port 3001: `cd hg_teacher/eleven-labs-dashboard && npm run dev`

2. Go to `http://localhost:3003/tutor-onboarding`

3. Complete the onboarding process

4. On the final "Go Live" page, click "Go to Dashboard"

5. You'll be redirected to `http://localhost:3001/profile`

6. Complete your profile by:
   - Clicking the avatar to upload a photo
   - Clicking "Edit" to add YouTube video link and bio
   - Ensuring subjects are present (from onboarding)

7. Once complete, the banner will show "Profile Complete!" with a green checkmark

8. Click "Go to Dashboard" to access `http://localhost:3003/dashboard`

## localStorage Keys Used

- `admin_onboarding_complete`: Set to 'true' when tutor completes onboarding
- `profile_incomplete`: Set to 'true' after onboarding, removed when profile is complete
- `hg_avatar`: Stores base64 encoded avatar image
- `hg_cover`: Stores base64 encoded cover image
- `hg_profile_data`: Stores profile data (name, bio, ytLink, etc.)

## Notes

- The implementation uses cross-port navigation (`window.location.href`) because the apps run on different ports
- Profile data is persisted in localStorage for demo purposes
- In production, this should be replaced with API calls to a backend server
- The YouTube video is embedded using the standard YouTube embed URL format
