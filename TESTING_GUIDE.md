# Testing Guide - Profile Completion Flow

## Prerequisites

Make sure both applications are running:

1. **Main App (Port 3003)**
   ```bash
   cd homeguru
   npm run dev
   ```

2. **Teacher Dashboard (Port 3001)**
   ```bash
   cd hg_teacher/eleven-labs-dashboard
   npm run dev
   ```

## Test Scenario 1: Complete Flow (First Time Tutor)

### Step 1: Start Onboarding
1. Open browser and go to: `http://localhost:3003/tutor-onboarding`
2. You should see the onboarding flow starting with authentication

### Step 2: Complete All Onboarding Steps
Complete each step in order:
- **Step 0**: Auth (email/phone/password)
- **Step 1**: Profile (name, gender, location, languages, about, certificates)
- **Step 2**: Welcome Preview (5-step roadmap)
- **Step 3**: Subjects & Skills
- **Step 4**: Qualification Test
- **Step 5**: Congrats (test results)
- **Step 6**: Payment (₹499)
- **Step 7**: ID Verification (Aadhaar)
- **Step 8**: Bank Details
- **Step 9**: Go Live Page

### Step 3: Click "Go to Dashboard"
1. On the final "Go Live" page, you'll see:
   - ✅ Subjects & skills added
   - ✅ Qualification challenge passed
   - ✅ Listing fee paid
   - ✅ ID verified
2. Click the **"Go to Dashboard"** button
3. **Expected**: You are redirected to `http://localhost:3001/profile`

### Step 4: Profile Page - Incomplete State
You should see:
1. **Orange Warning Banner** at the top:
   - ⚠️ "Complete Your Profile"
   - Message: "Add your profile photo, YouTube video, bio, and subjects to access the dashboard."
   - **"Complete Profile"** button (DISABLED/GRAYED OUT)

2. **Missing Items**:
   - ❌ No profile photo (default avatar placeholder)
   - ❌ No YouTube video section
   - ❌ Bio might be incomplete (less than 20 characters)

### Step 5: Add Profile Photo
1. Click on the **avatar/profile photo** area
2. Select an image file from your computer
3. **Expected**: Photo uploads and displays
4. Check banner - should still show incomplete

### Step 6: Edit Profile to Add YouTube Video
1. Click the **"Edit"** button (top right, next to "Boost")
2. Edit Profile modal opens
3. Scroll to find **"Intro Video (YouTube)"** field
4. Enter a YouTube URL, for example:
   - `https://youtu.be/G64LLtnjYlA`
   - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
5. Also ensure **"Bio"** field has at least 20 characters
6. Click **"Save"**
7. **Expected**: Modal closes, profile updates

### Step 7: Verify YouTube Video Displays
1. After saving, scroll down on the profile page
2. You should now see a **YouTube Video Section** displaying your video
3. The video should be embedded and playable

### Step 8: Check Profile Completion
1. Scroll back to the top
2. The banner should now be **GREEN** with:
   - ✅ "Profile Complete!"
   - Message: "Your profile is ready. Click below to access your dashboard."
   - **"Go to Dashboard →"** button (ENABLED/GREEN)

### Step 9: Access Dashboard
1. Click the **"Go to Dashboard →"** button
2. **Expected**: You are redirected to `http://localhost:3003/dashboard`
3. You should now see the full dashboard with all features

## Test Scenario 2: Incomplete Profile Protection

### Test: Try to Access Dashboard Directly
1. Complete onboarding but DON'T complete profile
2. Open a new tab and try to go directly to: `http://localhost:3003/dashboard`
3. **Expected**: You are automatically redirected back to `http://localhost:3001/profile`
4. You cannot access the dashboard until profile is complete

## Test Scenario 3: Profile Already Complete

### Test: Returning User
1. Complete the entire flow once (profile complete)
2. Close browser
3. Open browser again and go to: `http://localhost:3003/dashboard`
4. **Expected**: Dashboard loads normally (no redirect)
5. The `profile_incomplete` flag has been removed from localStorage

## Debugging Tips

### Check localStorage
Open browser DevTools (F12) → Application/Storage → Local Storage

**After Onboarding (Before Profile Complete):**
```javascript
admin_onboarding_complete: "true"
profile_incomplete: "true"
```

**After Profile Complete:**
```javascript
admin_onboarding_complete: "true"
// profile_incomplete should be removed
hg_avatar: "data:image/png;base64,..."
hg_profile_data: "{...}"
```

### Clear localStorage to Reset
To test from scratch:
```javascript
// In browser console (F12)
localStorage.clear();
location.reload();
```

### Check Profile Completion Status
In browser console on profile page:
```javascript
// Check if profile is complete
const profile = JSON.parse(localStorage.getItem('hg_profile_data') || '{}');
const avatar = localStorage.getItem('hg_avatar');

console.log('Avatar:', !!avatar);
console.log('YouTube:', profile.ytLink);
console.log('Bio length:', profile.bio?.length || 0);
console.log('Subjects:', profile.subjects);
```

## Common Issues & Solutions

### Issue 1: Banner Not Showing
**Problem**: Profile completion banner doesn't appear
**Solution**: 
- Check if `profile_incomplete` is set in localStorage
- Refresh the page
- Check browser console for errors

### Issue 2: "Go to Dashboard" Button Stays Disabled
**Problem**: Button remains grayed out even after adding all fields
**Solution**:
- Verify all required fields:
  - Avatar: Check `localStorage.getItem('hg_avatar')`
  - YouTube: Must be non-empty string
  - Bio: Must be 20+ characters
  - Subjects: Must have at least one (from onboarding)
- Refresh the page after editing

### Issue 3: Redirect Loop
**Problem**: Page keeps redirecting between profile and dashboard
**Solution**:
- Clear localStorage: `localStorage.clear()`
- Start fresh from onboarding

### Issue 4: YouTube Video Not Displaying
**Problem**: Video section doesn't show after adding link
**Solution**:
- Ensure the YouTube URL is valid
- Check format: `https://youtu.be/VIDEO_ID` or `https://www.youtube.com/watch?v=VIDEO_ID`
- Refresh the page after saving
- Check browser console for iframe errors

## Expected Behavior Summary

| State | Banner Color | Banner Message | Button State | Can Access Dashboard |
|-------|-------------|----------------|--------------|---------------------|
| Just finished onboarding | Orange (⚠️) | "Complete Your Profile" | Disabled | ❌ No |
| Missing 1+ required fields | Orange (⚠️) | "Complete Your Profile" | Disabled | ❌ No |
| All fields complete | Green (✅) | "Profile Complete!" | Enabled | ✅ Yes |
| Profile complete + flag removed | Hidden | - | - | ✅ Yes |

## Video Tutorial (Steps)

1. **Start**: `http://localhost:3003/tutor-onboarding`
2. **Complete**: All 10 onboarding steps
3. **Redirect**: Automatically to `http://localhost:3001/profile`
4. **Upload**: Profile photo (click avatar)
5. **Edit**: Click "Edit" button
6. **Add**: YouTube video link + Bio (20+ chars)
7. **Save**: Click "Save" in modal
8. **Verify**: Banner turns green ✅
9. **Access**: Click "Go to Dashboard →"
10. **Success**: Dashboard loads at `http://localhost:3003/dashboard`

## Success Criteria

✅ Tutor completes onboarding
✅ Redirected to profile page (port 3001)
✅ Cannot access dashboard without completing profile
✅ Banner shows incomplete status with orange warning
✅ Can upload profile photo
✅ Can add YouTube video via Edit Profile
✅ YouTube video displays on profile page
✅ Banner turns green when all fields complete
✅ "Go to Dashboard" button becomes enabled
✅ Clicking button redirects to dashboard (port 3003)
✅ Dashboard loads successfully
✅ Direct dashboard access works after profile complete
✅ Direct dashboard access blocked if profile incomplete
