# HomeGuru Dashboard

A modern, responsive dashboard built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📊 Dashboard with multiple widgets
- 📅 Learning activity calendar
- 📚 Upcoming schedule
- 📝 Pending assignments
- 📈 Learning hours chart
- 👨‍🏫 Trending teachers
- 🎯 Learning quest challenges
- 📱 Fully responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
HomeGuru/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Banner.tsx
│   ├── StatsCards.tsx
│   ├── LearningQuest.tsx
│   ├── UpcomingSchedule.tsx
│   ├── LearningActivity.tsx
│   ├── PendingAssignments.tsx
│   ├── LearningHours.tsx
│   ├── ReviewLesson.tsx
│   └── TrendingTeachers.tsx
└── package.json
```

## Customization

Each component is modular and can be easily customized:

1. **Colors**: Modify Tailwind classes in components
2. **Layout**: Adjust grid columns in `app/page.tsx`
3. **Data**: Replace mock data with API calls
4. **Icons**: Using lucide-react icons (easily replaceable)

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
