# HomeGuru Student Section - Quick Reference

## 📱 6 Main Tabs

### 1. HOME TAB 🏠
- **Stats Cards**: Streak, XP, Classes, Hours
- **AI Match Banner**: Animated gradient with Hoot mascot
- **Suggested Tutors**: Horizontal scroll of tutor cards
- **Today's Classes**: Live/upcoming classes
- **Class Notes**: Past session materials
- **Activity Calendar**: 120-day GitHub-style heatmap

### 2. SEARCH TAB 🔍
- **Search Bar**: Opens full search page
- **Topic Chips**: Quick filters (Maths, Physics, etc.)
- **Instagram Grid**: Mixed tutors and blogs
  - Featured rows: 1 big + 2 small
  - Normal rows: 3 equal items
- **Tutor Tiles**: Photo, rating, price, "Book Trial"
- **Blog Tiles**: Title, author, tag, read time

### 3. GURU AI TAB ✨ (Center)
- **Empty State**: Hoot mascot + 4 suggestion cards
- **Chat Interface**: AI assistant for learning
- **Features**:
  - Explain concepts
  - Solve problems
  - Quiz generation
  - Chapter summaries
- **Attachments**: Camera, photo, document
- **Chat History**: Saved conversations

### 4. SCHEDULE TAB 📅
- **Month Picker**: Select any month
- **Date Picker**: Horizontal scroll calendar
- **Timeline**: Hour-by-hour class view
- **Timezone Support**: 9 global timezones
- **Class Cards**: Join, reschedule, view details
- **Live Indicators**: Real-time status updates

### 5. FEED TAB 📰
- **Two Tabs**: "For you" (blogs) + "HG Shorts" (videos)
- **Blog Cards**: Title, subtitle, author, tags
- **Interactions**:
  - Single tap: Read article
  - Double tap: Clap (like)
  - Long press: Context menu
- **HG Shorts**: TikTok-style vertical video feed

### 6. CHAT TAB 💬
- **Thread List**: Tutors, groups, peers
- **Message Types**: Text, images, files
- **Class Blocks**: Embedded session data
  - Summary, assignments, notes
  - Recording, transcript
  - Chat log
- **Attachments**: Camera, photo, file picker

---

## 🎨 UI Design Patterns

### Colors
- **Blue** (#4A7CF5): Primary, Math
- **Orange** (#E08A3C): Secondary, JEE
- **Green** (#22C55E): Success, English
- **Red** (#E85060): Physics
- **Purple** (#8B5CF6): Chemistry

### Card Sizes
- **Stat Cards**: 170×200px
- **Tutor Cards**: 170×200px
- **Class Cards**: 170×200px
- **Note Cards**: 170×200px

### Border Radius
- **Cards**: 28px (large), 16px (medium)
- **Buttons**: 100px (pill), 12px (small)
- **Inputs**: 22px (text field)

### Animations
- **Page Transitions**: 300-350ms
- **Scale Effects**: 200ms
- **Shimmer**: 1000ms repeat
- **Sprite**: 350-400ms per frame

---

## 🔄 Key Workflows

### Book a Tutor
```
Home → Suggested Tutors → Tap Card → View Profile → Book Trial
```

### Join a Class
```
Home/Schedule → Class Card → Join Now → MeetScreen
```

### Ask AI
```
Guru AI → Type Question / Tap Suggestion → Get Response
```

### Message Tutor
```
Chat → Tap Thread → Type Message → Send
```

### Read Blog
```
Feed → Tap Article → Read → Clap/Save/Share
```

---

## 📊 Data Models

### StudentData
```dart
name, handle, bio, grade, board
xp, streak, sessionsThisWeek, hoursThisWeek
tutors: List<MyTutor>
threads: List<ChatThread>
```

### MyTutor
```dart
name, handle, subject, avatar
```

### ChatThread
```dart
name, lastMsg, time, avatar
unread, isTutor, isGroup, members
```

### SearchableTutor
```dart
name, subject, bio, imageUrl, avatar
rating, price, students, experience
```

---

## 🎯 Special Features

### Hoot Mascot
- 3-frame sprite animation
- Used in: Guru AI tab, navigation bar, AI banner
- Ping-pong motion (forward/backward)

### Streak Calendar
- 120 days of activity
- 5 intensity levels (0-4)
- Color gradient: Gray → Orange
- Auto-calculates current streak

### AI Matching
- Personalized tutor recommendations
- Based on: learning style, goals, schedule
- Animated banner with "Try Now" CTA

### Real-time Updates
- Class status (every 30s)
- Join button states
- Typing indicators
- Unread counts

### Timezone Support
- 9 global timezones
- Auto-converts all times
- Affects: Schedule, class cards

---

## 🛠️ Technical Stack

- **Framework**: Flutter (Dart)
- **State**: InheritedNotifier
- **Icons**: Phosphor Icons
- **Navigation**: Bottom nav with IndexedStack
- **Animations**: AnimationController, Tween
- **Images**: Network images with caching
- **Files**: image_picker, file_picker

---

## 📱 Navigation Structure

```
StudentDashboard
    ↓
DashboardShell (Bottom Nav)
    ↓
IndexedStack
    ├─ Tab 0: StudentHomeTab
    ├─ Tab 1: StudentSearchTab
    ├─ Tab 2: AiChatTab (Center)
    ├─ Tab 3: StudentScheduleTab
    ├─ Tab 4: StudentFeedTab
    └─ Tab 5: StudentChatTab
```

---

## 🎨 Component Library

### Cards
- AI Match Banner
- Suggested Tutor Card
- Class Tile
- Class Data Card
- Blog Card
- Stat Card

### Widgets
- Hoot Nav Icon
- Streak Calendar
- Typing Indicator
- Date Picker
- Month Picker
- Timezone Picker

### Overlays
- Mascot Launch Overlay
- Attachment Menu
- Context Menu
- Chat History Drawer

---

## 📈 Gamification

- **XP System**: Earn from classes/quizzes
- **Streak Tracking**: Daily consistency
- **Activity Calendar**: Visual progress
- **Stats Dashboard**: XP, streak, hours, classes

---

## 🔐 User Roles

### Student (Current Analysis)
- Book tutors
- Attend classes
- Chat with tutors
- Use AI assistant
- Browse content
- Track progress

### Tutor (Not Analyzed)
- Manage schedule
- Conduct classes
- Chat with students
- Share materials
- Track earnings

---

**For detailed analysis, see: STUDENT_SECTION_ANALYSIS.md**

