# Chat System - Visual Workflow Guide

## 🎯 Complete User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                      SIDEBAR NAVIGATION                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  🏠 Home                                                │ │
│  │  📅 Schedule                                            │ │
│  │  📹 Meet                                                │ │
│  │  📰 Feed                                                │ │
│  │  ─────────────────────────────────────────────────────  │ │
│  │  🎓 Students  ← CLICK HERE                             │ │
│  │  💰 Wallet                                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    STUDENTS INBOX PAGE                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Messages                                          [3]  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  [MI]  Meera Iyer                          10m ago     │ │
│  │        English Literature · Class 12                    │ │
│  │        Thank you for the session!                       │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  [AP]  Arjun Patel                    [2]  1h ago      │ │
│  │        Mathematics · Class 11                           │ │
│  │        Can we reschedule tomorrow's class?              │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  [PS]  Priya Sharma                   [1]  3h ago      │ │
│  │        Physics · Class 12                               │ │
│  │        I have a doubt in chapter 5                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  [RK]  Rohan Kumar                         5h ago      │ │
│  │        Chemistry · Class 11                             │ │
│  │        Sent you the assignment                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓ CLICK STUDENT
┌─────────────────────────────────────────────────────────────┐
│                    INDIVIDUAL CHAT PAGE                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  ← [MI] Meera Iyer                                     │ │
│  │         English Literature                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                      Today                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Good morning! Ready for today's session?              │ │
│  │                                          9:00 AM        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│                  ┌──────────────────────────────────────┐   │
│                  │  Yes, I'm ready!                     │   │
│                  │                            9:02 AM   │   │
│                  └──────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  📹 Shakespeare's Macbeth - Act 3 Analysis        ▼   │ │
│  │     Jan 16, 2024 · Completed                           │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ [Summary] [Assignments] [Notes] [Media] [Chat]  │ │ │
│  │  ├──────────────────────────────────────────────────┤ │ │
│  │  │ Discussed the themes of ambition and guilt...   │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│                  ┌──────────────────────────────────────┐   │
│                  │  Thank you for the session!          │   │
│                  │                           11:00 AM   │   │
│                  └──────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  You're welcome! Don't forget to complete...           │ │
│  │                                         11:02 AM        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  [+]  [Type a message...]                      [Send]  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Message Types Visual Guide

### 1. Text Message (Tutor)
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│                  ┌──────────────────────────────────┐  │
│                  │  Good morning! Ready for         │  │
│                  │  today's session?                │  │
│                  │                        9:00 AM   │  │
│                  └──────────────────────────────────┘  │
│                                                         │
└────────────────────────────────────────────────────────┘
```
- Blue background (#3B82F6)
- White text
- Right-aligned
- Rounded bottom-right corner (4px)
- Timestamp in white/70%

### 2. Text Message (Student)
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────────────────────────────┐             │
│  │  Yes, I'm ready!                     │             │
│  │                            9:02 AM   │             │
│  └──────────────────────────────────────┘             │
│                                                         │
└────────────────────────────────────────────────────────┘
```
- White background
- Border (#EBEBEB)
- Black text (#111)
- Left-aligned
- Rounded bottom-left corner (4px)
- Timestamp in grey (#AAA)

### 3. File Message
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────────────────────────────┐             │
│  │  📄  Integration_Notes.pdf           │             │
│  │      2.4 MB                          │             │
│  └──────────────────────────────────────┘             │
│  2:10 PM                                               │
│                                                         │
└────────────────────────────────────────────────────────┘
```
- White card with border
- File icon (grey)
- File name (bold)
- File size (small grey text)
- Timestamp below

### 4. Image Message
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────────────────────────────┐             │
│  │                                       │             │
│  │         [IMAGE PREVIEW]               │             │
│  │                                       │             │
│  └──────────────────────────────────────┘             │
│  8:06 AM                                               │
│                                                         │
└────────────────────────────────────────────────────────┘
```
- Image in rounded container
- Border (#EBEBEB)
- Timestamp below

### 5. Class Block (Collapsed)
```
┌────────────────────────────────────────────────────────┐
│  📹  Shakespeare's Macbeth - Act 3 Analysis       ▼   │
│      Jan 16, 2024 · Completed                          │
└────────────────────────────────────────────────────────┘
```
- Video camera icon (blue)
- Topic name (bold)
- Date + status
- Caret down icon

### 6. Class Block (Expanded)
```
┌────────────────────────────────────────────────────────┐
│  📹  Shakespeare's Macbeth - Act 3 Analysis       ▲   │
│      Jan 16, 2024 · Completed                          │
├────────────────────────────────────────────────────────┤
│  [Summary] [Assignments] [Notes] [Media] [Chat]       │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Discussed the themes of ambition and guilt in Act 3.  │
│  Analyzed key scenes and character development.        │
│                                                         │
└────────────────────────────────────────────────────────┘
```
- Expanded with sections
- Active section highlighted (blue)
- Content area below tabs
- Caret up icon

---

## 🎨 Color Palette

```
┌─────────────────────────────────────────────────────────┐
│  Background Colors                                       │
├─────────────────────────────────────────────────────────┤
│  #FAFAFA  ████  Page background                         │
│  #FFFFFF  ████  Card background                         │
│  #F5F5F5  ████  Dividers, inactive elements             │
│  #EBEBEB  ████  Borders                                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Text Colors                                             │
├─────────────────────────────────────────────────────────┤
│  #111     ████  Primary text                            │
│  #555     ████  Secondary text                          │
│  #888     ████  Tertiary text                           │
│  #AAA     ████  Timestamps, labels                      │
│  #CCC     ████  Disabled text                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Accent Colors                                           │
├─────────────────────────────────────────────────────────┤
│  #F97316  ████  Orange (primary accent, badges)         │
│  #3B82F6  ████  Blue (tutor messages, links)            │
│  #22C55E  ████  Green (completed status)                │
│  #EF4444  ████  Red (missed status)                     │
│  #8B5CF6  ████  Purple (icons, accents)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Interaction States

### Button States
```
┌─────────────────────────────────────────────────────────┐
│  Normal:    bg-[#3B82F6]  text-white                    │
│  Hover:     bg-[#2563EB]  text-white                    │
│  Disabled:  bg-[#E5E7EB]  text-[#AAA]                   │
│  Active:    bg-[#1D4ED8]  text-white                    │
└─────────────────────────────────────────────────────────┘
```

### Card States
```
┌─────────────────────────────────────────────────────────┐
│  Normal:    bg-white  border-[#EBEBEB]                  │
│  Hover:     bg-[#FAFAFA]  border-[#EBEBEB]              │
│  Active:    bg-[#F5F5F5]  border-[#DDD]                 │
└─────────────────────────────────────────────────────────┘
```

### Input States
```
┌─────────────────────────────────────────────────────────┐
│  Normal:    border-[#EBEBEB]                            │
│  Focus:     border-[#3B82F6]  outline-none              │
│  Error:     border-[#EF4444]                            │
└─────────────────────────────────────────────────────────┘
```

---

## 📐 Spacing System

```
┌─────────────────────────────────────────────────────────┐
│  Padding Scale                                           │
├─────────────────────────────────────────────────────────┤
│  px-2   8px    Small elements                           │
│  px-3   12px   Buttons, chips                           │
│  px-4   16px   Cards, containers                        │
│  px-5   20px   Page padding                             │
│  px-6   24px   Large containers                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Gap Scale                                               │
├─────────────────────────────────────────────────────────┤
│  gap-1   4px    Tight spacing                           │
│  gap-2   8px    Small spacing                           │
│  gap-3   12px   Default spacing                         │
│  gap-4   16px   Medium spacing                          │
│  gap-6   24px   Large spacing                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Border Radius                                           │
├─────────────────────────────────────────────────────────┤
│  rounded-[4px]    Small corners (message bubbles)       │
│  rounded-[8px]    Medium corners (buttons)              │
│  rounded-[12px]   Large corners (cards, inputs)         │
│  rounded-[14px]   Extra large (main containers)         │
│  rounded-full     Circular (avatars, badges)            │
└─────────────────────────────────────────────────────────┘
```

---

## 🎬 Animation Guide

### Transitions
```css
/* Hover transitions */
transition-colors    /* 150ms ease */
transition-all       /* 150ms ease */

/* Smooth scroll */
behavior: smooth

/* Fade in */
opacity: 0 → 1 (300ms)

/* Slide up */
transform: translateY(10px) → translateY(0) (300ms)
```

### Animations
```css
/* Pulse (unread badge) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin (loading) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 📱 Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────┐
│  Mobile:     < 640px   (sm)                             │
│  Tablet:     640-1024px (md-lg)                         │
│  Desktop:    > 1024px  (xl)                             │
│  Max width:  1440px    (container)                      │
└─────────────────────────────────────────────────────────┘
```

### Layout Adjustments
```
Mobile:
- Full width
- Single column
- Stacked elements
- Larger touch targets

Tablet:
- Max width 800px
- Centered content
- Comfortable spacing

Desktop:
- Max width 1440px
- Sidebar + content
- Optimal reading width
```

---

## ✅ Implementation Checklist

### Core Features
- [x] Student inbox page
- [x] Individual chat page
- [x] Text messages (tutor/student)
- [x] File messages
- [x] Image messages
- [x] Class blocks
- [x] Date labels
- [x] Timestamps
- [x] Message input
- [x] Attach menu
- [x] Send functionality
- [x] Auto-scroll
- [x] Navigation

### UI Polish
- [x] Hover effects
- [x] Transitions
- [x] Rounded corners
- [x] Shadows
- [x] Borders
- [x] Colors
- [x] Typography
- [x] Spacing
- [x] Responsive layout

### Interactions
- [x] Click to open chat
- [x] Click to expand class
- [x] Click to switch sections
- [x] Click to send message
- [x] Enter to send
- [x] Click plus for attach
- [x] Click outside to close
- [x] Back navigation

---

**End of Visual Workflow Guide**
