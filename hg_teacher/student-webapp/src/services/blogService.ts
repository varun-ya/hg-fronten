export interface BlogArticle {
  id: number;
  title: string;
  subtitle: string;
  body: string;
  author: string;
  tag: string;
  readTime: string;
  date: string;
  source: string;
  isLocal: boolean;
  likes: number;
  comments: number;
  sourceUrl?: string;
  thumbnail?: string;
}

const ALL_FEEDS = [
  { url: "https://blog.ed.gov/feed/", source: "US Dept. of Education" },
  { url: "https://www.edutopia.org/rss.xml", source: "Edutopia" },
  { url: "https://feeds.feedburner.com/TeachThought", source: "TeachThought" },
  { url: "https://www.edsurge.com/feeds/rss", source: "EdSurge" },
  { url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms", source: "Times of India" },
  { url: "https://indianexpress.com/section/education/feed/", source: "Indian Express" },
  { url: "https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml", source: "Hindustan Times" },
];

let _nextId = Date.now();
let _morePage = 0;

function guessTag(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("math") || t.includes("algebra") || t.includes("calculus")) return "Mathematics";
  if (t.includes("physics") || t.includes("science")) return "Science";
  if (t.includes("jee") || t.includes("neet") || t.includes("exam")) return "Exams";
  if (t.includes("ai") || t.includes("tech") || t.includes("digital")) return "EdTech";
  if (t.includes("teacher") || t.includes("teaching") || t.includes("pedagogy")) return "Teaching";
  if (t.includes("student") || t.includes("learn") || t.includes("study")) return "Learning";
  if (t.includes("policy") || t.includes("nep") || t.includes("government")) return "Policy";
  return "Education";
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const dt = new Date(dateStr);
  if (isNaN(dt.getTime())) return dateStr;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;amp;/g, "&").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#\d+;/g, "")
    .trim();
}

function cleanText(raw: string): string {
  let t = decodeEntities(stripHtml(raw));
  t = t.replace(/(\s*\|\s*[^|]{2,}){1,}$/, "").trim();
  t = t.replace(/\s*[-\u2013\u2014]\s*[A-Z][\w\s]{2,}$/, "").trim();
  return t;
}

async function fetchRss(feedUrl: string, source: string, seen: Set<string>): Promise<BlogArticle[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return [];
  const data = await res.json();
  if (data.status !== "ok") return [];
  const items = (data.items || []).slice(0, 10);

  return items
    .map((a: any): BlogArticle | null => {
      const title = cleanText(a.title || "");
      if (!title || title.length < 10) return null;
      const key = title.toLowerCase();
      if (seen.has(key)) return null;
      seen.add(key);

      const rawDesc = decodeEntities(stripHtml(a.description || ""));
      const subtitle = rawDesc.length > 200 ? rawDesc.substring(0, 200) + "..." : rawDesc;
      const content = decodeEntities(stripHtml(a.content || a.description || ""));
      const words = content.split(/\s+/).length;
      const readMin = Math.max(1, Math.min(30, Math.ceil(words / 200)));
      const rawAuthor = (a.author || "").trim();

      return {
        id: _nextId++,
        title,
        subtitle,
        body: content,
        author: rawAuthor || source,
        tag: guessTag(title),
        readTime: `${readMin} min read`,
        date: formatDate(a.pubDate),
        source,
        isLocal: false,
        likes: 0,
        comments: 0,
        sourceUrl: a.link,
        thumbnail: a.thumbnail || a.enclosure?.link || undefined,
      };
    })
    .filter(Boolean) as BlogArticle[];
}

export const FALLBACK_BLOGS: BlogArticle[] = [
  {
    id: 1, author: "You", source: "HomeGuru", isLocal: true,
    title: "How I teach Quadratic Equations differently",
    subtitle: "Most students memorize formulas. I teach them to see patterns. Here's my approach that helped 50+ students...",
    body: "Most students memorize formulas. I teach them to see patterns.\n\nWhen I first started teaching quadratic equations, I noticed that students would blindly apply the formula without understanding what they were actually solving for.\n\nSo I changed my approach. Instead of starting with ax² + bx + c = 0, I start with a real problem.\n\nHere's my 3-step method:\n\n1. Start with the story — I give them a real-world scenario. A ball thrown in the air. A garden being fenced. Something tangible.\n\n2. Visualize the parabola — Before any algebra, we sketch. Where does it go up? Where does it come down? What's the highest point?\n\n3. Then solve — Only after they understand what they're looking for do we bring in the formula.\n\nThis approach has helped 50+ students not just pass, but actually enjoy quadratics. The key insight is that mathematics isn't about memorizing — it's about seeing patterns.",
    tag: "Mathematics", readTime: "5 min read", date: "Dec 12, 2024", likes: 24, comments: 5,
  },
  {
    id: 2, author: "You", source: "HomeGuru", isLocal: true,
    title: "Why most students fail at Physics — and how to fix it",
    subtitle: "Physics isn't about memorizing equations. It's about understanding the world around you...",
    body: "Physics isn't about memorizing equations. It's about understanding the world around you.\n\nThe biggest mistake students make is treating physics like a formula sheet. They memorize F = ma without ever understanding what force actually feels like.\n\nWhen I teach Newton's laws, I don't start with the textbook. I start by pushing a chair across the room. \"Why did it stop?\"\n\nThat simple question opens up friction, inertia, and net force — all from one push of a chair.\n\nHere's what I've learned after 3 years of teaching physics:\n\n• Start with the phenomenon, not the formula\n• Let students predict before you explain\n• Use their wrong answers as teaching moments\n• Connect every concept to something they can touch or see\n\nOnce we shifted to conceptual thinking, their scores jumped by 30-40%. But more importantly, they started asking questions. Real questions. That's when you know physics has clicked.",
    tag: "Physics", readTime: "8 min read", date: "Dec 5, 2024", likes: 42, comments: 12,
  },
  {
    id: 3, author: "Priya Patel", source: "HomeGuru", isLocal: true,
    title: "The Feynman Technique: How to learn anything faster",
    subtitle: "Richard Feynman had a simple method for understanding complex topics that I use in every tutoring session.",
    body: "Richard Feynman, the Nobel Prize-winning physicist, had a deceptively simple method for understanding complex topics. I use it in every tutoring session.\n\nStep 1: Choose a concept — Pick something you want to understand deeply.\n\nStep 2: Teach it to a child — Explain it in simple language, without jargon. If you can't, you don't understand it well enough.\n\nStep 3: Identify gaps and go back to the source — When you get stuck while explaining, that's where your understanding breaks down. Go back and study that specific part.\n\nStep 4: Simplify and use analogies — Create comparisons to everyday things. \"Electricity is like water flowing through pipes.\"\n\nI've seen students go from failing to scoring 90+ just by adopting this technique. The magic is in the simplification — when you can explain quantum mechanics to a 10-year-old, you truly understand it.",
    tag: "Study Tips", readTime: "4 min read", date: "Nov 30, 2024", likes: 31, comments: 8,
  },
  {
    id: 4, author: "You", source: "HomeGuru", isLocal: true,
    title: "My journey from student to tutor",
    subtitle: "I was an average student in class 10. Failed my first maths test. But one teacher changed everything...",
    body: "I was an average student in class 10. Failed my first maths test.\n\nI remember staring at the red marks on my paper, feeling like mathematics was a language I'd never speak. My parents were worried. I was frustrated.\n\nThen Mr. Sharma happened. He was a new maths teacher who did something no one else had done — he asked me what I found confusing. Not \"study harder\" or \"pay attention.\" He actually listened.\n\nHe spent 30 minutes after school showing me that algebra was just like solving a mystery. \"x is the suspect. The equation is the clue. Your job is to find x.\" Something clicked.\n\nBy class 12, I scored 95 in mathematics. I went on to study B.Sc Maths. And now, 5 years later, I'm doing for my students what Mr. Sharma did for me.\n\nTeaching isn't about knowing everything. It's about remembering what it felt like to not know — and helping someone through that moment.",
    tag: "Personal", readTime: "4 min read", date: "Nov 28, 2024", likes: 18, comments: 3,
  },
  {
    id: 5, author: "Rohan Gupta", source: "HomeGuru", isLocal: true,
    title: "JEE preparation: A 90-day roadmap that actually works",
    subtitle: "After coaching 200+ JEE aspirants, I've distilled the preparation into a focused 90-day plan...",
    body: "After coaching 200+ JEE aspirants, I've distilled the preparation into a focused 90-day plan that actually works.\n\nDays 1-30: Foundation\nRevise NCERT thoroughly. Every single concept. Don't skip the \"easy\" chapters — JEE loves testing fundamentals in tricky ways. Solve all NCERT examples and exercises.\n\nDays 31-60: Problem Solving\nThis is where the real work happens. HC Verma for Physics, Irodov for the brave. DC Pandey for practice. For Maths, RD Sharma and Cengage. For Chemistry, MS Chouhan for organic.\n\nDays 61-80: Mock Tests\nOne full test every 2 days. Analyze every test for at least 2 hours. Track your weak areas. Don't just count marks — understand why you got each question wrong.\n\nDays 81-90: Revision Only\nNo new topics. Revise formula sheets. Re-solve problems you got wrong. Sleep well. Eat well.\n\nThe key is consistency, not intensity. 6 focused hours beat 12 distracted ones every time.",
    tag: "JEE Prep", readTime: "12 min read", date: "Nov 20, 2024", likes: 56, comments: 19,
  },
];

export async function fetchBlogs(): Promise<BlogArticle[]> {
  const seen = new Set<string>();
  for (const b of FALLBACK_BLOGS) seen.add(b.title.toLowerCase());

  const results = [...FALLBACK_BLOGS];

  try {
    // Fetch ALL 7 feeds in parallel
    const fetched = await Promise.all(
      ALL_FEEDS.map((f) => fetchRss(f.url, f.source, seen).catch(() => [] as BlogArticle[]))
    );
    for (const list of fetched) results.push(...list);
  } catch {
    // fallback only
  }

  return results;
}

export async function fetchMoreBlogs(): Promise<BlogArticle[]> {
  const seen = new Set<string>();
  const feed = ALL_FEEDS[_morePage % ALL_FEEDS.length];
  _morePage++;
  return fetchRss(feed.url, feed.source, seen).catch(() => []);
}
