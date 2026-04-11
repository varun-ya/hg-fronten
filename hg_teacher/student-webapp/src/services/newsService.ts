export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  source: string;
  image: string;
  time: string;
  url?: string;
  publishedAt?: Date;
}

const RSS_NEWS_FEEDS = [
  "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
  "https://www.ndtv.com/education/rss",
  "https://indianexpress.com/section/education/feed/",
  "https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml",
];

const QUERIES = [
  "education india", "school exam board", "JEE NEET entrance",
  "university college admission", "edtech online learning",
  "teacher training pedagogy", "science technology students",
  "mathematics physics research", "CBSE ICSE board results",
  "scholarship students india", "coding AI curriculum school",
];

const CURRENTS_KEY = "dLqOr2v0rmGPfEG0BQWI7eVMRPJFLqVJxjbBqXE_uDCxJhSA";
const GNEWS_KEY = "4b1e498f0e0e0e3e3e3e3e3e3e3e3e3e";
const NEWSDATA_KEY = "pub_88aboreal123456789";

let _nextId = Date.now() + 500000;
let _page = 0;

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

// Clean title: decode entities, strip trailing "| Source | Source" junk
function cleanTitle(raw: string): string {
  let t = decodeEntities(stripHtml(raw));
  // Remove trailing pipe-separated source names (e.g. "| Hindustan Times | Hindustan Times")
  t = t.replace(/(\s*\|\s*[^|]{2,}){1,}$/, "").trim();
  // Remove trailing dash-separated source (e.g. " - The Hindu")
  t = t.replace(/\s*[-–—]\s*[A-Z][\w\s]{2,}$/, "").trim();
  return t;
}

function cleanDesc(raw: string): string {
  let d = decodeEntities(stripHtml(raw));
  if (d.length > 200) d = d.substring(0, 200) + "...";
  return d;
}

// Curated education stock images for when RSS thumbnails are missing/bad
const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
];
let _stockIdx = 0;
function getStockImage(): string {
  return STOCK_IMAGES[_stockIdx++ % STOCK_IMAGES.length];
}

// Validate image URL — reject tiny icons, tracking pixels, empty strings
function validImage(url?: string | null): string {
  if (!url || url === "None" || url.length < 10) return getStockImage();
  // Reject common junk patterns
  if (/\/icon|favicon|logo|pixel|1x1|spacer|blank/i.test(url)) return getStockImage();
  return url;
}

// Skip junk titles that are just feed names or generic
function isJunkTitle(title: string): boolean {
  const t = title.toLowerCase();
  if (t.length < 15) return true;
  if (/^(education news|latest news|news today|live updates?|rss feed)/i.test(t)) return true;
  return false;
}

function timeAgo(date?: Date): string {
  if (!date) return "";
  const now = Date.now();
  const diff = now - date.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}



// ── RSS2JSON (all 4 feeds in parallel) ──
async function fetchAllRss(seen: Set<string>): Promise<NewsArticle[]> {
  const results: NewsArticle[] = [];

  const promises = RSS_NEWS_FEEDS.map(async (feed) => {
    try {
      const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) return [];
      const data = await res.json();
      if (data.status !== "ok") return [];
      const items = (data.items || []).slice(0, 10);
      const feedTitle = data.feed?.title || "RSS";

      return items
        .map((a: any): NewsArticle | null => {
          const title = cleanTitle(a.title || "");
          if (!title || isJunkTitle(title)) return null;
          const key = title.toLowerCase().substring(0, 40);
          if (seen.has(key)) return null;
          seen.add(key);
          const pubDate = a.pubDate ? new Date(a.pubDate) : undefined;
          return {
            id: _nextId++, title,
            description: cleanDesc(a.description || ""),
            source: decodeEntities(feedTitle),
            image: validImage(a.thumbnail || a.enclosure?.link),
            time: timeAgo(pubDate), url: a.link, publishedAt: pubDate,
          };
        })
        .filter(Boolean) as NewsArticle[];
    } catch {
      return [];
    }
  });

  const all = await Promise.all(promises);
  for (const list of all) results.push(...list);
  return results;
}

// ── Currents API ──
async function fetchCurrents(query: string, seen: Set<string>): Promise<NewsArticle[]> {
  try {
    const url = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(query)}&language=en&page_number=${_page + 1}&apiKey=${CURRENTS_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const data = await res.json();
    return ((data.news || []) as any[]).slice(0, 10)
      .map((a): NewsArticle | null => {
        const title = cleanTitle(a.title || "");
        if (!title || isJunkTitle(title)) return null;
        const key = title.toLowerCase().substring(0, 40);
        if (seen.has(key)) return null;
        seen.add(key);
        const pubDate = a.published ? new Date(a.published) : undefined;
        return {
          id: _nextId++, title, description: cleanDesc(a.description || ""),
          source: decodeEntities(a.author || "Currents"),
          image: validImage(a.image),
          time: timeAgo(pubDate), url: a.url, publishedAt: pubDate,
        };
      })
      .filter(Boolean) as NewsArticle[];
  } catch {
    return [];
  }
}

// ── GNews API ──
async function fetchGNews(query: string, seen: Set<string>): Promise<NewsArticle[]> {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&page=${_page + 1}&apikey=${GNEWS_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const data = await res.json();
    return ((data.articles || []) as any[]).slice(0, 10)
      .map((a): NewsArticle | null => {
        const title = cleanTitle(a.title || "");
        if (!title || isJunkTitle(title)) return null;
        const key = title.toLowerCase().substring(0, 40);
        if (seen.has(key)) return null;
        seen.add(key);
        const pubDate = a.publishedAt ? new Date(a.publishedAt) : undefined;
        return {
          id: _nextId++, title, description: cleanDesc(a.description || ""),
          source: decodeEntities(a.source?.name || "GNews"),
          image: validImage(a.image),
          time: timeAgo(pubDate), url: a.url, publishedAt: pubDate,
        };
      })
      .filter(Boolean) as NewsArticle[];
  } catch {
    return [];
  }
}

// ── NewsData.io API ──
async function fetchNewsData(query: string, seen: Set<string>): Promise<NewsArticle[]> {
  try {
    const url = `https://newsdata.io/api/1/latest?q=${encodeURIComponent(query)}&country=in&language=en&page=${_page}&apikey=${NEWSDATA_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const data = await res.json();
    return ((data.results || []) as any[]).slice(0, 10)
      .map((a): NewsArticle | null => {
        const title = cleanTitle(a.title || "");
        if (!title || isJunkTitle(title)) return null;
        const key = title.toLowerCase().substring(0, 40);
        if (seen.has(key)) return null;
        seen.add(key);
        const pubDate = a.pubDate ? new Date(a.pubDate) : undefined;
        return {
          id: _nextId++, title,
          description: cleanDesc(a.description || a.content || ""),
          source: decodeEntities(a.source_name || "NewsData"),
          image: validImage(a.image_url),
          time: timeAgo(pubDate), url: a.link, publishedAt: pubDate,
        };
      })
      .filter(Boolean) as NewsArticle[];
  } catch {
    return [];
  }
}

export const FALLBACK_NEWS: NewsArticle[] = [
  { id: 1, title: "NEP 2020: How India is transforming its education system", description: "The National Education Policy 2020 aims to overhaul the Indian education system with a focus on multidisciplinary learning, flexibility, and skill development.", source: "The Hindu", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", time: "2h ago" },
  { id: 2, title: "CBSE Board Exams 2025: New pattern and preparation tips", description: "CBSE has introduced competency-based questions in board exams. Experts share strategies for students to adapt to the new format.", source: "NDTV Education", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", time: "5h ago" },
  { id: 3, title: "IIT JEE 2025: Registration opens, key dates announced", description: "NTA has released the schedule for JEE Main 2025. Over 12 lakh students expected to register this year.", source: "India Today", image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800", time: "8h ago" },
  { id: 4, title: "Online tutoring market in India to reach $5B by 2027", description: "The ed-tech sector continues to grow post-pandemic with increasing demand for personalized one-on-one tutoring.", source: "Economic Times", image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800", time: "12h ago" },
  { id: 5, title: "AI in education: How teachers are using ChatGPT in classrooms", description: "Schools across India are experimenting with AI tools to create personalized learning experiences and automate grading.", source: "Hindustan Times", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", time: "1d ago" },
  { id: 6, title: "Karnataka introduces coding and AI curriculum from Class 6", description: "The state government has partnered with tech companies to bring computational thinking to middle school students.", source: "Deccan Herald", image: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800", time: "2d ago" },
];

export async function fetchNews(): Promise<NewsArticle[]> {
  const seen = new Set<string>();
  for (const n of FALLBACK_NEWS) seen.add(n.title.toLowerCase().substring(0, 40));

  const query = QUERIES[_page % QUERIES.length];

  try {
    // Hit ALL 4 API sources in parallel (matching mobile app)
    const [rssResults, currentsResults, gnewsResults, newsDataResults] = await Promise.all([
      fetchAllRss(seen),
      fetchCurrents(query, seen),
      fetchGNews(query, seen),
      fetchNewsData(query, seen),
    ]);

    const apiArticles = [...rssResults, ...currentsResults, ...gnewsResults, ...newsDataResults];
    apiArticles.sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));

    _page++;

    if (apiArticles.length > 0) return apiArticles;
  } catch {
    // fall through
  }

  return FALLBACK_NEWS;
}

export async function fetchMoreNews(): Promise<NewsArticle[]> {
  const seen = new Set<string>();
  const query = QUERIES[_page % QUERIES.length];

  try {
    // Rotate RSS feed + hit Currents + GNews
    const feedIdx = _page % RSS_NEWS_FEEDS.length;
    const feedUrl = RSS_NEWS_FEEDS[feedIdx];

    const [rssResults, currentsResults, gnewsResults] = await Promise.all([
      (async () => {
        try {
          const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
          if (!res.ok) return [];
          const data = await res.json();
          if (data.status !== "ok") return [];
          const feedTitle = data.feed?.title || "RSS";
          return ((data.items || []) as any[]).slice(0, 10)
            .map((a): NewsArticle | null => {
              const title = cleanTitle(a.title || "");
              if (!title || isJunkTitle(title)) return null;
              const key = title.toLowerCase().substring(0, 40);
              if (seen.has(key)) return null;
              seen.add(key);
              const pubDate = a.pubDate ? new Date(a.pubDate) : undefined;
              return {
                id: _nextId++, title,
                description: cleanDesc(a.description || ""),
                source: decodeEntities(feedTitle), image: validImage(a.thumbnail || a.enclosure?.link),
                time: timeAgo(pubDate), url: a.link, publishedAt: pubDate,
              };
            })
            .filter(Boolean) as NewsArticle[];
        } catch { return []; }
      })(),
      fetchCurrents(query, seen),
      fetchGNews(query, seen),
    ]);

    const results = [...rssResults, ...currentsResults, ...gnewsResults];
    results.sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
    _page++;
    return results;
  } catch {
    return [];
  }
}
