# UI Analysis - Tutor Dashboard Pages

## 1. TUTOR PROFILE PAGE (`/profile`)

### 🎨 Color Palette

#### Primary Colors
- **Primary Orange**: `#F97316` - Used for CTAs, verified badges, active states
- **Deep Black**: `#111` - Primary text, headers, strong emphasis
- **Pure White**: `#FFFFFF` - Background, cards

#### Secondary Colors
- **Light Gray**: `#888` - Secondary text, metadata
- **Border Gray**: `#F0F0F0` - Subtle borders, dividers
- **Hover Gray**: `#F5F5F5` - Hover states, inactive backgrounds
- **Medium Gray**: `#EBEBEB` - Card borders, stronger dividers

#### Accent Colors
- **Purple Accent**: `rgba(139, 92, 246, 0.2)` - Cover gradient
- **Blue Accent**: `rgba(59, 130, 246, 0.18)` - Cover gradient
- **Warning Orange**: `#FFFBF5` - Warning background
- **Success Green**: `#10B981` - Completion indicators

#### Text Hierarchy
- **Primary Text**: `#111` (17px-20px, bold)
- **Secondary Text**: `#888` (12px-14px, regular)
- **Tertiary Text**: `#AAA` (10px-11px, uppercase tracking)
- **Muted Text**: `#CCC` (10px-11px)

---

### 🏗️ Layout Structure

#### Three-Column Layout
1. **Center Column** (max-width: 750px)
   - Main profile content
   - Sticky top bar with back button
   - Cover banner (200px height)
   - Profile information
   - Tabbed content area

2. **Right Sidebar** (300px, hidden on mobile)
   - Quick Stats card
   - Today's Blogs
   - Similar tutors recommendations
   - Sticky positioning

3. **Third Column** (320px, hidden until xl breakpoint)
   - Calendar & Time section
   - Live analog clock
   - Availability widget
   - Sticky positioning

---

### 📐 Design System

#### Typography
- **Font Family**: System font stack (sans-serif)
- **Font Sizes**:
  - Hero Title: 20px (font-bold)
  - Section Headers: 15px-18px (font-medium/semibold)
  - Body Text: 14px-16px (font-regular)
  - Metadata: 11px-13px (font-medium)
  - Labels: 10px-11px (font-semibold, uppercase, tracking-widest)

#### Spacing System
- **Padding Scale**: 8px, 12px, 16px, 20px, 24px
- **Gap Scale**: 4px, 8px, 12px, 16px, 20px
- **Border Radius**: 
  - Small: 8px
  - Medium: 12px-14px
  - Large: 16px
  - Full: 9999px (pills/circles)

#### Border System
- **Thin**: 1px solid #F0F0F0
- **Medium**: 2px solid #EBEBEB
- **Thick**: 4px solid white (avatar border)

---

### 🎯 Key UI Components

#### 1. Top Navigation Bar
- **Height**: 53px
- **Background**: White with 80% opacity + backdrop blur (20px)
- **Border**: Bottom 1px #F0F0F0
- **Elements**:
  - Back button (CaretLeft icon, 18px)
  - Profile name + session count
  - Visitor/Owner toggle button
  - Share button

#### 2. Cover Banner
- **Height**: 200px
- **Background**: Radial gradients (orange, purple, blue)
- **Noise Texture**: SVG filter overlay (3% opacity)
- **Edit Button**: Bottom-right, black/30 with backdrop blur

#### 3. Avatar Section
- **Size**: 88px × 88px
- **Border**: 4px white
- **Position**: -44px margin-top (overlaps cover)
- **Hover State**: Black overlay (25% opacity) with camera icon
- **Fallback**: Gradient background (#FFF4ED to #FFE8D0) with User icon

#### 4. Action Buttons
**Visitor Mode**:
- "Message" button: White bg, border, hover gray
- "Book Trial" button: Orange bg (#F97316), white text

**Owner Mode**:
- "Boost" button: White bg, border, rocket icon
- "Edit" button: White bg, border, pencil icon

#### 5. Stats Row (X/Twitter Style)
- **Layout**: Horizontal flex with 20px gap
- **Format**: Bold number + regular label
- **Hover**: Underline on number
- **Stats**: Sessions, Students, Rating, Reviews, Posts

#### 6. Subject Chips
- **Background**: #F5F5F5
- **Text**: 12px, medium weight, #555
- **Padding**: 12px horizontal, 4px vertical
- **Border Radius**: Full (pill shape)
- **Hover**: #EBEBEB background

#### 7. Tab Navigation
- **Style**: X/Twitter inspired
- **Active State**: 
  - Bold text (#111)
  - Orange underline (3px, 40px width, rounded)
- **Inactive State**: Regular text (#888)
- **Hover**: #FAFAFA background
- **Sticky**: Top 53px with backdrop blur

---

### 🎭 Interactive States

#### Hover Effects
- **Buttons**: Background darkens by 5-10%
- **Cards**: Background changes to #FAFAFA
- **Icons**: Color shifts from #888 to #111
- **Transition**: All 200-300ms ease

#### Active States
- **Selected Tab**: Bold text + orange underline
- **Toggle Button**: Black background, white text
- **Calendar Date**: Orange background (#F97316), white text

#### Loading States
- **Shimmer Animation**: Pulse effect on gray backgrounds
- **Skeleton Screens**: Gray blocks (#F1F5F9, #E2E8F0)

---

### 📱 Responsive Behavior

#### Breakpoints
- **Mobile**: < 1024px (lg)
  - Single column layout
  - Hide right sidebar
  
- **Tablet**: 1024px - 1280px (lg to xl)
  - Two columns (main + right sidebar)
  - Hide calendar column

- **Desktop**: > 1280px (xl)
  - Three columns visible
  - Full layout with calendar

#### Mobile Optimizations
- Stack all content vertically
- Full-width cards
- Collapsible sections
- Touch-friendly tap targets (min 44px)

---

### 🎨 Visual Hierarchy

#### Primary Focus
1. Profile avatar (largest element, -44px overlap)
2. Name + verified badge (20px bold)
3. Action buttons (prominent CTAs)

#### Secondary Focus
1. Stats row (bold numbers)
2. Bio text (14px, max-width 480px)
3. Subject chips

#### Tertiary Focus
1. Tab content
2. Sidebar widgets
3. Footer links

---

### ✨ Special Features

#### 1. Visitor Mode Toggle
- Switches between owner and visitor perspectives
- Changes available actions
- Affects calendar visibility

#### 2. Profile Incomplete Warning
- Yellow background (#FFFBF5)
- Warning icon (orange)
- Actionable CTA

#### 3. Calendar Widget
- Month navigation with arrows
- Date selection with orange highlight
- Time picker with dropdown
- Add availability button
- Slot management with remove option

#### 4. Live Analog Clock
- SVG-based rendering
- Real-time updates (1 second interval)
- Hour, minute, second hands
- Orange second hand (#F97316)
- Tick marks for hours

#### 5. Similar Tutors Section
- Avatar with ranking badge
- Name + subject + total earnings
- Hover effect on entire card
- "View" CTA button

---

### 🎯 Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Sufficient color contrast ratios
- Alt text on images

---



## 2. TUTOR SCHEDULE PAGE (`/schedule`)

### 🎨 Color Palette

#### Primary Colors
- **Primary Black**: `#111` - Timeline dots, active elements, text
- **Primary Orange**: `#F97316` - Live indicators, selected dates, accents
- **Pure White**: `#FFFFFF` - Card backgrounds, main background
- **Background Gray**: `#FAFAFA` - Page background, inactive areas

#### Status Colors
- **Live Blue**: `rgba(59, 130, 246, 0.3)` - Live session borders
- **Live Gradient**: Multiple radial gradients (orange, purple, blue)
- **Success Green**: `#10B981` - Completed status
- **Error Red**: `#EF4444` - Missed status
- **Warning Orange**: `#FFF7ED` - Trial badge background

#### Border & Divider Colors
- **Light Border**: `#EBEBEB` - Card borders, main dividers
- **Subtle Border**: `#F5F5F5` - Internal dividers
- **Medium Border**: `#E5E7EB` - Button borders
- **Timeline Line**: `#EBEBEB` - Vertical timeline (2px)

#### Text Colors
- **Primary**: `#111` - Headers, names, important info
- **Secondary**: `#666` - Subjects, descriptions
- **Tertiary**: `#888` - Time labels, metadata
- **Muted**: `#AAA` - Helper text, placeholders
- **Disabled**: `#BBB` - Disabled states

---

### 🏗️ Layout Structure

#### Two-Column Layout
1. **Left Sidebar** (280px, hidden on mobile)
   - Mini calendar
   - Upcoming classes summary
   - Quick stats with progress bars
   - Sticky positioning

2. **Main Timeline Area** (flex-1)
   - Header with navigation
   - View mode selector (Day/Week/Month)
   - Timeline with hourly slots
   - Class cards positioned by time

#### Max Width
- Container: 1440px
- Centered with auto margins

---

### 📐 Design System

#### Typography
- **Page Title**: 17px, medium weight
- **Date Display**: 15px, medium weight
- **Student Names**: 15px, semibold
- **Subject Text**: 13px, regular
- **Time Labels**: 12px, medium weight
- **Metadata**: 11px-13px, regular
- **Section Headers**: 11px, semibold, uppercase, tracking-widest

#### Spacing System
- **Page Padding**: 20px (px-5)
- **Card Padding**: 20px (px-5, py-4)
- **Gap Between Cards**: 12px-16px
- **Timeline Padding**: 24px vertical (py-6)

#### Border Radius
- **Cards**: 14px
- **Buttons**: 8px-10px
- **Pills**: 9999px (full rounded)
- **Avatar**: 12px (rounded-xl)

---

### 🎯 Key UI Components

#### 1. Header Bar
- **Height**: ~52px
- **Background**: #FAFAFA with bottom border
- **Sticky**: Top 0, z-index 40
- **Elements**:
  - "Schedule" title (17px)
  - "Today" button (quick navigation)
  - Date navigation arrows
  - Current date display (clickable for month picker)
  - Timezone selector with globe icon
  - View mode dropdown (Day/Week/Month)
  - Settings gear icon
  - User avatar (32px circle)

#### 2. Mini Calendar (Sidebar)
- **Background**: White with border
- **Border Radius**: 14px
- **Month Navigation**: Arrow buttons
- **Day Grid**: 7 columns
- **Selected Date**: Orange background (#F97316), white text
- **Today**: Orange background
- **Hover**: #FAFAFA background

#### 3. Timeline View (Day Mode)

**Structure**:
- Vertical timeline line at 76px from left
- Hour labels on left (43px width)
- Dots at each hour (10px diameter)
- Cards positioned in right area

**Hour Row**:
- **Label**: 12px, medium, right-aligned
- **Dot**: 10px circle, centered on 76px line
  - Active hours: Black fill with shadow
  - Inactive hours: #FAFAFA fill, #E5E7EB border
- **Card Area**: Flex-1 with 28px left padding

**Current Time Indicator**:
- **Dot**: 14px orange circle (#F97316)
- **Ring**: 4px ring with 20% opacity
- **Line**: 2px gradient line (orange to transparent)
- **Position**: Calculated dynamically based on current time

#### 4. Class Cards

**Default State**:
- **Background**: White
- **Border**: 1px #E5E7EB
- **Border Radius**: 8px
- **Padding**: 20px (px-5, py-4)
- **Hover**: Shadow-md, slight lift

**Live State**:
- **Border**: rgba(59, 130, 246, 0.3)
- **Background Gradients**: 
  - Orange radial: rgba(249, 115, 22, 0.28)
  - Purple radial: rgba(139, 92, 246, 0.22)
  - Blue radial: rgba(59, 130, 246, 0.16)
- **Badge**: "LIVE" with pulsing green dot

**Attended/Missed State**:
- **Opacity**: 0.65
- **Border**: Conditional (red for missed)

**Card Content**:
- Avatar (48px, rounded-xl, clickable)
- Student name (15px, semibold)
- Subject (13px, #666)
- Duration with clock icon
- Payment status (₹ amount or "TRIAL" badge)
- Action buttons (Join, Reschedule)

#### 5. Week View
- **Header**: Day names + dates in grid
- **Today Highlight**: Orange circle background
- **Time Grid**: 24 rows × 7 columns
- **Hour Height**: 60px
- **Class Blocks**: Positioned absolutely within cells
- **Hover**: Cell background #FAFAFA/50

#### 6. Month View
- **Calendar Grid**: 7 columns (full height)
- **Cell Height**: Min 120px
- **Day Number**: Top-left, 14px
- **Today**: Orange circle background
- **Class Pills**: 10px text, truncated
- **Overflow**: "+X more" indicator

#### 7. Reschedule Modal
- **Size**: 480px width, max 85vh height
- **Background**: White, rounded-20px
- **Shadow**: Large drop shadow
- **Backdrop**: Black/60 with blur

**Modal Sections**:
1. **Header**: Icon + title + close button
2. **Date Picker**: Calendar grid with navigation
3. **Time Slots**: 4-column grid of time buttons
4. **Note Field**: Optional textarea
5. **Footer**: Cancel + Send Request buttons

**Date Picker**:
- Month navigation with arrows
- 7-column grid
- Past dates disabled (gray, not-allowed cursor)
- Selected date: Orange background
- Hover: White background

**Time Slots**:
- Grid: 4 columns, 2px gap
- Button: Rounded-10px, 12px text
- Selected: Black background, white text
- Unselected: White background, border

---

### 🎭 Interactive States

#### Hover Effects
- **Class Cards**: Shadow-md, transform scale
- **Calendar Dates**: Background #FAFAFA
- **Buttons**: Background darkens
- **Timeline Cells**: Background #FAFAFA/50

#### Active States
- **Selected Date**: Orange background, white text
- **Live Session**: Gradient backgrounds, blue border
- **Selected Time Slot**: Black background, white text

#### Disabled States
- **Past Dates**: Gray text, not-allowed cursor
- **Join Button**: Gray background, gray text
- **Reschedule**: Hidden if < 3 hours before class

---

### 📊 Data Visualization

#### 1. Quick Stats (Sidebar)
- **Progress Bars**: 
  - Container: #F5F5F5, 8px height, rounded-full
  - Fill: #111, dynamic width
- **Labels**: 13px text above bar
- **Values**: 13px semibold on right

#### 2. Upcoming Classes Summary
- **Cards**: Rounded-lg, border
- **Highlight**: Active card has #FAFAFA background
- **Counts**: 13px semibold, right-aligned

---

### 🎨 Visual Hierarchy

#### Primary Focus
1. Current time indicator (orange, animated)
2. Live session cards (gradient backgrounds)
3. Today's date (orange highlight)

#### Secondary Focus
1. Upcoming class cards
2. Timeline structure
3. Navigation controls

#### Tertiary Focus
1. Sidebar statistics
2. Past sessions
3. Footer elements

---

### ✨ Special Features

#### 1. Real-Time Updates
- Current time indicator updates every minute
- Timeline position recalculates dynamically
- Live session status updates

#### 2. Timezone Support
- 14 timezone options
- Globe icon indicator
- Dropdown with offset display
- Selected timezone highlighted

#### 3. View Modes
- **Day View**: Detailed timeline with cards
- **Week View**: 7-day grid with time slots
- **Month View**: Calendar with class pills

#### 4. Smart Scheduling
- Can't reschedule if < 3 hours before class
- Reschedule request system
- Temporary confirmation toast

#### 5. Student Profile Integration
- Clickable avatars
- Opens student profile sheet
- Quick access to student info

---

### 📱 Responsive Behavior

#### Mobile (< 1024px)
- Hide left sidebar
- Full-width timeline
- Stack header elements
- Simplified navigation

#### Tablet (1024px - 1440px)
- Show sidebar
- Adjust timeline width
- Maintain all features

#### Desktop (> 1440px)
- Full layout with max-width container
- Optimal spacing
- All features visible

---

### 🎯 Accessibility Features

- Keyboard navigation for calendar
- Focus states on all interactive elements
- ARIA labels for time slots
- Screen reader friendly status indicators
- Sufficient color contrast
- Touch-friendly targets (min 44px)

---

### 🔄 Animation & Transitions

- **Timeline Indicator**: Smooth position updates
- **Card Hover**: 200ms ease transform
- **Modal Entry**: 250ms cubic-bezier animation
- **Button States**: 200-300ms color transitions
- **Live Badge**: Pulsing animation on dot

---



## 3. TUTOR FEED PAGE (`/feed`)

### 🎨 Color Palette

#### Primary Colors
- **Primary Black**: `#111` - Text, active elements, editor UI
- **Primary Orange**: `#F97316` - Accents, links, active states
- **Pure White**: `#FFFFFF` - Card backgrounds, modals
- **Background Gray**: `#FAFAFA` - Page background, inactive areas

#### Brand Colors (HomeGuru)
- **Brand Blue**: `#1E3162` - HomeGuru brand primary
- **Brand Orange**: `#E08A3C` - HomeGuru brand secondary
- **Badge Background**: `#DCE8F5` - Local author badge background

#### Story Gradient (Instagram-style)
- **Gradient Start**: `#FBAA47` (yellow-orange)
- **Gradient Mid**: `#D91A46` (pink-red)
- **Gradient End**: `#A60F93` (purple)

#### Tag-Specific Colors
Each tag has its own color scheme:
- **Mathematics**: bg `#F5F5F8`, text `#555`, accent `#6366F1` (indigo)
- **Physics**: bg `#F7F5F3`, text `#666`, accent `#F97316` (orange)
- **Study Tips**: bg `#F4F6F4`, text `#555`, accent `#22C55E` (green)
- **Personal**: bg `#F6F4F6`, text `#666`, accent `#EC4899` (pink)
- **JEE Prep**: bg `#F6F4F4`, text `#666`, accent `#EF4444` (red)
- **Teaching**: bg `#F3F6F5`, text `#555`, accent `#10B981` (emerald)
- **EdTech**: bg `#F4F5F8`, text `#555`, accent `#3B82F6` (blue)

#### Status Colors
- **Urgency High**: `#999` text, `#F5F5F5` background
- **Urgency Medium**: `#999` text, `#F5F5F5` background
- **Urgency Low**: `#999` text, `#F5F5F5` background

#### Subject Colors (Requests)
- **Mathematics**: bg `#F0F0F5`, text `#555`
- **Physics**: bg `#F3F0EE`, text `#666`
- **Chemistry**: bg `#EEF2EF`, text `#555`
- **JEE Advanced**: bg `#F2EFEF`, text `#666`
- **English**: bg `#F2EFF2`, text `#666`

---

### 🏗️ Layout Structure

#### Three-Section Layout
1. **Header** (Sticky)
   - Title + Write button
   - Stories carousel
   - Tab navigation (For you, News, Requests)

2. **Main Feed** (flex-1, max-width 1100px)
   - Blog cards / News articles / Request cards
   - Infinite scroll
   - Loading skeletons

3. **Right Sidebar** (280px, hidden on mobile)
   - Staff Picks
   - Topics
   - Footer links

---

### 📐 Design System

#### Typography
- **Page Title**: 17px, medium weight
- **Blog Title**: 15px, medium weight (cards), 36px (detail view)
- **Blog Subtitle**: 13px, regular (cards), 18px (detail view)
- **Body Text**: 16px, line-height 1.9 (detail view)
- **Author Name**: 12px-14px, medium weight
- **Metadata**: 11px-12px, regular
- **Section Headers**: 11px, semibold, uppercase, tracking-widest

#### Spacing System
- **Page Padding**: 20px (px-5)
- **Card Padding**: 16px (p-4)
- **Card Gap**: 12px (space-y-3)
- **Section Gap**: 20px (space-y-5)

#### Border Radius
- **Cards**: 14px
- **Buttons**: 8px-10px
- **Pills**: 9999px (full rounded)
- **Stories**: Full circle (56px diameter)
- **Modal**: 16px-20px

---

### 🎯 Key UI Components

#### 1. Header Bar
- **Height**: ~52px
- **Background**: #FAFAFA with bottom border
- **Sticky**: Top 0, z-index 40
- **Elements**:
  - "Feed" title (17px)
  - "Write" button with pencil icon

#### 2. Stories Carousel
- **Background**: White with bottom border
- **Height**: ~90px (with padding)
- **Scroll**: Horizontal, no scrollbar
- **Story Item**:
  - Avatar: 56px circle
  - Gradient Ring: 2.5px, Instagram-style (unseen)
  - Border Ring: 1px #EBEBEB (seen)
  - Name: 10px below avatar
  - "Your story" has + icon overlay

**Gradient Ring**:
- Linear gradient: 135deg
- Colors: #FBAA47 → #D91A46 → #A60F93
- Padding: 2.5px

#### 3. Tab Navigation
- **Background**: #FAFAFA with bottom border
- **Tabs**: For you, News, Requests
- **Active State**: 
  - Text color: #111
  - Bottom border: 1px #111
- **Inactive State**: Text color #888
- **Hover**: Smooth color transition

#### 4. Blog Cards (For You Tab)

**Card Structure**:
- **Background**: White
- **Border**: 1px #EBEBEB
- **Border Radius**: 14px
- **Padding**: 16px
- **Hover**: Background #FAFAFA

**Card Content**:
1. **Author Row**:
   - Avatar (22px circle)
   - Name (12px, medium)
   - Verified badge (HomeGuru)
   - Source badge (9px pill)
   - Date (11px, right-aligned)

2. **Content**:
   - Title (15px, medium, line-clamp-2)
   - Subtitle (13px, #888, line-clamp-2)

3. **Meta Row**:
   - Tag pill (#FAFAFA background)
   - Read time (12px, #AAA)
   - Likes count with icon
   - Comments count with icon
   - Bookmark icon (right-aligned)

**Source Badge**:
- **HomeGuru**: Two-tone (blue "home" + orange "Guru")
- **External**: Gray text with source name

#### 5. Blog Detail Modal (Full-Screen)

**Structure**:
- **Progress Bar**: 2px at top, colored by tag accent
- **Top Bar**: Sticky, blur background
  - Back button
  - Action icons (clap, comment, bookmark, share)

**Hero Section**:
- **Background**: Tag-specific color
- **Curved Bottom**: 24px border-radius
- **Content**:
  - Tag pill with read time
  - Title (36px, -0.6px letter-spacing)
  - Subtitle (18px, #666)

**Article Body**:
- **Max Width**: 700px
- **Padding**: 20px horizontal
- **Drop Cap**: First letter (52px, float-left)
- **Paragraphs**: 16px, line-height 1.9
- **Lists**: Custom styled with numbers/bullets
- **Section Headers**: 18px, medium, margin-top 40px

**Author Card**:
- Avatar (44px circle)
- Name + verified badge
- Source badge
- Date
- Follow button

**Engagement Bar**:
- Clap button (with count)
- Comment button (with count)
- Bookmark button
- Share button
- Border top & bottom

#### 6. Blog Editor Modal (Mail-Compose Style)

**Modal Size**:
- Width: 680px max
- Height: 88vh max
- Centered with backdrop

**Header**:
- Close button (X icon)
- "New Post" title
- Save Draft button
- Publish button (black)

**Meta Fields** (Mail-style rows):
1. **From**: Avatar + "You" + HomeGuru badge
2. **Topic**: Dropdown selector
3. **Title**: Input field

**Toolbar**:
- Background: #FAFAFA
- Icons: Bold, Italic, H1, H2, Quote, Lists, Link, Image, Code
- Active state: Black background, white icon

**Body**:
- Textarea: Full width, min-height 220px
- Font size: 15px
- Line height: 1.8
- Placeholder: "Tell your story..."

**Footer**:
- Word count + read time estimate
- "Markdown supported" label

#### 7. News Tab

**Featured Grid** (Top):
- 2-column layout, 280px height
- Left: 1 large card (tall)
- Right: 2 stacked cards

**Featured Card**:
- Image overlay with gradient
- Source badge (white/15 opacity)
- Title (13px-17px, white, text-shadow)
- Description (12px, white/60, tall cards only)

**Trending Strip**:
- Horizontal scroll
- 220px width per item
- Large number (22px, #F0F0F0)
- Title (12px, line-clamp-2)
- Source (10px, #AAA)

**Latest Feed**:
- Row layout with thumbnail
- Source avatar (18px circle)
- Title (15px, line-clamp-2)
- Description (13px, line-clamp-2)
- Thumbnail (120px × 80px, rounded-12px)

#### 8. Requests Tab

**Stats Bar**:
- 3-column grid
- White cards with border
- Label (11px, #AAA)
- Value (20px, medium)

**Request Cards**:
- White background, border
- Padding: 20px

**Card Content**:
1. **Header**:
   - Avatar (40px, 2px border)
   - Name + handle
   - Urgency badge
   - Time ago
   - Dots menu

2. **Tags Row**:
   - Subject (with graduation cap icon)
   - Grade
   - Schedule (with calendar icon)
   - Budget (bold)

3. **Message**: 13px, #555, line-height 1.7

4. **Actions**:
   - Accept button (black, with check icon)
   - Decline button (border, with X icon)
   - Chat button (border, with chat icon)

---

### 🎭 Interactive States

#### Hover Effects
- **Blog Cards**: Background #FAFAFA
- **Buttons**: Background darkens
- **Icons**: Color shifts #888 → #111
- **Stories**: Scale slightly

#### Active States
- **Tab**: Bold text + bottom border
- **Clapped**: Tag accent color, filled icon
- **Bookmarked**: Black color, filled icon
- **Selected Tool**: Black background, white icon

#### Loading States
- **Skeleton Cards**: Pulse animation, gray blocks
- **Infinite Scroll**: Spinning CircleNotch icon

---

### 🎨 Visual Hierarchy

#### Primary Focus
1. Stories carousel (top, colorful gradients)
2. Featured news cards (large images)
3. Blog titles (15px-36px, bold)

#### Secondary Focus
1. Author information
2. Blog subtitles
3. Engagement metrics

#### Tertiary Focus
1. Tags and metadata
2. Sidebar content
3. Footer links

---

### ✨ Special Features

#### 1. Stories (Instagram-Style)
- Gradient ring for unseen stories
- Gray ring for seen stories
- "Your story" with + icon
- Horizontal scroll

#### 2. Infinite Scroll
- Sentinel element at bottom
- Automatic loading on scroll
- Loading spinner indicator
- Prevents duplicate loads

#### 3. Rich Text Editor
- Markdown support
- Live formatting (bold, italic)
- Toolbar with common actions
- Word count + read time estimate
- Mail-compose style layout

#### 4. Blog Detail View
- Full-screen reading experience
- Progress bar (colored by tag)
- Drop cap on first paragraph
- Styled lists and headers
- Related posts section

#### 5. News Aggregation
- Featured grid layout
- Trending strip with numbers
- Latest feed with thumbnails
- External source attribution

#### 6. Request Management
- Urgency indicators
- Subject-specific colors
- Accept/Decline actions
- Chat integration

---

### 📱 Responsive Behavior

#### Mobile (< 1024px)
- Hide right sidebar
- Full-width feed
- Stack elements vertically
- Show FAB for writing

#### Tablet (1024px+)
- Show sidebar
- Maintain grid layouts
- Adjust card sizes

#### Desktop
- Full three-column layout
- Optimal reading width
- All features visible

---

### 🎯 Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation
- Focus states
- Alt text on images
- Sufficient color contrast
- Screen reader friendly

---

### 🔄 Animation & Transitions

- **Modal Entry**: 250ms cubic-bezier
- **Card Hover**: 200ms ease
- **Button States**: 200-300ms transitions
- **Progress Bar**: 150ms ease-out
- **Skeleton Pulse**: Continuous animation
- **Infinite Scroll**: Smooth loading

---

### 📊 Content Types

#### 1. Local Content (HomeGuru)
- Blue/orange badge
- Verified checkmark
- Full article access
- Author profiles

#### 2. External Content
- Source name badge
- Gray styling
- Link to original
- Attribution

#### 3. News Articles
- Image-heavy presentation
- Source logos
- Time stamps
- External links

#### 4. Student Requests
- Structured data display
- Action buttons
- Urgency indicators
- Budget information

---



## 4. TUTOR STUDENTS PAGE (`/students`)

### 🎨 Color Palette

#### Primary Colors
- **Primary Black**: `#111` - Text, active elements, primary actions
- **Primary Orange**: `#F97316` - Unread indicators, accents, highlights
- **Pure White**: `#FFFFFF` - Card backgrounds, main areas
- **Background Gray**: `#FAFAFA` - Page background, hover states

#### Status Colors
- **Unread Orange**: `#FFF7ED` - Unread message background
- **Unread Dot**: `#F97316` - Notification dot
- **Active Green**: `#10B981` - Active status indicators

#### Border & Divider Colors
- **Light Border**: `#EBEBEB` - Card borders, main dividers
- **Subtle Border**: `#F5F5F5` - Internal dividers, subtle separators
- **Medium Border**: `#E5E7EB` - Input borders, button borders

#### Text Colors
- **Primary**: `#111` - Student names, headers, important info
- **Secondary**: `#888` - Subjects, metadata, labels
- **Tertiary**: `#AAA` - Time stamps, helper text
- **Muted**: `#BBB` - Placeholders, disabled text
- **Disabled**: `#CCC` - Disabled states, icons

---

### 🏗️ Layout Structure

#### Two-Column Layout
1. **Main Column** (flex-1, max-width 1100px)
   - Stats strip (4 columns)
   - Search + filter bar
   - Student list cards
   - Empty state

2. **Right Sidebar** (280px, hidden on mobile)
   - Recent Messages
   - Subject Breakdown
   - Class Distribution
   - Quick Actions
   - Footer links

---

### 📐 Design System

#### Typography
- **Page Title**: 17px, medium weight
- **Student Count**: 15px, medium weight, #666
- **Student Names**: 14px, medium weight
- **Subject/Grade**: 12px, regular
- **Last Message**: 13px (bold if unread, regular if read)
- **Metadata**: 11px-12px, regular
- **Section Headers**: 11px, semibold, uppercase, tracking-widest

#### Spacing System
- **Page Padding**: 20px (px-5)
- **Card Padding**: 20px (px-5, py-4)
- **Card Gap**: 20px (space-y-5)
- **Stats Grid Gap**: 0 (divided by borders)

#### Border Radius
- **Cards**: 14px
- **Buttons**: 10px
- **Pills**: 9999px (full rounded)
- **Avatar**: Full circle
- **Search Input**: 10px

---

### 🎯 Key UI Components

#### 1. Header Bar
- **Height**: ~52px
- **Background**: #FAFAFA with bottom border
- **Sticky**: Top 0, z-index 40
- **Elements**:
  - "My Learners" title (17px)
  - Student count (15px, #666)
  - Unread badge (if > 0)

**Unread Badge**:
- Background: #FFF7ED (light orange)
- Text: 12px, semibold, #F97316
- Dot: 6px circle, filled
- Padding: 4px 12px
- Border radius: Full

#### 2. Stats Strip
- **Layout**: 4-column grid
- **Background**: White with border
- **Border Radius**: 14px
- **Dividers**: Vertical 1px #F5F5F5

**Stat Item**:
- Icon: 32px square, rounded-lg, #FAFAFA background
- Label: 11px, #AAA
- Value: 15px, font-light, #111
- Padding: 20px (px-5, py-4)

**Stats Shown**:
1. Total Students (GraduationCap icon)
2. Active This Week (Clock icon)
3. Avg. Rating (Star icon)
4. Sessions This Month (Video icon)

#### 3. Search + Filter Bar
- **Layout**: Flex row with gap
- **Search Input**:
  - Flex-1 (takes remaining space)
  - Left icon: MagnifyingGlass (15px, #BBB)
  - Padding: 10px 16px, 40px left
  - Border: 1px #EBEBEB
  - Border radius: 10px
  - Placeholder: #CCC
  - Focus: Border #DDD

**Filter Buttons**:
- "All" and "Unread" options
- Active: #F0F0F0 background, #111 text
- Inactive: Transparent, #888 text
- Padding: 8px 14px
- Border radius: 10px
- Font: 12px, medium

#### 4. Student List Cards

**Card Structure**:
- **Background**: White
- **Border**: 1px #EBEBEB
- **Border Radius**: 14px
- **Hover**: Background #FAFAFA, cursor pointer
- **Dividers**: 1px #F5F5F5 between cards

**Card Content**:
1. **Avatar Section**:
   - Size: 44px circle
   - Border: 2px #EBEBEB
   - Unread badge: 18px circle, -0.5px offset
     - Background: #F97316
     - Border: 2px white
     - Count: 9px, bold, white

2. **Info Section** (flex-1):
   - **Name Row**:
     - Name: 14px, medium, #111, truncate
     - Unread dot: 6px circle, #F97316 (if unread)
   - **Subject/Grade Row**:
     - Subject: 12px, #888
     - Separator: 10px, #DDD
     - Grade: 12px, #AAA
   - **Last Message**:
     - Text: 13px, truncate
     - Bold #111 if unread
     - Regular #999 if read

3. **Right Section**:
   - Time: 11px, #AAA
   - Arrow: CaretRight (14px, #DDD)
   - Hover: Arrow #AAA

#### 5. Empty State
- **Container**: White card, border, rounded-14px
- **Padding**: 64px vertical (py-16)
- **Content**:
  - Icon: 48px circle, #FAFAFA background
  - MagnifyingGlass: 20px, #CCC
  - Title: 14px, medium, #888
  - Subtitle: 12px, #BBB

#### 6. Sidebar - Recent Messages
- **Background**: White with border
- **Border Radius**: 14px
- **Header**:
  - Label: 11px, uppercase, #AAA
  - Unread count: 10px, semibold, #F97316

**Message Item**:
- Avatar: 32px circle
- Name: 12px, medium, #111, truncate
- Message: 11px, #888, truncate
- Unread dot: 8px circle, #F97316
- Hover: Background #FAFAFA
- Divider: 1px #F5F5F5

**Empty State**:
- Text: "All caught up!" (12px, #BBB)
- Padding: 20px vertical

#### 7. Sidebar - Subject Breakdown
- **Background**: White with border
- **Border Radius**: 14px
- **Header**: 11px, uppercase, #AAA

**Subject Item**:
- Subject name: 12px, #555
- Count: 12px, medium, #111
- Layout: Space-between
- Padding: 10px 16px
- Divider: 1px #F5F5F5

#### 8. Sidebar - Class Distribution
- **Background**: White with border
- **Border Radius**: 14px
- **Header**: 11px, uppercase, #AAA

**Class Item**:
- Grade name: 12px, #555
- Progress bar:
  - Width: 60px
  - Height: 4px
  - Background: #F5F5F5
  - Fill: #DDD, dynamic width
  - Border radius: Full
- Count: 12px, medium, #111
- Layout: Space-between with gap
- Padding: 10px 16px
- Divider: 1px #F5F5F5

#### 9. Sidebar - Quick Actions
- **Background**: White with border
- **Border Radius**: 14px
- **Header**: 11px, uppercase, #AAA

**Action Item**:
- Icon: 15px, #888
- Label: 13px, #555
- Arrow: ArrowRight (12px, #CCC)
- Layout: Space-between
- Padding: 12px 16px
- Hover: Background #FAFAFA
- Divider: 1px #F5F5F5

**Actions**:
1. View Schedule (CalendarBlank icon)
2. Open Wallet (ChatDots icon)

---

### 🎭 Interactive States

#### Hover Effects
- **Student Cards**: Background #FAFAFA, arrow #AAA
- **Sidebar Items**: Background #FAFAFA
- **Search Input**: Border #DDD
- **Filter Buttons**: Smooth color transition

#### Active States
- **Filter Button**: #F0F0F0 background, #111 text
- **Unread Message**: Bold text, orange dot

#### Focus States
- **Search Input**: Border #DDD, outline none
- **Keyboard Navigation**: Focus ring on cards

---

### 🎨 Visual Hierarchy

#### Primary Focus
1. Unread badge (orange, prominent)
2. Student names (14px, medium)
3. Unread messages (bold, orange dot)

#### Secondary Focus
1. Stats strip (icons + numbers)
2. Subject/grade information
3. Last message preview

#### Tertiary Focus
1. Sidebar breakdowns
2. Time stamps
3. Footer links

---

### ✨ Special Features

#### 1. Unread Tracking
- Badge in header with total count
- Orange dot next to student name
- Bold last message text
- Notification badge on avatar

#### 2. Smart Search
- Searches name, subject, and grade
- Real-time filtering
- Debounced input
- Clear visual feedback

#### 3. Filter System
- "All" shows all students
- "Unread" shows only unread conversations
- Active filter highlighted
- Smooth transitions

#### 4. Student Profile Navigation
- Click card to open profile
- Click avatar to open profile
- Smooth routing transition
- Back navigation support

#### 5. Sidebar Analytics
- Subject distribution
- Class distribution with progress bars
- Recent messages quick access
- Quick action shortcuts

---

### 📱 Responsive Behavior

#### Mobile (< 1024px)
- Hide right sidebar
- Full-width student list
- Stack stats in 2×2 grid
- Maintain search functionality

#### Tablet (1024px+)
- Show sidebar
- 4-column stats strip
- Maintain all features

#### Desktop
- Full two-column layout
- Optimal spacing
- All features visible

---

### 🎯 Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Sufficient color contrast ratios
- Screen reader friendly unread indicators
- Alt text on avatars

---

### 🔄 Animation & Transitions

- **Card Hover**: 200ms ease background
- **Arrow Hover**: 200ms ease color
- **Filter Toggle**: 200ms ease all
- **Search Focus**: 200ms ease border
- **Route Transition**: Smooth navigation

---

### 📊 Data Visualization

#### 1. Stats Strip
- Icon-based visual indicators
- Large numbers for quick scanning
- Light font weight for elegance

#### 2. Progress Bars (Class Distribution)
- Horizontal bars (60px width)
- Percentage-based fill
- Subtle gray colors
- Rounded ends

#### 3. Unread Indicators
- Multiple visual cues:
  - Badge in header
  - Dot next to name
  - Bold message text
  - Avatar notification badge
  - Orange color throughout

---

### 🎨 Design Patterns

#### 1. Card-Based Layout
- Consistent 14px border radius
- White backgrounds
- 1px borders (#EBEBEB)
- Hover states on interactive cards

#### 2. List Items
- Consistent padding (20px)
- Dividers between items (#F5F5F5)
- Hover states (#FAFAFA)
- Truncated text with ellipsis

#### 3. Sidebar Widgets
- Stacked vertically with gap
- Consistent header style
- Sticky positioning
- Compact information display

#### 4. Empty States
- Centered content
- Icon + text message
- Helpful guidance
- Subtle colors

---

---

# 📋 OVERALL DESIGN SYSTEM SUMMARY

## Consistent Elements Across All Pages

### Color System
- **Primary**: #111 (black), #F97316 (orange)
- **Backgrounds**: #FFFFFF (white), #FAFAFA (light gray)
- **Borders**: #EBEBEB (light), #F5F5F5 (subtle)
- **Text**: #111 (primary), #888 (secondary), #AAA (tertiary)

### Typography Scale
- **Hero**: 36px
- **Title**: 17-20px
- **Heading**: 15-18px
- **Body**: 13-16px
- **Small**: 11-12px
- **Tiny**: 9-10px

### Spacing Scale
- **4px, 8px, 12px, 16px, 20px, 24px**
- Consistent use across all pages

### Border Radius Scale
- **Small**: 8px
- **Medium**: 10-14px
- **Large**: 16-20px
- **Full**: 9999px (pills/circles)

### Component Patterns
1. **Sticky Headers**: All pages use sticky top navigation
2. **Sidebar Layout**: Consistent 280px-300px sidebars
3. **Card Design**: White background, 14px radius, 1px border
4. **Hover States**: #FAFAFA background, smooth transitions
5. **Icons**: Phosphor Icons library, consistent sizing
6. **Buttons**: Rounded corners, clear hover states
7. **Empty States**: Centered, icon + text, helpful messaging

### Interaction Patterns
- **200-300ms transitions** for all interactive elements
- **Hover feedback** on all clickable items
- **Focus states** for keyboard navigation
- **Loading states** with skeletons or spinners
- **Smooth animations** for modals and transitions

### Accessibility Standards
- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Touch-friendly targets (min 44px)
- Screen reader friendly

---

## Design Philosophy

### 1. **Minimalist & Clean**
- Generous white space
- Subtle borders and dividers
- Limited color palette
- Focus on content

### 2. **Consistent & Predictable**
- Repeated patterns across pages
- Same components styled identically
- Predictable interactions
- Familiar UI patterns

### 3. **Modern & Professional**
- Contemporary design trends
- Smooth animations
- Polished details
- Professional appearance

### 4. **User-Centric**
- Clear visual hierarchy
- Intuitive navigation
- Helpful empty states
- Responsive feedback

### 5. **Performance-Focused**
- Optimized animations
- Lazy loading
- Skeleton screens
- Efficient rendering

---

## Key Differentiators by Page

### Profile Page
- **Focus**: Personal branding
- **Unique**: Cover banner, visitor mode, calendar widget
- **Style**: X/Twitter inspired tabs

### Schedule Page
- **Focus**: Time management
- **Unique**: Timeline view, live indicator, multiple view modes
- **Style**: Calendar-centric, data-dense

### Feed Page
- **Focus**: Content discovery
- **Unique**: Stories, blog editor, news aggregation
- **Style**: Medium/Instagram inspired

### Students Page
- **Focus**: Communication management
- **Unique**: Unread tracking, search/filter, analytics
- **Style**: List-based, information-dense

---

## Technical Implementation Notes

### Frameworks & Libraries
- **React** with TypeScript
- **Next.js** for routing
- **Tailwind CSS** for styling
- **Phosphor Icons** for iconography

### State Management
- React hooks (useState, useEffect, useMemo)
- Local storage for persistence
- Context API where needed

### Performance Optimizations
- Lazy loading images
- Infinite scroll with intersection observer
- Memoized computations
- Debounced search inputs

### Responsive Strategy
- Mobile-first approach
- Breakpoints: 1024px (lg), 1280px (xl)
- Hidden sidebars on mobile
- Flexible layouts

---

**END OF UI ANALYSIS**

