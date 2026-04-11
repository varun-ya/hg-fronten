# HomeGuru App - Complete Tutor Workflow Analysis

## 📋 Table of Contents
1. [Application Entry & Architecture](#application-entry--architecture)
2. [Data Models](#data-models)
3. [Dashboard Structure](#dashboard-structure)
4. [Home Tab - Detailed Workflow](#home-tab---detailed-workflow)
5. [Schedule Tab (Meet) - Detailed Workflow](#schedule-tab-meet---detailed-workflow)
6. [Students Tab - Detailed Workflow](#students-tab---detailed-workflow)
7. [Feed Tab - Detailed Workflow](#feed-tab---detailed-workflow)
8. [Profile Tab - Detailed Workflow](#profile-tab---detailed-workflow)
9. [Supporting Features](#supporting-features)
10. [Key Interactions & Navigation](#key-interactions--navigation)

---

## 1. Application Entry & Architecture

### Entry Point Flow
```
main.dart
  ↓
SplashScreen (2.5s delay)
  ↓
WelcomeScreen (role selection)
  ↓
TutorWelcomeScreen (tutor onboarding)
  ↓
TutorDashboard (main app)
```

### Architecture Pattern
- **State Management**: ChangeNotifier + InheritedWidget pattern
- **Data Provider**: `TutorDataProvider` wraps entire dashboard
- **Single Source of Truth**: `TutorData` model created once, shared across all tabs
- **Theme Management**: Global `themeManager` with light/dark mode support

---

## 2. Data Models

### TutorData Model (`tutor_data.dart`)
**Core Profile Data:**
- `name`: "Ayush Soni"
- `bio`: Short description (1-2 lines)
- `about`: Detailed description with experience
- `ytLink`: YouTube intro video URL
- `location`: "Mumbai, India"
- `avatar`: Profile picture (File?)
- `handle`: "@ayush.tutor"
- `subjects`: List of subjects taught (Mathematics, Physics, JEE, etc.)
- `languages`: List with proficiency levels
- `pricing`: Map of subject → hourly rate (₹500-₹700)
- `experience`: List of work history entries
- `education`: List of educational qualifications

**Student Management:**
- `students`: List of `StudentInfo` objects
  - Each contains: name, subject, grade, sessions count, total paid amount
  - 7 students in demo data

**Demo Requests:**
- `demoRequests`: List of `DemoRequest` objects
  - Contains: name, handle, subject, grade, message, time ago
  - 3 pending requests in demo

**Earnings & Stats:**
- `earnedThisMonth`: ₹12,400
- `earnedThisWeek`: ₹4,200
- `pendingPayout`: ₹2,400
- `activeStudentCount`: 7
- `rating`: 4.8
- `streak`: 12 days
- `sessionsThisWeek`: 14
- `hoursTaught`: 12.5
- `avgRating`: 4.9

**Availability:**
- `availability`: Array of 7 `DayAvailability` objects (Mon-Sun)
- Each day has: enabled flag, from/to time (hour, minute)
- Default: 9 AM - 9 PM weekdays, 10 AM - 6 PM Saturday, Sunday off

---

## 3. Dashboard Structure

### Navigation System (`tutor_dashboard.dart`)
**Bottom Navigation Bar (5 tabs):**
1. **Home** - House icon (Priority overview)
2. **Meet** - Video camera icon (Schedule/Calendar)
3. **Students** - Users icon (Student list & messaging)
4. **Feed** - Newspaper icon (News, blogs, requests)
5. **Profile** - User icon (Profile management)

**Implementation:**
- Uses `DashboardShell` component
- `IndexedStack` for tab switching (preserves state)
- Each tab is a separate widget
- Profile tab uses special `profileBuilder` pattern

---

## 4. Home Tab - Detailed Workflow

### Layout Structure (`tutor_home_tab.dart`)
**Header Section:**
- Logo (profileHeader.png)
- Wallet button → navigates to WalletPage
- Notification bell with badge indicator

**Summary Cards (2 cards in row):**

**Card 1 - Streak & Monthly Earnings:**
- Flame icon with orange accent
- Top: "12 day streak" badge
- Main: "₹12,400" (formatted with K/L suffix)
- Bottom: "Earned this month"
- Background: Butter yellow with amber border

**Card 2 - Rating & Active Students:**
- Star icon with purple accent
- Top: "4.8 rating" badge
- Main: "7" (student count)
- Bottom: "Active students"
- Background: Pastel purple

**Swipeable Card Carousel (5 cards):**
Uses PageView with 0.92 viewport fraction for peek effect

#### Card 1: Priority Card (`priority_card.dart`)
**Hero Section - Live Class:**
- Dark gradient background (navy blue)
- "LIVE in 10 min" badge with green pulse dot
- Subject pill: "English Lit"
- Student avatar: "MI" (Meera Iyer)
- Time: Current time + 10 min
- Duration: 45 min
- "Join Class" button → navigates to MeetScreen

**Demo Requests Section:**
- Header: "DEMO REQUESTS" with orange icon
- Badge: "3 new"
- Shows 2 request tiles:
  - Student avatar with initial
  - Name + time ago
  - Subject pill (powder blue)
  - Grade pill (grey)
- "View all requests" button → switches to Feed tab (Requests sub-tab)

**To-Do Section:**
- Header: "TO DO" with checklist icon
- Badge: "5 pending"
- 5 task items:
  1. Grade assignment (Due today)
  2. Reply to student (2h ago)
  3. Confirm session (Tomorrow)
  4. Update lesson plan (This week)
  5. Create mock test (By Friday)

**Messages Section:**
- Header: "MESSAGES" with chat icon
- Badge: "2 unread"
- 2 message previews with student name, message snippet, time

**Stats Mini Cards (3 in row):**
- Sessions this week: 14
- Hours taught: 12.5
- Avg rating: 4.9

#### Card 2: Today Card (`today_card.dart`)
**Stats Grid (2x2):**
- Classes: 3
- Completed: 2
- Earned: ₹1,500
- Pending: 1

**Schedule List:**
- Header: "Schedule" with "View all" link
- 6 time slots with student names
- Visual indicators:
  - Strikethrough for completed
  - Blue dot + highlight for next class
  - Grey text for upcoming

**Highlights Section:**
- 3 achievement/activity items:
  - Trophy icon: Student scored 247/300
  - Check icon: 2 assignments submitted
  - User+ icon: New student request

#### Card 3: Earnings Card (`earnings_card.dart`)
**Header:**
- "EARNINGS" label
- "+18%" trend badge with up arrow

**Main Display:**
- Large: "₹12,400" (this month)
- Subtitle: "this month"

**Breakdown Card:**
- This week: ₹4,200 (14 sessions)
- Last week: ₹3,800 (12 sessions)
- Pending payout: ₹2,400 (Next: Jul 1)

**Top Students List:**
- 4 student tiles showing:
  - Avatar with initial
  - Name
  - Session count
  - Total paid amount

**Monthly Trend Chart:**
- 6 bar chart (Jan-Jun)
- Gradient fill based on value
- Visual representation of earnings growth

#### Card 4: Activity Card (`activity_card.dart`)
**Header:**
- "STUDENT ACTIVITY" label
- "Today" filter

**Activity Feed:**
- 8 recent activities with:
  - Student initial avatar (purple accent)
  - Student name
  - Action description with icon
  - Time ago
- Activity types:
  - Exam scores
  - Assignment submissions
  - Schedule changes
  - Practice completions
  - Doubts asked

**Weekly Stats Card:**
- Assignments submitted: 12
- Doubts asked: 8
- Practice sets completed: 15
- Average score: 78%

#### Card 5: Payments Card (`payments_card.dart`)
**Summary Card:**
- Split display:
  - Left: Received ₹10,000
  - Right: Pending ₹2,400

**Recent Payments List:**
- 7 payment entries showing:
  - Student avatar (amber accent)
  - Name + subject
  - Amount
  - Date/status (Today, Yesterday, Demo)

**Monthly Stats:**
- Total sessions: 42
- Paid sessions: 38
- Demo sessions: 4
- Avg per session: ₹450

**Card Navigation:**
- Dots indicator at bottom
- Shows current card (1/5)
- Tap dots to jump to card
- Swipe to navigate

---

## 5. Schedule Tab (Meet) - Detailed Workflow

### Main Features (`tutor_schedule_tab.dart`)

**Header Section:**
- Month/Year selector (dropdown) → opens month picker sheet
- Timezone selector (shows current: IST) → opens timezone picker
- "Today" button → jumps to current date

**Horizontal Calendar:**
- Scrollable date picker
- Shows full month
- Each date shows:
  - Day name (Mon, Tue, etc.)
  - Date number
  - Blue dot indicator if classes scheduled
- Selected date: Dark background
- Today: Powder blue background
- Tap to select date

**Timeline View:**
- Vertical scrolling timeline
- Hour markers (7 AM - 10 PM range, dynamic based on classes)
- Blue vertical line connecting hours
- Dots on line for hours with classes

**Class Cards:**
Each class card shows:

**Top Row:**
- Clock icon + time range (e.g., "9:00 AM – 10:00 AM")
- Duration chip (e.g., "1hr")
- Status badge:
  - "LIVE" (green pulse) if currently happening
  - "Done" (green) if completed
  - "Missed" (red) if not attended

**Student Info:**
- Avatar (powder blue for live, grey otherwise)
- Student name (bold)
- Subject name
- "Paid" or "Demo" badge

**Rate Display (if paid & not past):**
- Rupee icon + rate per hour

**Action Buttons (if not past):**
- "Join" button (blue, enabled 10 min before start)
- "Reschedule" button (outlined, enabled 3+ hours before)

**Past Class Status:**
- Check/X icon with "Completed" or "Missed" text

**Interactions:**
- Tap card → no action
- Long press → opens Student Profile Sheet
- Join button → navigates to MeetScreen
- Reschedule → opens Reschedule Sheet

### Reschedule Sheet
**Date Picker:**
- Calendar icon
- Shows selected date or "Pick a new date"
- Opens native date picker

**Time Slots Grid:**
- 4 columns of time slots
- 8 AM - 9 PM slots
- Available slots: white background
- Unavailable: grey with strikethrough
- Selected: blue background

**Message Field:**
- Optional note text input
- "Add a note (optional)" placeholder

**Send Button:**
- Disabled until date + slot selected
- Shows loading spinner when sending
- Success state: Check icon + "Request sent!" message

### Student Profile Sheet (`student_profile_sheet.dart`)
**Header:**
- Student avatar (from dicebear API)
- Name + "Demo" badge if applicable
- Subject + class count
- Chat button (powder blue)

**Stats Row (if not demo):**
- Total classes
- Done count
- Missed count
- Rate per hour

**Message Button:**
- "Message [FirstName]" with chat icon

**Tabs (6 tabs):**
1. **Sessions**: All past classes with notes, assignments, recordings
2. **Assignments**: Filtered list of assignments only
3. **Recordings**: Video recordings with play button
4. **Transcripts**: AI-generated transcripts
5. **Notes**: Shared notes from classes
6. **Class Chat**: In-class chat messages

**Session Details (collapsible):**
- Topic name
- Date
- Attended/Missed status
- Notes text
- Assignments list (bullets)
- Shared notes list
- Recording link
- Transcript link
- Class chat messages

### Timezone Support
**Supported Timezones:**
- IST (Asia/Kolkata) - Default
- UTC
- EST (America/New_York)
- PST (America/Los_Angeles)
- GMT (Europe/London)
- SGT (Asia/Singapore)
- JST (Asia/Tokyo)
- AEST (Australia/Sydney)
- GST (Asia/Dubai)

**Conversion Logic:**
- All classes stored in IST
- Converts display time based on selected timezone
- Filters classes by converted date
- Shows correct date even if class crosses midnight

---

## 6. Students Tab - Detailed Workflow

### Main View (`tutor_students_tab.dart`)
**Header:**
- "Messages" title
- Student count badge

**Student List (DM Inbox Style):**
Each student tile shows:
- Avatar (grey circle with initial)
- Name (bold)
- Grade (right side, small text)
- Last message preview
- Tap → opens Chat Page

### Chat Page
**App Bar:**
- Back button
- Student avatar (small)
- Student name + subject

**Message Timeline:**
Displays mixed content types:

**1. Date Labels:**
- Centered grey chips with date

**2. Text Messages:**
- Bubble style (blue for tutor, white for student)
- Rounded corners (asymmetric)
- Message text
- Timestamp (small, faded)

**3. File Messages:**
- Image preview (if image file)
- File icon + name + size
- Tap to open with OpenFilex

**4. Class Blocks (Meeting Cards):**
Collapsible cards showing:
- Video camera icon
- Topic name
- Completed/Missed status
- Chips for: assignments, notes, recording, transcript, chat

**Expanded Class Block:**
- Section chips: Summary, Assignments, Notes, Media, Chat
- Tap chip to switch section
- Content area shows selected section:
  - **Summary**: Class notes text
  - **Assignments**: List of assignment files
  - **Notes**: List of shared notes
  - **Media**: Recording + transcript links
  - **Chat**: Scrollable chat history

**Input Bar:**
- Plus button → opens attach menu
- Text input field
- Send button (blue circle with up arrow)

**Attach Menu (Bottom Sheet):**
- Camera option (blue icon)
- Photo option (purple icon)
- File option (orange icon)
- Tap option → closes sheet → opens picker

**File Handling:**
- Camera: Opens camera, saves photo
- Photo: Opens gallery picker
- File: Opens file picker
- All files sent as messages with preview

---

## 7. Feed Tab - Detailed Workflow

### Layout Structure (`tutor_feed_tab.dart`)

**Header (Powder Blue):**
- List icon (left)
- Logo (center)
- Wallet icon
- Bell icon with notification dot

**Stories Section:**
- Horizontal scrolling
- "Your story" with + button (first)
- 7 student stories
- Instagram-style gradient ring for unseen
- Grey ring for seen stories

**Tabs (3 tabs):**
1. For you
2. News
3. Requests

### Tab 1: For You (Blogs)
**Blog Feed:**
- Fetches from BlogService
- Shows fallback blogs initially
- Infinite scroll (loads more on scroll)

**Blog Card:**
- Author avatar (powder blue for HomeGuru, grey for external)
- Author name + verified badge (if HomeGuru)
- Source badge (HomeGuru logo or source name)
- Date
- Title (bold, large)
- Subtitle (2 lines max)
- Tag chip
- Read time
- Engagement stats: likes, comments
- Bookmark icon

**Tap Card:**
- Navigates to BlogDetailPage
- Slide transition from right
- Shows full blog content

### Tab 2: News (Flipboard Style)
**Unique Page-Flip Animation:**
- Vertical page view
- Each news article is full screen card
- Flip animation when swiping:
  - Top half stays static
  - Bottom half rotates down (3D transform)
  - Shadow on fold line
  - Next article visible underneath

**News Card:**
- Dark background (navy blue)
- Canvas placeholder with gradient glows
- Image overlay (fades in when loaded)
- Gradient overlay (dark at bottom)
- Source badge (white, semi-transparent)
- Title (large, white, bold)
- Description (2 lines, white, faded)
- Time ago
- Bookmark + share icons

**Page Indicator:**
- Right side, vertical
- Up/down arrows
- Current page number

**Tap Card:**
- Opens NewsDetailPage
- Shows article in WebView (if URL available)
- Fallback: Shows image + text content

**Loading:**
- Shows fallback news instantly
- Loads real news from API on scroll
- Loads more when near end

### Tab 3: Requests
**Demo Request List:**
- Fetches from TutorData.demoRequests
- Each request shows:
  - Avatar (grey circle)
  - Name + handle + time ago
  - Subject pill (powder blue)
  - Grade pill (grey)
  - Message text (full)
  - Accept button (blue, filled)
  - Decline button (outlined)

**Floating Action Button:**
- Blue circle with pencil icon
- Tap → opens BlogEditorPage
- Slide up transition

### Blog Editor Page (`blog_editor_page.dart`)
- Rich text editor (Flutter Quill)
- Title input
- Subtitle input
- Tag selector
- Publish button

---

## 8. Profile Tab - Detailed Workflow

### Header Section (`profile_tab.dart`)

**Background:**
- Powder blue header (140px + status bar)
- Logo centered in header

**Profile Card (overlaps header):**
- Rounded top corners (28px)
- Starts 100px from top

**Avatar:**
- 88px circle
- Positioned at overlap point
- Camera icon badge (bottom right)
- Tap → opens photo picker sheet
- Options: Camera, Gallery, Remove

**Top Navigation (floating):**
- Back button (left)
- Action buttons (right):
  - Wallet icon
  - Theme toggle (sun/moon)
  - Share icon
  - Eye icon (visitor mode toggle)

**Profile Info:**
- Name (large, bold)
- Verified badge (blue check)
- Handle (@username)
- Bio text (2-3 lines)
- Location + join date (with icons)

**Stats Card (5 stats in row):**
- Students: 18
- Sessions: 156
- Rating: 4.8
- Reviews: 24
- Posts: 3

**Incomplete Profile Alert (if no avatar):**
- Yellow warning card
- "Profile incomplete · Unpublished"
- "Add photo" link

**Action Buttons:**
**Own Profile:**
- "Edit Profile" (outlined)
- "Boost Profile" (outlined, rocket icon)

**Visitor Mode:**
- "Follow" (filled, dark)
- "Book Demo" (outlined)

### Tabs (5 tabs)

#### Tab 1: About (`about_tab.dart`)
**YouTube Video:**
- Embedded player
- Auto-pause when switching tabs
- Fallback if no video

**About Section:**
- Full about text
- Expandable if long

**Subjects Grid:**
- Chips for each subject
- Powder blue background

**Languages List:**
- Bullet points with proficiency

**Pricing Table:**
- Subject → Rate mapping
- Formatted with ₹ symbol

**Experience Timeline:**
- Title, organization, period
- Vertical line connecting items

**Education Timeline:**
- Degree, institution, period
- Similar to experience

#### Tab 2: Activity (`activity_tab.dart`)
**Blog Posts:**
- Shows tutor's published blogs
- Same card style as Feed tab
- Tap → opens BlogDetailPage

**FAB (Floating Action Button):**
- Dark circle with pencil icon
- Tap → opens BlogEditorPage

#### Tab 3: Calendar (`calendar_tab.dart`)
**Month View:**
- Calendar grid
- Dots on dates with classes
- Tap date → shows classes for that day

**Day View:**
- List of classes for selected date
- Same card style as Schedule tab

#### Tab 4: Reviews (`reviews_tab.dart`)
**Review List:**
- Student avatar
- Name + rating stars
- Review text
- Date
- Subject tag

**Stats:**
- Average rating
- Total reviews
- Rating distribution (5-star breakdown)

#### Tab 5: Credentials (`credentials_tab.dart`)
**Verification Status:**
- ID verification badge
- Background check badge
- Teaching certificate badge

**Documents:**
- List of uploaded documents
- View/download options

**Visitor Mode:**
- Shows only verified badges
- Hides sensitive documents

### Edit Profile Page (`edit_profile_page.dart`)
**Form Fields:**
- Name input
- Bio input (multiline)
- About input (multiline)
- YouTube link input
- Location input
- Subjects selector (chips)
- Languages editor
- Pricing editor (subject → rate)
- Experience editor (add/remove entries)
- Education editor (add/remove entries)

**Save Button:**
- Updates TutorData
- Calls notifyListeners()
- Navigates back

---

## 9. Supporting Features

### Wallet Page (`wallet_page.dart`)
- Balance display
- Transaction history
- Payout settings
- Bank account details

### Notifications Page (`notifications_page.dart`)
- List of notifications
- Types: class reminders, messages, requests, payments
- Mark as read functionality

### Meet Screen (`meet_screen.dart`)
**Pre-Join Screen:**
- Camera preview
- Mic/camera toggle
- Name input
- Join button

**Meeting Screen:**
- Video grid (tutor + student)
- Controls: mic, camera, screen share, end call
- Chat panel (side)
- Participant list
- Recording indicator

### Availability Page (`availability_page.dart`)
- 7-day week view
- Toggle each day on/off
- Time range picker for each day
- Save button

---

## 10. Key Interactions & Navigation

### Navigation Patterns

**Bottom Tab Navigation:**
```
Home ←→ Meet ←→ Students ←→ Feed ←→ Profile
```

**Deep Navigation:**
```
Home → Priority Card → View All Requests → Feed (Requests tab)
Home → Today Card → View All → Schedule tab
Students → Student Tile → Chat Page → Class Block → Session Details
Feed → Blog Card → Blog Detail Page
Feed → News Card → News Detail Page
Profile → Edit Profile → Form → Save
Schedule → Class Card → Student Profile Sheet → Message Button → Chat Page
```

### State Management Flow

**TutorData Updates:**
```
User Action → Widget calls TutorData method → notifyListeners() → UI rebuilds
```

**Example:**
```dart
// In Edit Profile
_data.name = newName;
_data.update(); // calls notifyListeners()

// In any widget
final data = TutorDataProvider.of(context); // auto-rebuilds on change
```

### Cross-Tab Communication

**Priority Card → Feed Tab:**
```dart
// In Priority Card
DashboardShell.switchTab(context, 3); // Switch to Feed tab
feedTabRequest.value = 2; // Switch to Requests sub-tab

// In Feed Tab
feedTabRequest.addListener(_onFeedTabRequest);
// Listens for tab switch requests
```

### Data Flow

**Schedule Classes:**
```
ScheduledClass (model)
  ↓
getScheduledClasses(date) → returns List<ScheduledClass>
  ↓
getClassesForDateInTz(date, tzOffset) → filters by timezone
  ↓
Schedule Tab displays classes
```

**Student History:**
```
studentHistory Map<String, List<PastSession>>
  ↓
Student Profile Sheet fetches by student name
  ↓
Displays in tabs (Sessions, Assignments, etc.)
  ↓
Chat Page embeds as Class Blocks
```

### Theme Management

**Toggle Flow:**
```
User taps theme button
  ↓
themeManager.toggle(context)
  ↓
Saves to SharedPreferences
  ↓
notifyListeners()
  ↓
MaterialApp rebuilds with new theme
  ↓
All widgets update colors
```

---

## Summary of Tutor Workflow

### Daily Workflow
1. **Login** → Sees splash → Dashboard
2. **Home Tab** → Checks priority card for next class
3. **Join Class** → Taps "Join" → Pre-join screen → Meeting
4. **After Class** → Auto-marked as completed in schedule
5. **Check Messages** → Students tab → Reply to students
6. **Review Requests** → Feed tab → Accept/decline demos
7. **Check Earnings** → Home tab → Swipe to earnings card
8. **Update Profile** → Profile tab → Edit profile

### Key Features
- **Real-time class status** (Live, Next, Completed, Missed)
- **Multi-timezone support** for international students
- **Rich messaging** (text, images, files, class blocks)
- **Comprehensive student history** (sessions, assignments, recordings)
- **Blog publishing** for content marketing
- **News feed** for staying updated
- **Earnings tracking** with trends and breakdowns
- **Demo request management** with quick accept/decline
- **Profile customization** with verification badges

### Technical Highlights
- **Efficient state management** with InheritedWidget
- **Smooth animations** (page transitions, card flips, expansions)
- **Optimized rendering** with RepaintBoundary
- **Lazy loading** (infinite scroll for feeds)
- **Image caching** for avatars and thumbnails
- **Responsive design** adapting to screen sizes
- **Accessibility** with semantic labels and haptic feedback

---

## File Structure Reference

```
lib/
├── main.dart                          # App entry point
├── theme.dart                         # Theme definitions
├── models/
│   ├── tutor_data.dart               # Main tutor data model
│   ├── tutor_profile.dart            # Legacy profile model
│   ├── theme_manager.dart            # Theme state management
│   └── user_session.dart             # User session data
├── screens/
│   ├── splash_screen.dart            # Initial splash
│   ├── welcome/
│   │   ├── welcome_screen.dart       # Role selection
│   │   └── tutor/
│   │       └── welcome.dart          # Tutor onboarding
│   ├── dashboard/
│   │   └── tutor/
│   │       ├── tutor_dashboard.dart  # Main dashboard
│   │       ├── tutor_home_tab.dart   # Home tab
│   │       ├── tutor_schedule_tab.dart # Schedule tab
│   │       ├── tutor_students_tab.dart # Students tab
│   │       └── tutor_feed_tab.dart   # Feed tab
│   ├── meet/
│   │   ├── meet_screen.dart          # Video call screen
│   │   └── pre_join_screen.dart      # Pre-join lobby
│   ├── wallet/
│   │   └── wallet_page.dart          # Wallet management
│   ├── notifications/
│   │   └── notifications_page.dart   # Notifications
│   └── availability/
│       └── availability_page.dart    # Availability settings
├── components/
│   ├── dashboard/
│   │   ├── shared/
│   │   │   ├── dashboard_shell.dart  # Bottom nav shell
│   │   │   └── profile_tab.dart      # Profile tab
│   │   ├── profile/
│   │   │   ├── about_tab.dart        # About sub-tab
│   │   │   ├── activity_tab.dart     # Activity sub-tab
│   │   │   ├── calendar_tab.dart     # Calendar sub-tab
│   │   │   ├── reviews_tab.dart      # Reviews sub-tab
│   │   │   ├── credentials_tab.dart  # Credentials sub-tab
│   │   │   └── edit_profile_page.dart # Edit profile
│   │   └── tutor/
│   │       ├── home_cards/
│   │       │   ├── priority_card.dart    # Priority card
│   │       │   ├── today_card.dart       # Today card
│   │       │   ├── earnings_card.dart    # Earnings card
│   │       │   ├── activity_card.dart    # Activity card
│   │       │   ├── payments_card.dart    # Payments card
│   │       │   ├── home_card_shell.dart  # Card wrapper
│   │       │   └── home_card_helpers.dart # Shared helpers
│   │       └── schedule/
│   │           ├── scheduled_class.dart      # Class model
│   │           └── student_profile_sheet.dart # Student details
│   └── blog/
│       ├── blog_detail_page.dart     # Blog viewer
│       └── blog_editor_page.dart     # Blog editor
├── services/
│   ├── blog_service.dart             # Blog API
│   ├── news_service.dart             # News API
│   └── location_service.dart         # Location services
└── widgets/
    ├── mascot_*.dart                 # Mascot animations
    └── walkthrough_overlay.dart      # Onboarding overlay
```

---

**End of Analysis**
