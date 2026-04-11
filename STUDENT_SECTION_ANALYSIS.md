# HomeGuru App - Student Section Deep Analysis

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Navigation Structure](#navigation-structure)
3. [Data Models](#data-models)
4. [Screen-by-Screen Analysis](#screen-by-screen-analysis)
5. [UI Components Breakdown](#ui-components-breakdown)
6. [Features & Functionality](#features--functionality)
7. [User Workflows](#user-workflows)

---

## 1. ARCHITECTURE OVERVIEW

### Project Structure
```
lib/
├── screens/dashboard/student/          # Main student screens
│   ├── student_dashboard.dart          # Entry point & navigation
│   ├── student_home_tab.dart           # Home feed
│   ├── student_search_tab.dart         # Search & explore
│   ├── ai_chat_tab.dart                # AI assistant
│   ├── student_schedule_tab.dart       # Calendar & classes
│   ├── student_feed_tab.dart           # Blog feed
│   ├── student_chat_tab.dart           # Messaging
│   └── student_profile_page.dart       # Profile
│
├── components/dashboard/student/       # Reusable components
│   ├── ai_match_banner.dart
│   ├── suggested_tutor_card.dart
│   ├── class_tile.dart
│   ├── class_data_card.dart
│   ├── streak_calendar.dart
│   └── [other components]
│
├── models/                             # Data structures
│   ├── student_data.dart
│   ├── searchable_tutor.dart
│   └── tutor_data.dart
│
└── services/                           # Backend services
    ├── osmium_ai.dart
    ├── blog_service.dart
    └── [other services]
```

### Technology Stack
- **Framework**: Flutter (Dart)
- **State Management**: InheritedNotifier (StudentData)
- **Icons**: Phosphor Icons
- **Navigation**: Bottom Navigation Bar with 6 tabs
- **Animations**: Custom animations with AnimationController

---

## 2. NAVIGATION STRUCTURE

### Bottom Navigation Bar (6 Tabs)

```dart
Tab 0: Home (House Icon)
Tab 1: Search (Magnifying Glass)
Tab 2: Guru AI (Sparkle Icon) - CENTER with animated mascot
Tab 3: Schedule (Calendar Icon)
Tab 4: Feed (Newspaper Icon)
Tab 5: Chat (Chat Circle Icon)
```

### Special Features:
- **Center Tab (Guru AI)**: Features animated "Hoot" mascot icon
- **Tab Switching**: Programmatic switching via `DashboardShell.switchTab(context, index)`
- **Haptic Feedback**: Selection clicks on every tab change
- **Active State**: Icons scale up (1.15x) and show dot indicator when active

### Navigation Flow:
```
Student Dashboard (Entry)
    ↓
DashboardShell (Navigation Container)
    ↓
IndexedStack (Holds all 6 tabs)
    ↓
Individual Tab Screens
```

---

## 3. DATA MODELS

### StudentData Model
**Location**: `lib/models/student_data.dart`

```dart
class StudentData extends ChangeNotifier {
  // Profile Information
  String name = 'Ravi Kumar'
  String handle = 'ravi.learns'
  String bio = 'Class 11 · PCM · JEE 2026 🚀'
  String grade = 'Class 11'
  String board = 'CBSE'
  
  // Statistics
  int xp = 1240                    // Experience points
  int streak = 7                   // Days in a row
  int sessionsThisWeek = 4         // Completed sessions
  double hoursThisWeek = 3.5       // Learning hours
  
  // Relationships
  List<MyTutor> tutors             // Connected tutors
  List<ChatThread> threads         // Chat conversations
}
```

### MyTutor Model
```dart
class MyTutor {
  String name          // "Ayush Soni"
  String handle        // "ayush.tutor"
  String subject       // "Maths · Physics"
  String avatar        // "A" (first letter)
}
```

### ChatThread Model
```dart
class ChatThread {
  String name          // Thread name
  String lastMsg       // Last message preview
  String time          // "2m", "1h", "1d"
  String avatar        // Avatar letter
  int unread           // Unread count
  bool isTutor         // Is tutor chat?
  bool isGroup         // Is group chat?
  int members          // Group member count
}
```

### SearchableTutor Model
**Location**: `lib/models/searchable_tutor.dart`

```dart
class SearchableTutor {
  String name
  String subject
  String bio
  String imageUrl
  String avatar
  double rating        // 4.8
  int price           // ₹499/hr
  int students        // 48 students
  int experience      // Years of experience
}
```

---

## 4. SCREEN-BY-SCREEN ANALYSIS



### 4.1 HOME TAB (student_home_tab.dart)

#### Purpose
Main dashboard showing student's learning overview, stats, suggested tutors, and upcoming classes.

#### UI Layout (Top to Bottom)

##### 1. HEADER SECTION
```
┌─────────────────────────────────────┐
│ [Avatar] [HomeGuru Logo] [Bell 🔔] │
└─────────────────────────────────────┘
```
- **Left**: Circular avatar with first letter of name
  - Tap: Opens student profile page (slide from left animation)
- **Center**: HomeGuru logo image
- **Right**: Notification bell with red dot badge
  - Tap: Opens notifications page

##### 2. AI MATCHMAKING BANNER
```
┌─────────────────────────────────────┐
│ ✨ AI Tutor Match                   │
│                                     │
│ Find your                    [Hoot] │
│ perfect tutor                       │
│                              [Try   │
│ Matched to your learning...   Now] │
└─────────────────────────────────────┘
```
**Features**:
- Gradient background: Blue → Pink → Purple
- Animated shimmer wave effect (repeating)
- Animated "Hoot" mascot walking above button
- "Try Now" button launches AI matching overlay
- Rounded corners (28px radius)

**Code Highlights**:
```dart
// Shimmer animation
AnimationController(duration: 1000ms).repeat()
// Gradient colors
[Color(0xFFC8E8F8), Color(0xFFF2BEB4), Color(0xFFF3D5F3)]
```

##### 3. STATS CARDS (Horizontal Scroll)
Four colorful stat cards showing:

**Card 1: Streak**
- Gradient: Blue shades
- Icon: Flame (filled)
- Value: "7 days"
- Description: "Days in a row you've been learning"
- Badge: "Keep going!"

**Card 2: XP Earned**
- Gradient: Red/Pink shades
- Icon: Star (filled)
- Value: "1240 XP"
- Description: "Points from classes & quizzes"
- Badge: "Total"

**Card 3: Classes**
- Gradient: Purple shades
- Icon: Book (filled)
- Value: "4 done"
- Description: "Sessions completed so far"
- Badge: "This week"

**Card 4: Hours**
- Gradient: Green shades
- Icon: Hourglass (filled)
- Value: "3.5 hrs"
- Description: "Total time spent this week"
- Badge: "Learning"

**Card 5: See More**
- Simple card with arrow icon
- Tap: Shows more stats

**Card Design**:
```
┌──────────────┐
│ ┌──────────┐ │  ← Gradient top (52% height)
│ │   Icon   │ │
│ └──────────┘ │
├──────────────┤
│ Title        │  ← White bottom (48% height)
│ Subtitle     │
│ Description  │
│ 1240 XP  ... │
└──────────────┘
```
- Width: 170px
- Height: 200px
- Border radius: 28px
- Scrollable horizontally

##### 4. SUGGESTED TUTORS SECTION
```
Suggested Tutors                    See all →
```
Horizontal scrolling list of tutor cards:

**Tutor Card Design**:
```
┌──────────────┐
│ ₹499/hr      │  ← Price pill (top-left)
│              │
│  [Photo]     │  ← Full-height tutor photo
│              │
│ Ayush Soni   │  ← Blur + gradient overlay
│ Maths·Physics│
│ ⭐ 4.9       │
│ [Book Trial] │  ← CTA button
└──────────────┘
```
- Width: 170px
- Height: 200px
- Dark background with tutor photo
- Bottom blur effect with gradient
- Price pill: White background, top-left
- "Recommended" badge for rating ≥ 4.7
- Book Trial button at bottom

**Tutors Shown**:
1. Ayush Soni - Maths · Physics - ₹499/hr - 4.9⭐
2. Priya Menon - Physics - ₹399/hr - 4.8⭐
3. Ankit Kapoor - English · Literature - ₹349/hr - 4.7⭐
4. Neha Sharma - Chemistry - ₹549/hr - 4.9⭐
5. Rohit Verma - Biology · Botany - ₹299/hr - 4.6⭐
6. "Explore More" card

##### 5. TODAY'S CLASSES SECTION
```
Today's Classes              View schedule →
```
Horizontal scrolling class cards:

**Class Card Design**:
```
┌──────────────┐
│ ┌──────────┐ │  ← Gradient top (subject color)
│ │ 10:00 AM │ │     Time + LIVE badge
│ │  [Video] │ │     Video camera icon
│ │ 1 hour   │ │     Duration
│ └──────────┘ │
├──────────────┤
│ Mathematics  │  ← White bottom
│ [A] Ayush    │     Avatar + name
│              │
│ [Join Now]   │  ← Action button
└──────────────┘
```

**Card States**:
- **Live**: Green "LIVE" badge, pulsing dot, "Join Now" button
- **Upcoming**: Clock icon, "Starts at [time]"
- **Past**: Grayed out, "Completed" or "Missed" badge

**Subject Colors**:
- Math/Calculus: Blue (#4A7CF5)
- Physics: Red (#E85060)
- Chemistry: Purple (#8B5CF6)
- English: Green (#22C55E)
- JEE: Orange (#E08A3C)

##### 6. CLASS NOTES SECTION
```
Class Notes                      View all →
```
Horizontal scrolling note cards from past sessions:

**Note Card Design**:
```
┌──────────────┐
│ ┌──────────┐ │  ← Gradient top
│ │ Dec 15   │ │     Date + status badge
│ │ ✓ Done   │ │
│ │ [Note]   │ │     Notebook icon
│ └──────────┘ │
├──────────────┤
│ Quadratic    │  ← Topic
│ Equations    │
│ 📄3 🎥 💬5  │  ← Resource badges
│ Learned...   │  ← Notes preview
└──────────────┘
```

**Resource Badges**:
- 📄 File count (assignments + notes)
- 🎥 Recording available
- 💬 Chat message count

##### 7. ACTIVITY CALENDAR
```
Activity
```
GitHub-style contribution calendar:

**Features**:
- Shows last 120 days
- 7 rows (days of week) × ~17 columns (weeks)
- Color intensity: 0-4 levels
  - Level 0: Light gray (no activity)
  - Level 1-4: Orange gradient (more activity)
- Header: "🔥 7 day streak" + "45/120 days"
- Legend: "Less [■■■■■] More"

**Calendar Grid**:
```
┌────────────────────────────────┐
│ 🔥 7 day streak    45/120 days │
├────────────────────────────────┤
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Mon
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Tue
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Wed
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Thu
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Fri
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Sat
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │  Sun
├────────────────────────────────┤
│ Less ■ ■ ■ ■ ■ More            │
└────────────────────────────────┘
```

#### Interactions & Animations

1. **Header Avatar Tap**:
   - Haptic feedback (selection click)
   - Slide from left animation (350ms)
   - Opens student profile

2. **AI Banner Tap**:
   - Opens mascot launch overlay
   - Full-screen modal with AI matching flow

3. **Stat Card Tap**:
   - Haptic feedback
   - Could expand to show detailed stats

4. **Tutor Card Tap**:
   - Haptic feedback (light impact)
   - Opens tutor profile page

5. **Class Card Tap**:
   - If live/joinable: Opens meet screen
   - Else: Light haptic feedback

6. **"See all" / "View schedule" Links**:
   - Switches to respective tab using `DashboardShell.switchTab()`

#### Scroll Behavior
- Main list: Bouncing physics
- Horizontal lists: Bouncing physics
- Padding: 16px horizontal, 100px bottom (for nav bar)



---

### 4.2 SEARCH TAB (student_search_tab.dart)

#### Purpose
Discover and search for tutors, subjects, and educational content. Instagram-style grid layout mixing tutors and blog posts.

#### UI Layout (Top to Bottom)

##### 1. SEARCH BAR
```
┌─────────────────────────────────────┐
│ 🔍 Search tutors, subjects, blogs...│
└─────────────────────────────────────┘
```
- Height: 42px
- Background: Light gray (#EFEDE9)
- Border radius: 100px (pill shape)
- Tap: Opens full search page with keyboard
- Transition: Fade animation (280ms)

##### 2. BROWSE TOPICS SECTION
```
Browse topics

[📐 Maths] [⚛️ Physics] [🧪 Chemistry] [📖 English]
[🧬 Biology] [🎓 JEE] [🏥 NEET] [💻 Coding]
```

**Topic Chips**:
- White background with gray border
- Horizontal scrolling
- Icon + Label format
- Height: 38px
- Padding: 14px horizontal, 8px vertical
- Border radius: 100px
- Tap: Opens search with pre-filled query

**Topics List**:
1. 📐 Maths → query: "maths"
2. ⚛️ Physics → query: "physics"
3. 🧪 Chemistry → query: "chemistry"
4. 📖 English → query: "english"
5. 🧬 Biology → query: "biology"
6. 🎓 JEE → query: "jee"
7. 🏥 NEET → query: "neet"
8. 💻 Coding → query: "coding"

##### 3. EXPLORE GRID
```
Explore
```

**Grid Pattern** (Instagram-style):
The grid alternates between two row types:

**Type A: Featured Row** (every 3rd row)
```
┌─────────┬─────┐
│         │  S  │
│   BIG   │─────│
│         │  S  │
└─────────┴─────┘
```
- 1 big item (2/3 width) + 2 small stacked items (1/3 width)
- Height: 260px
- Alternates left/right placement

**Type B: Normal Row**
```
┌───┬───┬───┐
│ R │ R │ R │
└───┴───┴───┘
```
- 3 equal items
- Height: 160px

**Grid Items Mix**:
- Tutors and blogs are interleaved
- Pattern: Tutor, Blog, Blog, Tutor, Blog, Blog...
- Gap between items: 1.5px

#### Tutor Grid Tile

```
┌──────────────┐
│ ✨Recommended │  ← Badge (if rating ≥ 4.7)
│ ₹499/hr      │  ← Price pill (top-right)
│              │
│  [Photo]     │  ← Full tutor photo
│              │
│ Ayush Soni   │  ← Name (bottom overlay)
│ Maths·Physics│  ← Subject
│ ⭐4.9·48·5yrs│  ← Rating·Students·Experience
└──────────────┘
```

**Features**:
- Dark background (#111111)
- Tutor photo fills entire card
- Bottom gradient overlay (transparent → black 92%)
- Top badges:
  - "Recommended" (white bg, blue text) if rating ≥ 4.7
  - Price pill (white bg, top-right)
- Bottom info overlay:
  - Name (white, bold)
  - Subject (white, 60% opacity)
  - Stats row with dots separator
- Tap: Opens tutor profile (slide up animation)

**Big Tile Extras**:
- Shows bio text (1 line, 45% opacity)
- Larger font sizes

#### Blog Grid Tile

```
┌──────────────┐
│ [Education]  │  ← Tag chip
│ 5 min read   │  ← Read time
│              │
│ How to ace   │  ← Title
│ JEE Maths    │
│              │
│ [A] Author ✓ │  ← Author + verified
│         ❤️ 42│  ← Likes
└──────────────┘
```

**Features**:
- White/light background
- Padding: 10-14px
- Top row: Tag chip + read time
- Title: Bold, 11-13px font
- Subtitle (big tiles only): 2 lines max
- Bottom row:
  - Avatar (colored for HomeGuru authors)
  - Author name
  - Verified checkmark (HomeGuru only)
  - Heart icon + like count
- Tap: Opens blog detail (slide from right)

#### Search Results Page

When search bar is tapped, opens full-screen search:

```
┌─────────────────────────────────────┐
│ ← [Search input field]              │
├─────────────────────────────────────┤
│ Recent Searches                     │
│ • Maths tutors                      │
│ • JEE preparation                   │
│ • Physics notes                     │
├─────────────────────────────────────┤
│ Suggested                           │
│ • Quadratic equations               │
│ • Organic chemistry                 │
└─────────────────────────────────────┘
```

**Search Features**:
- Real-time filtering
- Searches across:
  - Tutor names
  - Subjects
  - Blog titles
  - Tags
- Results shown in same grid layout
- Empty state if no results

#### Interactions & Animations

1. **Search Bar Tap**:
   - Fade transition (280ms)
   - Opens SearchResultsPage
   - Auto-focuses keyboard

2. **Topic Chip Tap**:
   - Opens search with pre-filled query
   - Example: "Maths" chip → searches "maths"

3. **Tutor Tile Tap**:
   - Light haptic feedback
   - Slide up animation (300ms)
   - Opens tutor profile page
   - Shows full profile with:
     - Bio, experience, subjects
     - Reviews, ratings
     - Availability calendar
     - Book demo button

4. **Blog Tile Tap**:
   - Selection click haptic
   - Slide from right (300ms)
   - Opens blog detail page

5. **Grid Scroll**:
   - Bouncing physics
   - Lazy loading (loads more as you scroll)

#### Data Flow

```
StudentSearchTab
    ↓
_buildGrid() → Generates grid layout
    ↓
_buildTile() → Creates tutor or blog tile
    ↓
_TutorGridTile / _BlogGridTile
```

**Data Sources**:
- Tutors: `tutorDirectory` (from searchable_tutor.dart)
- Blogs: `BlogService.fetch()` (async, shows fallback first)



---

### 4.3 AI CHAT TAB (ai_chat_tab.dart) - GURU AI

#### Purpose
AI-powered study assistant that helps students with explanations, problem-solving, quizzes, and study support.

#### UI Layout

##### 1. HEADER
```
┌─────────────────────────────────────┐
│ [G] Guru AI [Beta]          [Menu] │
│     🟢 Online / ⚡ Typing...        │
└─────────────────────────────────────┘
```

**Elements**:
- **Left**: 
  - Orange square avatar with "G"
  - Name: "Guru AI"
  - Beta badge (orange pill)
- **Status**:
  - Green dot + "Online" (when idle)
  - Orange dot + "Typing..." (when AI is responding)
- **Right**: Menu button (opens chat history drawer)

##### 2. EMPTY STATE (No Messages)

```
┌─────────────────────────────────────┐
│                                     │
│         [Hoot Mascot]               │
│         Animated                    │
│                                     │
│      Hey! I'm Hoot 👋              │
│   Your Guru AI study buddy          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🧪 Explain a concept        │   │
│  │ Break down any topic simply │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📐 Solve a problem          │   │
│  │ Step-by-step math help      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📝 Quiz me                  │   │
│  │ Test your knowledge         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📖 Summarize a chapter      │   │
│  │ Quick revision notes        │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Hoot Mascot Animation**:
- 3-frame sprite animation
- Ping-pong motion (forward then backward)
- Frame change every 350ms
- Size: 90px
- Sprite sheet: `assets/hoot.png` (680×238px, 3 frames)

**Suggestion Cards**:
Each card has:
- Colored icon (green, blue, purple, orange)
- Title (bold)
- Subtitle (description)
- Right arrow
- Tap: Auto-fills query and sends

**Suggestions**:
1. 🧪 Explain a concept → "Explain photosynthesis in simple terms"
2. 📐 Solve a problem → "Help me solve quadratic equations"
3. 📝 Quiz me → "Quiz me on Indian history"
4. 📖 Summarize a chapter → "Summarize the chapter on cell biology"

##### 3. CHAT INTERFACE (With Messages)

```
┌─────────────────────────────────────┐
│ [Message List - Scrollable]         │
│                                     │
│ [G] Hey there! 👋 How can I help   │
│     you today?                      │
│     9:30 AM                         │
│                                     │
│                 Explain photosyn-   │
│                 thesis please       │
│                 9:31 AM             │
│                                     │
│ [G] Photosynthesis is how plants   │
│     make food! 🌱                   │
│                                     │
│     They use sunlight, water...    │
│     9:31 AM                         │
│                                     │
└─────────────────────────────────────┘
```

**Message Bubbles**:

**AI Messages (Left)**:
- Gray background (#F5F5F5)
- Avatar: Orange "G" square
- Text: Dark color
- Rounded corners (18px all, 4px bottom-left)
- Timestamp below (light gray)

**User Messages (Right)**:
- Blue background (#4A7CF5)
- White text
- Rounded corners (18px all, 4px bottom-right)
- Timestamp below (light gray)
- No avatar

**Message Types**:
1. **Text**: Regular chat message
2. **Image**: Shows image preview (200×160px)
3. **File**: File icon + name + size

##### 4. TYPING INDICATOR

```
[G] ● ● ●  (animated dots)
```
- Shows when AI is "thinking"
- 3 dots bouncing up and down
- Animation: Each dot bounces with 200ms delay
- Gray background bubble

##### 5. INPUT BAR

```
┌─────────────────────────────────────┐
│ [+] [Message Guru AI...      ] [↗] │
└─────────────────────────────────────┘
```

**Elements**:
- **Left**: Plus button (gray circle)
  - Tap: Opens attachment menu
- **Center**: Text input field
  - Gray background (#F5F5F5)
  - Rounded (22px)
  - Multi-line (1-4 lines)
  - Placeholder: "Message Guru AI..."
- **Right**: Send button (circle)
  - Gray when empty
  - Blue when text entered
  - Icon rotates 15° when disabled
  - Paper plane icon

**Attachment Menu** (Bottom Sheet):
```
┌─────────────────────────────────────┐
│              ━━━                    │
│                                     │
│  [📷]      [🖼️]      [📄]          │
│  Camera    Photo    Document        │
│                                     │
└─────────────────────────────────────┘
```
- 3 options with colored icons
- Camera: Blue
- Photo: Purple  
- Document: Orange

##### 6. CHAT HISTORY DRAWER (Right Side)

```
┌─────────────────────────────────────┐
│ Chat History            [+ New]     │
├─────────────────────────────────────┤
│ [🍃] Photosynthesis explained       │
│      Today                          │
│                                     │
│ [📐] Quadratic equations            │
│      Today                          │
│                                     │
│ [📝] Indian history quiz            │
│      Yesterday                      │
│                                     │
│ [🧬] Cell biology summary           │
│      Yesterday                      │
│                                     │
│ [⚛️] Newton's laws of motion        │
│      2 days ago                     │
│                                     │
│ [✏️] English essay review           │
│      3 days ago                     │
└─────────────────────────────────────┘
```

**Features**:
- Slides from right
- Rounded left corners (24px)
- "New" button (blue, top-right)
  - Clears current chat
- History items:
  - Icon based on topic
  - Title (1 line)
  - Relative time
  - Tap: Loads that conversation

#### AI Response System

**Simulated Responses** (for demo):
```dart
Query: "photosynthesis"
→ Response: Explains photosynthesis with formula

Query: "math" / "quadratic"
→ Response: Quadratic formula explanation

Query: "quiz" / "history"
→ Response: Multiple choice question

Query: "hello" / "hi"
→ Response: Greeting + capabilities

Default:
→ Response: Asks for more details + lists capabilities
```

**Response Timing**:
- Base delay: 800ms
- + 15ms per character in query
- Max delay: 2800ms
- Simulates "thinking" time

#### Interactions & Animations

1. **Send Message**:
   - Light haptic feedback
   - Message appears instantly
   - Scroll to bottom (300ms smooth)
   - Typing indicator shows
   - AI response after delay
   - Typing indicator hides
   - Response appears
   - Scroll to bottom again

2. **Attachment Button**:
   - Medium haptic feedback
   - Bottom sheet slides up
   - Options: Camera, Photo, Document
   - Each opens respective picker

3. **File Upload**:
   - Shows file bubble in chat
   - AI responds acknowledging file

4. **Suggestion Card Tap**:
   - Auto-fills input field
   - Sends message immediately

5. **Menu Button**:
   - Light haptic feedback
   - Drawer slides from right

6. **New Chat**:
   - Clears all messages
   - Returns to empty state
   - Closes drawer

#### Special Features

**Hoot Mascot**:
- Custom sprite animation
- 3 frames: neutral, left, right
- Ping-pong animation (forward/backward)
- Used in:
  - Empty state (large, 90px)
  - Navigation bar (small, 30px)

**Markdown Support** (in responses):
- Bold: `**text**`
- Line breaks: `\n`
- Formulas: Plain text (e.g., "6CO₂ + 6H₂O")
- Emojis: Native support

**Scroll Behavior**:
- Messages list: Reverse scroll (newest at bottom)
- Auto-scroll on new message
- Bouncing physics



---

### 4.4 SCHEDULE TAB (student_schedule_tab.dart)

#### Purpose
Calendar view showing all scheduled classes with timeline, timezone support, and class management.

#### UI Layout

##### 1. HEADER
```
┌─────────────────────────────────────┐
│ Dec 2024 ▼    [🌐 IST] [Today]     │
└─────────────────────────────────────┘
```

**Elements**:
- **Left**: Month/Year picker
  - Shows current month (e.g., "Dec 2024")
  - Dropdown arrow
  - Tap: Opens month picker wheel
- **Center**: Timezone selector
  - Globe icon + timezone code
  - Tap: Opens timezone picker
  - Options: IST, UTC, EST, PST, GMT, SGT, JST, AEST, GST
- **Right**: "Today" button
  - Blue background
  - Tap: Jumps to today's date
  - Scrolls timeline to current hour

##### 2. HORIZONTAL DATE PICKER
```
┌─────────────────────────────────────┐
│ Mon Tue Wed Thu Fri Sat Sun Mon ... │
│  1   2   3   4   5   6   7   8  ... │
│  •   •       •   •               ... │
└─────────────────────────────────────┘
```

**Date Cells**:
- Width: 48px
- Height: 74px
- Scrollable horizontally
- Shows all days of selected month

**Cell States**:
- **Selected**: Dark background, white text
- **Today**: Blue background, blue text
- **Regular**: Transparent background, dark text
- **Has Classes**: Blue dot at bottom

**Cell Content**:
- Day name (Mon, Tue, etc.) - small, top
- Date number (1, 2, 3...) - large, center
- Dot indicator - bottom (if has classes)

##### 3. TIMELINE VIEW

**Empty State** (No classes):
```
┌─────────────────────────────────────┐
│                                     │
│         📅                          │
│    No classes scheduled             │
│  Your upcoming sessions will        │
│      appear here                    │
│                                     │
└─────────────────────────────────────┘
```

**With Classes**:
```
┌─────────────────────────────────────┐
│ 9 AM  ●━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│       │                             │
│       │ ┌─────────────────────┐    │
│       │ │ 🕐 9:00 - 10:00 AM  │    │
│       │ │ 1 hour    🟢 LIVE   │    │
│       │ │                     │    │
│       │ │ [A] Ayush Soni      │    │
│       │ │ Mathematics         │    │
│       │ │ [Paid]              │    │
│       │ │                     │    │
│       │ │ [Join] [Reschedule] │    │
│       │ └─────────────────────┘    │
│       │                             │
│ 10 AM ○━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│       │                             │
│ 11 AM ○━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│       │                             │
│       │ ┌─────────────────────┐    │
│       │ │ 🕐 11:30 - 12:30 PM │    │
│       │ │ 1 hour              │    │
│       │ │                     │    │
│       │ │ [P] Priya Menon     │    │
│       │ │ Physics             │    │
│       │ │ [Demo]              │    │
│       │ │                     │    │
│       │ │ [Join] [Reschedule] │    │
│       │ └─────────────────────┘    │
│       │                             │
└─────────────────────────────────────┘
```

**Timeline Structure**:
- Left: Hour labels (9 AM, 10 AM, etc.)
- Center: Vertical line with dots
- Right: Class cards

**Hour Row**:
- Height: 72px per hour
- Dot on timeline:
  - Filled blue circle if has class
  - Empty circle if no class
- Current hour: Bold blue text

##### 4. CLASS CARD (Detailed)

```
┌─────────────────────────────────────┐
│ 🕐 9:00 - 10:00 AM  1 hour  🟢 LIVE│
├─────────────────────────────────────┤
│                                     │
│ [A]  Ayush Soni              [Paid]│
│      Mathematics                    │
│                                     │
├─────────────────────────────────────┤
│ [      Join      ] [  Reschedule  ] │
└─────────────────────────────────────┘
```

**Card Sections**:

**Top Row**:
- Clock icon + time range
- Duration chip (gray)
- Status badge (right):
  - 🟢 LIVE (green, pulsing)
  - ✓ Done (green)
  - ✗ Missed (red)

**Middle Section**:
- Avatar circle (colored by subject)
- Tutor name (bold)
- Subject name
- Type badge (right):
  - "Paid" (blue)
  - "Demo" (orange)

**Bottom Actions** (if not past):
- **Join Button**: Blue, full-width
  - Enabled if: within 10 min before or during class
  - Disabled: Gray
- **Reschedule Button**: Outlined
  - Enabled if: more than 2 hours before class

**Past Classes**:
- Grayed out (60% opacity)
- No action buttons
- Status row:
  - ✓ Completed (green)
  - ✗ Missed (red)

**Live Classes**:
- Elevated shadow
- Blue border (1.5px)
- Pulsing green "LIVE" badge

##### 5. MONTH PICKER MODAL

```
┌─────────────────────────────────────┐
│              ━━━                    │
│                                     │
│         Select Month                │
│                                     │
│  ┌─────────┬─────────┐             │
│  │  2024   │ January │             │
│  │  2025   │ February│             │
│  │  2026   │ March   │             │
│  │  2027   │ April   │             │
│  │  2028   │ May     │             │
│  └─────────┴─────────┘             │
│                                     │
│         [Done]                      │
│                                     │
└─────────────────────────────────────┘
```

**Features**:
- Two wheel pickers side-by-side
- Left: Year (2024-2028)
- Right: Month (January-December)
- Perspective effect (3D wheel)
- Done button at bottom

##### 6. TIMEZONE PICKER MODAL

```
┌─────────────────────────────────────┐
│              ━━━                    │
│                                     │
│           Timezone                  │
│                                     │
│ ✓ IST    Asia/Kolkata              │
│   UTC    UTC                        │
│   EST    America/New_York           │
│   PST    America/Los_Angeles        │
│   GMT    Europe/London              │
│   SGT    Asia/Singapore             │
│   JST    Asia/Tokyo                 │
│   AEST   Australia/Sydney           │
│   GST    Asia/Dubai                 │
│                                     │
└─────────────────────────────────────┘
```

**Features**:
- List of 9 timezones
- Selected: Blue background + checkmark
- Shows: Code + Full name
- Tap: Selects and closes
- All times in app convert to selected timezone

#### Timezone Conversion

**How it works**:
1. Classes stored in UTC
2. Converted to selected timezone for display
3. Time labels update automatically
4. Example:
   - Class at 14:00 UTC
   - IST (UTC+5:30): Shows 7:30 PM
   - EST (UTC-5): Shows 9:00 AM

**Supported Timezones**:
```dart
IST:  UTC+5:30  (Asia/Kolkata)
UTC:  UTC+0     (UTC)
EST:  UTC-5     (America/New_York)
PST:  UTC-8     (America/Los_Angeles)
GMT:  UTC+0     (Europe/London)
SGT:  UTC+8     (Asia/Singapore)
JST:  UTC+9     (Asia/Tokyo)
AEST: UTC+10    (Australia/Sydney)
GST:  UTC+4     (Asia/Dubai)
```

#### Interactions & Animations

1. **Date Cell Tap**:
   - Updates selected date
   - Reloads timeline with classes for that date
   - Smooth transition

2. **Month Picker**:
   - Slides up from bottom
   - Wheel scroll with momentum
   - Done button applies selection

3. **Timezone Picker**:
   - Slides up from bottom
   - Tap to select
   - Auto-closes
   - Recalculates all times

4. **Today Button**:
   - Jumps to today's date
   - Scrolls timeline to current hour
   - Smooth animation (300ms)

5. **Join Class**:
   - Medium haptic feedback
   - Opens MeetScreen
   - Role: Learner
   - Passes meeting ID

6. **Reschedule**:
   - Opens reschedule modal (not implemented in code)

7. **Timeline Scroll**:
   - Bouncing physics
   - Auto-scrolls to current hour on load
   - Offset: Current hour - 150px

#### Auto-Refresh

**Clock Timer**:
- Updates every 30 seconds
- Refreshes:
  - Current time indicator
  - "LIVE" badges
  - Button states (Join enabled/disabled)
- Ensures real-time accuracy

#### Data Flow

```
StudentScheduleTab
    ↓
getClassesForDateInTz(date, timezone)
    ↓
Filters classes for selected date
    ↓
Converts times to selected timezone
    ↓
Groups by hour
    ↓
Renders timeline with class cards
```

**Class States**:
- `isPast`: Class ended
- `isLive`: Currently happening
- `canJoin`: Within 10 min window
- `canReschedule`: More than 2 hours away
- `wasAttended`: Completed or missed



---

### 4.5 FEED TAB (student_feed_tab.dart)

#### Purpose
Social feed showing educational blog posts and short-form video content (HG Shorts).

#### UI Layout

##### 1. HEADER
```
┌─────────────────────────────────────┐
│ Feed                                │
└─────────────────────────────────────┘
```
- Large bold title (24px)
- Fixed at top

##### 2. TAB BAR
```
┌─────────────────────────────────────┐
│  For you  │  HG Shorts              │
└─────────────────────────────────────┘
```
- Sticky header (stays at top when scrolling)
- Two tabs:
  - **For you**: Blog articles
  - **HG Shorts**: Short video feed
- Blue underline indicator
- Smooth tab switching

##### 3. FOR YOU TAB (Blog Feed)

**Blog Card**:
```
┌─────────────────────────────────────┐
│ [A] Author ✓         Dec 15         │
│                                     │
│ How to Master Quadratic Equations   │
│ Learn the step-by-step approach to  │
│ solving any quadratic equation...   │
│                                     │
│ [Mathematics] 5 min read            │
│                                     │
│ 👏 42  💾                           │
└─────────────────────────────────────┘
```

**Card Elements**:

**Top Row**:
- Avatar (colored circle)
  - Blue for HomeGuru authors
  - Gray for external
- Author name
- Verified checkmark (HomeGuru only)
- Date (right)

**Content**:
- Title (bold, 16px, 2 lines max)
- Subtitle (13px, gray, 2 lines max)

**Bottom Row**:
- Tag chip (gray background)
- Read time
- Clap icon + count
- Bookmark icon

**Interactive Features**:

1. **Single Tap**: Opens full article
2. **Double Tap**: Claps (likes) the article
   - Shows large clap animation (60px)
   - Scale animation: 0 → 1.2 → 1.0 → 0
   - Duration: 600ms
   - Haptic feedback (medium)
3. **Long Press**: Opens context menu
   - Blur background
   - Shows preview card with options:
     - Clap
     - Save
     - Share
     - Open article

**Context Menu**:
```
┌─────────────────────────────────────┐
│ Author Name                         │
│                                     │
│ Article Title                       │
│ Article subtitle preview...         │
├─────────────────────────────────────┤
│ 👏 Clap                             │
├─────────────────────────────────────┤
│ 💾 Save                             │
├─────────────────────────────────────┤
│ 🔗 Share                            │
├─────────────────────────────────────┤
│ ↗️ Open article                     │
└─────────────────────────────────────┘
```

**Scroll Behavior**:
- Pull to refresh
- Infinite scroll (loads more at bottom)
- Loading indicator at bottom
- Bouncing physics

##### 4. HG SHORTS TAB

**Short Video Feed**:
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         [Video Player]              │
│         Full Screen                 │
│                                     │
│                                     │
│ Title                               │
│ @creator                            │
│                                     │
│ ❤️ 👁️ 💬 🔗                        │
└─────────────────────────────────────┘
```

**Features**:
- Vertical swipe to next video
- Auto-play
- Full-screen videos
- Overlay controls:
  - Title + creator (bottom-left)
  - Like, view, comment, share (right side)
- Similar to TikTok/Instagram Reels

#### Blog Detail Page

When article is opened:

```
┌─────────────────────────────────────┐
│ ← Back                              │
├─────────────────────────────────────┤
│                                     │
│ How to Master Quadratic Equations   │
│                                     │
│ [A] Author ✓  •  Dec 15  •  5 min  │
│                                     │
│ [Mathematics]                       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Article content goes here...        │
│                                     │
│ Paragraphs, images, code blocks,    │
│ formulas, etc.                      │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ 👏 42 claps  💬 12 comments         │
├─────────────────────────────────────┤
│                                     │
│ Comments section...                 │
│                                     │
└─────────────────────────────────────┘
```

**Features**:
- Full article text
- Rich formatting
- Images
- Code blocks
- Formulas
- Comments section
- Clap button (sticky)
- Share button

---

### 4.6 CHAT TAB (student_chat_tab.dart)

#### Purpose
Messaging interface for communicating with tutors, peers, and study groups.

#### UI Layout

##### 1. CHAT LIST
```
┌─────────────────────────────────────┐
│ Messages                         6  │
├─────────────────────────────────────┤
│ [A] Ayush Soni              2m   2  │
│     Great work on the assignment!   │
│                                     │
│ [P] Priya Menon             1h      │
│     See you at 5:30 for Physics     │
│                                     │
│ [J] JEE 2026 Study Group    3h   5  │
│     Aarav: Anyone solved Q.14?      │
│                                     │
│ [K] Ankit Kapoor            5h   1  │
│     Essay feedback uploaded         │
│                                     │
│ [S] Sneha Kapoor            1d      │
│     Did you finish the physics set? │
│                                     │
│ [P] PCM Batch 2026          1d      │
│     Priya ma'am: Test on Monday     │
└─────────────────────────────────────┘
```

**Thread Item**:
- Avatar (colored circle)
  - Blue: Tutors
  - Orange: Groups
  - Gray: Peers
- Name (bold)
- Last message preview (1 line)
- Time (relative: 2m, 1h, 1d)
- Unread badge (red circle with count)

**Avatar Types**:
- **Tutor**: Blue background, letter
- **Group**: Orange background, group icon
- **Peer**: Gray background, letter

##### 2. CHAT PAGE

**Header**:
```
┌─────────────────────────────────────┐
│ ← [A] Ayush Soni                    │
│       Soni                          │
└─────────────────────────────────────┘
```
- Back button
- Avatar
- Name + subtitle
  - Tutor: Last name
  - Group: Member count

**Message List**:
```
┌─────────────────────────────────────┐
│                                     │
│ ━━━━━━━━ Today ━━━━━━━━            │
│                                     │
│ [A] Good morning sir!               │
│     9:30 AM                         │
│                                     │
│                 Yes sir, I revised  │
│                 the last chapter 💪 │
│                 9:33 AM             │
│                                     │
│ [A] Great work on the assignment! 💪│
│     9:35 AM                         │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ 📹 Class: Quadratic Equations│    │
│ │ ✓ Completed                  │    │
│ │ 📄 3  🎥  💬 5               │    │
│ │                              │    │
│ │ [Summary] [Assignments] ...  │    │
│ └─────────────────────────────┘    │
│                                     │
│                 That was really     │
│                 helpful sir!        │
│                 11:05 AM            │
│                                     │
└─────────────────────────────────────┘
```

**Message Types**:

1. **Text Message**:
   - Rounded bubble
   - Left (tutor): Gray background
   - Right (student): Blue background
   - Timestamp below

2. **Image Message**:
   - Image preview (180px height)
   - Rounded corners
   - Tap: Full screen view

3. **File Message**:
   - File icon + name + size
   - Tap: Opens file

4. **Date Label**:
   - Centered
   - Gray pill
   - "Today", "Yesterday", or date

5. **Class Block** (Special):
   - Embedded class card
   - Shows class details
   - Expandable sections:
     - Summary
     - Assignments
     - Notes
     - Media (recording, transcript)
     - Chat log

**Class Block (Expanded)**:
```
┌─────────────────────────────────────┐
│ 📹 Quadratic Equations              │
│ ✓ Completed  📄 3  🎥  💬 5        │
│                                     │
│ [Summary] [Assignments] [Notes] ... │
├─────────────────────────────────────┤
│                                     │
│ We covered the quadratic formula    │
│ and solved 5 practice problems.     │
│ Focus on discriminant next time.    │
│                                     │
└─────────────────────────────────────┘
```

**Sections**:
- **Summary**: Class notes
- **Assignments**: List of homework
- **Notes**: Shared study materials
- **Media**: Recording + transcript
- **Chat**: In-class chat log

##### 3. INPUT BAR

```
┌─────────────────────────────────────┐
│ [+] [Message...              ] [↑]  │
└─────────────────────────────────────┘
```

**Elements**:
- Plus button: Opens attachment menu
- Text field: Message input
- Send button: Blue circle with up arrow

**Attachment Menu**:
```
┌─────────────────────────────────────┐
│              ━━━                    │
│                                     │
│            Share                    │
│                                     │
│  [📷]      [🖼️]      [📄]          │
│  Camera    Photo     File           │
│                                     │
└─────────────────────────────────────┘
```

#### Chat Features

**Group Chats**:
- Show sender name above message
- Different colored avatars per member
- Member count in header

**Tutor Chats**:
- Include class history
- Embedded class blocks
- Assignment sharing

**Peer Chats**:
- Simple text + media
- Study group discussions

**Interactions**:
1. **Send Message**: Enter or tap send
2. **Attach File**: Plus → Camera/Photo/File
3. **View File**: Tap file message
4. **Expand Class**: Tap class block
5. **Switch Section**: Tap section tabs

#### Data Seeding

**Demo Data**:
- Tutors: Shows class history with embedded blocks
- Groups: Shows multi-user conversations
- Peers: Shows casual study discussions

**Class History Integration**:
- Fetches from `studentHistory` map
- Creates date labels
- Adds pre/post class messages
- Embeds class block with all data



---

## 5. UI COMPONENTS BREAKDOWN

### 5.1 Reusable Components

#### AI Match Banner (ai_match_banner.dart)
**Purpose**: Promote AI tutor matching feature

**Visual Design**:
- Gradient background: Blue → Pink → Purple
- Animated shimmer wave (1000ms repeat)
- Walking Hoot mascot above button
- Rounded corners (28px)

**Code Structure**:
```dart
Container with gradient
  ↓
Stack
  ├─ Shimmer animation (CustomPaint)
  ├─ Content (text + button)
  └─ Hoot mascot (positioned above button)
```

**Animation**:
- Shimmer: Linear gradient sweep left to right
- Mascot: 28px sprite animation
- Button: Tap opens MascotLaunchOverlay

---

#### Suggested Tutor Card (suggested_tutor_card.dart)
**Purpose**: Display tutor preview in compact card

**Dimensions**: 170×200px

**Layout**:
```
┌──────────────┐
│ ₹499/hr      │  ← Price pill (white, top-left)
│              │
│  [Photo]     │  ← Full-height photo
│              │
│ Ayush Soni   │  ← Bottom overlay (blur + gradient)
│ Maths·Physics│
│ ⭐ 4.9       │
│ [Book Trial] │
└──────────────┘
```

**Features**:
- Network image with error handling
- Backdrop blur (sigmaX: 6, sigmaY: 6)
- Gradient overlay (4 stops: transparent → black 85%)
- Price pill: ₹{price}/hr
- Stats: Rating, students, experience
- CTA button: "Book Trial"

**Tap**: Opens tutor profile

---

#### Class Tile (class_tile.dart)
**Purpose**: Display scheduled class in card format

**Dimensions**: 170×200px

**Layout**:
```
┌──────────────┐
│ ┌──────────┐ │  ← Gradient top (45% height)
│ │ 10:00 AM │ │     Subject color
│ │  [Video] │ │
│ │ 1 hour   │ │
│ └──────────┘ │
├──────────────┤
│ Mathematics  │  ← White bottom (55% height)
│ [A] Ayush    │
│              │
│ [Join Now]   │
└──────────────┘
```

**Subject Colors**:
```dart
Math/Calculus:  #4A7CF5 (Blue)
Physics:        #E85060 (Red)
Chemistry:      #8B5CF6 (Purple)
English:        #22C55E (Green)
JEE:            #E08A3C (Orange)
Default:        #6B7280 (Gray)
```

**States**:
- **Live**: Green "LIVE" badge, "Join Now" button
- **Upcoming**: Clock icon, "Starts at [time]"
- **Past**: 50% opacity, "Completed"/"Missed" badge

**Tap**: 
- If joinable: Opens MeetScreen (learner role)
- Else: Light haptic feedback

---

#### Class Data Card (class_data_card.dart)
**Purpose**: Display past class with notes/materials

**Dimensions**: 170×200px

**Layout**:
```
┌──────────────┐
│ ┌──────────┐ │  ← Gradient top
│ │ Dec 15   │ │     Date + status
│ │ ✓ Done   │ │
│ │ [Note]   │ │
│ └──────────┘ │
├──────────────┤
│ Quadratic    │  ← Topic
│ Equations    │
│ 📄3 🎥 💬5  │  ← Resource badges
│ Learned...   │  ← Notes preview
└──────────────┘
```

**Resource Badges**:
- 📄 Files (assignments + notes count)
- 🎥 Recording available
- 💬 Chat messages count

**Tap**: Opens class detail (not implemented)

---

#### Streak Calendar (streak_calendar.dart)
**Purpose**: GitHub-style activity heatmap

**Dimensions**: Full width × auto height

**Layout**:
```
┌────────────────────────────────┐
│ 🔥 7 day streak    45/120 days │
├────────────────────────────────┤
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
│ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ │
├────────────────────────────────┤
│ Less ■ ■ ■ ■ ■ More            │
└────────────────────────────────┘
```

**Features**:
- 120 days of data
- 7 rows (days of week)
- ~17 columns (weeks)
- 5 intensity levels (0-4)
- Color gradient: Gray → Orange
- Auto-calculates streak
- Responsive cell sizing

**Data Generation**:
- Random seeded by date
- More activity in recent days
- Less on weekends

---

#### Hoot Nav Icon (hoot_nav_icon.dart)
**Purpose**: Animated mascot for navigation bar

**Dimensions**: 30×21px (aspect ratio preserved)

**Animation**:
- 3-frame sprite sheet
- Ping-pong motion (0→1→2→1→0)
- Frame change: 400ms
- Sprite: `assets/hoot.png` (680×238px)

**Usage**:
- Center tab in navigation bar
- Scales up when active (1.15x)

---

### 5.2 Shared Components

#### Dashboard Shell (dashboard_shell.dart)
**Purpose**: Navigation container for all tabs

**Structure**:
```dart
Scaffold
  ├─ body: IndexedStack (holds all tabs)
  └─ bottomNavigationBar: Custom nav bar
```

**Features**:
- 6 navigation items
- Center item can be custom widget (Hoot)
- Active state: Scale + dot indicator
- Programmatic tab switching
- Profile route support
- Scroll-to-top on double tap

**Navigation Items**:
```dart
[
  Home,
  Search,
  Guru AI (center, custom),
  Schedule,
  Feed,
  Chat
]
```

---

## 6. FEATURES & FUNCTIONALITY

### 6.1 Core Features

#### 1. Student Dashboard
- **Stats Overview**: XP, streak, classes, hours
- **Suggested Tutors**: AI-matched recommendations
- **Today's Classes**: Quick access to live/upcoming
- **Class Notes**: Past session materials
- **Activity Calendar**: Learning streak visualization

#### 2. Search & Discovery
- **Tutor Search**: Filter by subject, rating, price
- **Blog Discovery**: Educational articles
- **Topic Browse**: Quick category filters
- **Instagram-style Grid**: Mixed content layout

#### 3. AI Assistant (Guru AI)
- **Conversational Interface**: Natural language chat
- **Concept Explanations**: Break down complex topics
- **Problem Solving**: Step-by-step math help
- **Quizzes**: Interactive knowledge testing
- **File Attachments**: Upload images/documents
- **Chat History**: Save and resume conversations

#### 4. Schedule Management
- **Calendar View**: Monthly/daily class overview
- **Timeline**: Hour-by-hour schedule
- **Timezone Support**: 9 global timezones
- **Live Indicators**: Real-time class status
- **Join Classes**: One-tap meeting access
- **Reschedule**: Modify class times

#### 5. Social Feed
- **Blog Articles**: Educational content
- **HG Shorts**: Short-form videos
- **Interactions**: Clap, save, share
- **Comments**: Engage with content
- **Pull to Refresh**: Update feed

#### 6. Messaging
- **Tutor Chats**: Direct communication
- **Group Chats**: Study groups
- **Peer Chats**: Student connections
- **Class History**: Embedded session data
- **File Sharing**: Images, documents
- **Rich Messages**: Text, media, files

---

### 6.2 Advanced Features

#### AI Matching
- **Personalized Recommendations**: Based on learning style
- **Subject Matching**: Find tutors for specific topics
- **Schedule Compatibility**: Match availability
- **Budget Filtering**: Price range preferences

#### Real-time Updates
- **Live Class Badges**: Auto-update every 30s
- **Join Button States**: Enable/disable based on time
- **Typing Indicators**: Show when AI/tutor is typing
- **Unread Counts**: Message notifications

#### Gamification
- **XP System**: Earn points from classes/quizzes
- **Streak Tracking**: Daily learning consistency
- **Achievement Badges**: Milestones (not shown in UI)
- **Leaderboards**: Compare with peers (not shown)

#### Content Management
- **Class Materials**: Assignments, notes, recordings
- **Transcript Access**: Text version of recordings
- **Chat Logs**: In-class conversation history
- **Resource Library**: Organized by class

---

### 6.3 Interaction Patterns

#### Haptic Feedback
- **Selection Click**: Tab switches, button taps
- **Light Impact**: Card taps, minor actions
- **Medium Impact**: Important actions (join class)
- **Heavy Impact**: Long press actions

#### Animations
- **Slide Transitions**: Page navigation (300-350ms)
- **Fade Transitions**: Search overlay (280ms)
- **Scale Animations**: Active states (200ms)
- **Shimmer Effects**: Loading states (1000ms)
- **Sprite Animations**: Mascot (350-400ms)

#### Gestures
- **Tap**: Primary action
- **Double Tap**: Like/clap content
- **Long Press**: Context menu
- **Swipe**: Navigate between tabs/videos
- **Pull Down**: Refresh feed
- **Scroll**: Browse content

---

## 7. USER WORKFLOWS

### 7.1 Finding a Tutor

```
1. Open app → Home tab
2. See "Suggested Tutors" section
3. Scroll through tutor cards
4. Tap tutor card
   ↓
5. View tutor profile
   - Bio, subjects, experience
   - Reviews & ratings
   - Availability calendar
   - Pricing
6. Tap "Book Trial" or "Book Demo"
   ↓
7. Select date/time
8. Confirm booking
9. Receive confirmation
```

**Alternative Path**:
```
1. Search tab
2. Tap search bar
3. Type subject (e.g., "Physics")
4. Browse results
5. Tap tutor
6. Book demo
```

---

### 7.2 Attending a Class

```
1. Home tab or Schedule tab
2. See upcoming class card
3. Wait for "Join Now" button to enable
   (10 minutes before class)
4. Tap "Join Now"
   ↓
5. Opens MeetScreen
   - Video call interface
   - Screen sharing
   - Chat
   - Whiteboard
6. Attend class
7. Class ends automatically
   ↓
8. Class appears in "Class Notes"
9. Access materials:
   - Recording
   - Transcript
   - Assignments
   - Shared notes
```

---

### 7.3 Using AI Assistant

```
1. Tap Guru AI tab (center, with Hoot)
   ↓
2. See empty state with suggestions
3. Option A: Tap suggestion card
   Option B: Type custom question
   ↓
4. AI responds with:
   - Explanation
   - Step-by-step solution
   - Quiz question
   - Summary
5. Continue conversation
6. Attach files if needed
   ↓
7. Chat saved in history
8. Access later from menu
```

---

### 7.4 Messaging a Tutor

```
1. Chat tab
2. See list of conversations
3. Tap tutor chat
   ↓
4. View message history
5. See embedded class blocks
6. Type message
7. Send
   ↓
8. Tutor receives notification
9. Tutor responds
10. Continue conversation
```

**Sharing Files**:
```
1. In chat
2. Tap plus button
3. Choose: Camera, Photo, or File
4. Select file
5. File appears in chat
6. Tutor can download
```

---

### 7.5 Browsing Educational Content

```
1. Feed tab
2. See "For you" blog feed
3. Scroll through articles
4. Option A: Tap to read
   Option B: Double-tap to clap
   Option C: Long-press for menu
   ↓
5. Read full article
6. Clap, save, or share
7. Read comments
8. Add comment
```

**HG Shorts**:
```
1. Feed tab
2. Switch to "HG Shorts"
3. Watch short video
4. Swipe up for next
5. Like, comment, share
```

---

### 7.6 Managing Schedule

```
1. Schedule tab
2. See current month calendar
3. Tap date to view classes
   ↓
4. See timeline with classes
5. Tap class card for details
6. Options:
   - Join (if live)
   - Reschedule
   - Cancel
   ↓
7. Change timezone if needed
8. Jump to today
9. View different month
```

---

## 8. TECHNICAL DETAILS

### 8.1 State Management

**StudentData (InheritedNotifier)**:
```dart
class StudentData extends ChangeNotifier {
  // Profile
  String name, handle, bio, grade, board
  
  // Stats
  int xp, streak, sessionsThisWeek
  double hoursThisWeek
  
  // Relationships
  List<MyTutor> tutors
  List<ChatThread> threads
  
  // Methods
  void update() => notifyListeners()
}
```

**Access Pattern**:
```dart
final data = StudentDataProvider.of(context)
// Use data.name, data.xp, etc.
```

---

### 8.2 Navigation

**Bottom Navigation**:
- IndexedStack: Preserves state of all tabs
- Custom navigation bar with 6 items
- Center item: Custom widget (Hoot mascot)
- Active indicator: Scale + dot

**Page Transitions**:
```dart
// Slide from right
SlideTransition(
  position: Tween(
    begin: Offset(1, 0),
    end: Offset.zero
  ).animate(CurvedAnimation(
    parent: animation,
    curve: Curves.easeOutCubic
  ))
)

// Slide from left
begin: Offset(-1, 0)

// Slide from bottom
begin: Offset(0, 1)

// Fade
FadeTransition(opacity: animation)
```

---

### 8.3 Animations

**Shimmer Effect**:
```dart
AnimationController(
  duration: Duration(milliseconds: 1000)
).repeat()

// Paint with gradient shader
LinearGradient(
  colors: [
    Colors.white.withOpacity(0.0),
    Colors.white.withOpacity(0.5),
    Colors.white.withOpacity(0.0),
  ]
)
```

**Sprite Animation**:
```dart
// Load sprite sheet
ui.Image sprite = await SpriteCache.load('assets/hoot.png')

// Draw frame
canvas.drawImageRect(
  sprite,
  Rect.fromLTWH(frame * frameWidth, 0, frameWidth, frameHeight),
  Rect.fromLTWH(0, 0, width, height),
  paint
)
```

**Scale Animation**:
```dart
AnimatedScale(
  scale: isActive ? 1.15 : 1.0,
  duration: Duration(milliseconds: 200),
  curve: Curves.easeOutCubic,
  child: widget
)
```

---

### 8.4 Data Fetching

**Blog Service**:
```dart
class BlogService {
  static List<BlogArticle> fallback = [...]
  
  static Future<List<BlogArticle>> fetch() async {
    // Fetch from API
    // Return fallback if error
  }
  
  static Future<List<BlogArticle>> fetchMore() async {
    // Pagination
  }
}
```

**Tutor Directory**:
```dart
final tutorDirectory = [
  SearchableTutor(...),
  SearchableTutor(...),
  ...
]
```

---

### 8.5 Theme System

**Colors**:
```dart
class HG {
  // Primary
  static const blue = Color(0xFF4A7CF5)
  static const orange = Color(0xFFE08A3C)
  static const green = Color(0xFF22C55E)
  static const red = Color(0xFFE85060)
  static const purple = Color(0xFF8B5CF6)
  
  // Neutrals
  static const dark = Color(0xFF111111)
  static const grey500 = Color(0xFF6B7280)
  static const grey300 = Color(0xFFD1D5DB)
  static const grey200 = Color(0xFFE5E7EB)
  static const grey100 = Color(0xFFF3F4F6)
  static const grey50 = Color(0xFFF9FAFB)
  static const white = Color(0xFFFFFFFF)
  
  // Backgrounds
  static const surface = Color(0xFFFAFAFA)
  static const powderBlue = Color(0xFFDCEEFF)
  static const powderOrange = Color(0xFFFFEDD5)
  
  // Text
  static const textMuted = Color(0xFF6B7280)
  static const textLight = Color(0xFF9CA3AF)
}
```

**Dark Mode Support**:
```dart
context.isDark // Extension on BuildContext
// Returns Theme.of(context).brightness == Brightness.dark
```

---

## 9. SUMMARY

### Key Strengths

1. **Comprehensive Feature Set**: Covers all student needs
2. **Intuitive Navigation**: Clear 6-tab structure
3. **Rich Interactions**: Haptics, animations, gestures
4. **AI Integration**: Guru AI assistant for learning support
5. **Social Features**: Feed, chat, community
6. **Real-time Updates**: Live class indicators, typing status
7. **Gamification**: XP, streaks, achievements
8. **Content Rich**: Classes, notes, recordings, blogs

### User Experience Highlights

1. **Onboarding**: Smooth entry with AI matching
2. **Discovery**: Easy tutor search and recommendations
3. **Engagement**: Interactive feed with claps and saves
4. **Communication**: Seamless chat with tutors and peers
5. **Learning**: AI assistant for instant help
6. **Organization**: Calendar and timeline for schedule
7. **Progress**: Visual streak calendar and stats

### Technical Highlights

1. **Flutter Framework**: Cross-platform (iOS, Android, Web)
2. **State Management**: InheritedNotifier for reactive UI
3. **Custom Animations**: Sprite sheets, shimmers, transitions
4. **Modular Components**: Reusable, maintainable code
5. **Responsive Design**: Adapts to different screen sizes
6. **Performance**: Lazy loading, image caching, optimized rendering

---

**End of Analysis**

