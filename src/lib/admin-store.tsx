import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type ContentType = "movie" | "video" | "web_series" | "music" | "podcast" | "game";
export type ContentStatus = "draft" | "pending" | "approved" | "rejected" | "flagged" | "scheduled" | "active";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  creator: string;
  status: ContentStatus;
  category: string;
  genres: string[];
  language: string;
  publishedYear: string;
  sortingDate: string;
  isAdult: boolean;
  description: string;
  tags: string[];
  uploadUrl: string;
  trailerUrl: string;
  posterImage: string;
  portraitImage: string;
  landscapeImage: string;
  squareImage: string;
  submitted: string;
  views: string;
}

const seedCategories = [
  "Movies", "Web Series", "Music", "Podcasts", "Games", "Live TV", "Sports", "Documentary", "Short Films", "Kids",
  "Comedy", "Drama", "Lifestyle", "Fashion", "Beauty", "Technology", "Education", "News", "Fitness", "Food",
];

const seedGenres = [
  "Action", "Adventure", "Animation", "Anime", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family",
  "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western", "Musical", "Reality",
  "Pop", "Rock", "Hip-Hop", "R&B", "Jazz", "Classical", "Electronic", "Country", "Indie", "Devotional",
  "Business", "True Crime", "Health", "Sports", "Tech", "Gaming", "Kids",
];

const image = (seed: string) => `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&q=80`;

const seedContent: ContentItem[] = [
  {
    id: "cnt-1",
    title: "Midnight City",
    type: "movie",
    creator: "Northstar Films",
    status: "approved",
    category: "Movies",
    genres: ["Action", "Thriller"],
    language: "English",
    publishedYear: "2026",
    sortingDate: "2026-01-18",
    isAdult: false,
    description: "A neon crime thriller following a courier through one impossible night.",
    tags: ["featured", "crime", "premium"],
    uploadUrl: "https://cdn.example.com/midnight-city.mp4",
    trailerUrl: "https://cdn.example.com/midnight-city-trailer.mp4",
    posterImage: image("1517604931442-7e0c8ed2963c"),
    portraitImage: image("1518676590629-3dcbd9c5a5c9"),
    landscapeImage: image("1489599849927-2ee91cede3ba"),
    squareImage: image("1500530855697-b586d89ba3ee"),
    submitted: "Today 1:12 PM",
    views: "18.4K",
  },
  {
    id: "cnt-2",
    title: "Summer Beats Vol. 3",
    type: "music",
    creator: "Blue Note Digital",
    status: "pending",
    category: "Music",
    genres: ["Pop", "R&B"],
    language: "English",
    publishedYear: "2026",
    sortingDate: "2026-02-02",
    isAdult: false,
    description: "A curated music collection for summer discovery shelves.",
    tags: ["album", "playlist"],
    uploadUrl: "https://cdn.example.com/summer-beats.mp3",
    trailerUrl: "",
    posterImage: image("1493225457124-a3eb161ffa5f"),
    portraitImage: image("1511379938547-c1f69419868d"),
    landscapeImage: image("1511671782779-c97d3d27a1d4"),
    squareImage: image("1459749411175-04bf5292ceea"),
    submitted: "Today 1:28 PM",
    views: "8.2K",
  },
  {
    id: "cnt-3",
    title: "Founder Stories",
    type: "podcast",
    creator: "FVRD Originals",
    status: "draft",
    category: "Podcasts",
    genres: ["Business", "Tech"],
    language: "English",
    publishedYear: "2026",
    sortingDate: "2026-02-12",
    isAdult: false,
    description: "Long-form interviews with builders, creators, and commerce founders.",
    tags: ["podcast", "interview"],
    uploadUrl: "https://cdn.example.com/founder-stories.mp3",
    trailerUrl: "",
    posterImage: image("1478737270239-2f02b77fc618"),
    portraitImage: image("1487537023671-8dce1a785863"),
    landscapeImage: image("1497366754035-f200968a6e72"),
    squareImage: image("1521737604893-d14cc237f11d"),
    submitted: "Today 1:36 PM",
    views: "—",
  },
  {
    id: "cnt-4",
    title: "The Lodge - Season 2",
    type: "web_series",
    creator: "Aurora Studios",
    status: "scheduled",
    category: "Web Series",
    genres: ["Drama", "Mystery"],
    language: "English",
    publishedYear: "2026",
    sortingDate: "2026-03-01",
    isAdult: false,
    description: "A serialized mystery drama with episode-level artwork and release windows.",
    tags: ["series", "featured"],
    uploadUrl: "",
    trailerUrl: "https://cdn.example.com/the-lodge-s2-trailer.mp4",
    posterImage: image("1500534314209-a25ddb2bd429"),
    portraitImage: image("1506744038136-46273834b3fb"),
    landscapeImage: image("1500530855697-b586d89ba3ee"),
    squareImage: image("1518005020951-eccb494ad742"),
    submitted: "Today 1:44 PM",
    views: "12.4K",
  },
];

interface AdminStoreValue {
  content: ContentItem[];
  categories: string[];
  genres: string[];
  addContent: (item: Omit<ContentItem, "id" | "submitted" | "views">) => ContentItem;
  updateContent: (id: string, patch: Partial<ContentItem>) => void;
  deleteContent: (id: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => boolean;
  addGenre: (name: string) => void;
  updateGenre: (oldName: string, newName: string) => void;
  deleteGenre: (name: string) => boolean;
}

const AdminStoreContext = createContext<AdminStoreValue | null>(null);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentItem[]>(seedContent);
  const [categories, setCategories] = useState(seedCategories);
  const [genres, setGenres] = useState(seedGenres);

  const value = useMemo<AdminStoreValue>(() => ({
    content,
    categories,
    genres,
    addContent: (item) => {
      const created: ContentItem = { ...item, id: `cnt-${Date.now()}`, submitted: "Just now", views: "—" };
      setContent((current) => [created, ...current]);
      return created;
    },
    updateContent: (id, patch) => setContent((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item)),
    deleteContent: (id) => setContent((current) => current.filter((item) => item.id !== id)),
    addCategory: (name) => setCategories((current) => current.includes(name) ? current : [...current, name]),
    updateCategory: (oldName, newName) => {
      setCategories((current) => current.map((name) => name === oldName ? newName : name));
      setContent((current) => current.map((item) => item.category === oldName ? { ...item, category: newName } : item));
    },
    deleteCategory: (name) => {
      if (content.some((item) => item.category === name)) return false;
      setCategories((current) => current.filter((item) => item !== name));
      return true;
    },
    addGenre: (name) => setGenres((current) => current.includes(name) ? current : [...current, name]),
    updateGenre: (oldName, newName) => {
      setGenres((current) => current.map((name) => name === oldName ? newName : name));
      setContent((current) => current.map((item) => ({ ...item, genres: item.genres.map((genre) => genre === oldName ? newName : genre) })));
    },
    deleteGenre: (name) => {
      if (content.some((item) => item.genres.includes(name))) return false;
      setGenres((current) => current.filter((item) => item !== name));
      return true;
    },
  }), [categories, content, genres]);

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore() {
  const store = useContext(AdminStoreContext);
  if (!store) throw new Error("useAdminStore must be used inside AdminStoreProvider");
  return store;
}
