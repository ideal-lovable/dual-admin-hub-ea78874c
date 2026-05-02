import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ShoppingBag, Star, TrendingUp, Calendar, ChevronRight, Radio } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";

const featuredBanner = {
  title: "FVRD Spring Top Picks & Exciting New Shows",
  subtitle: "Curated by Leah, Ava & Maya",
  cta: "Watch Now",
};

const whatToWatch = [
  { title: "The Lodge", genre: "Thriller", image: "🎬" },
  { title: "Murder at Castlewick", genre: "Mystery", image: "🎭" },
  { title: "Crossfire", genre: "Action", image: "🔥" },
  { title: "Tomorrow", genre: "Drama", image: "🌅" },
  { title: "Comedy Hour", genre: "Comedy", image: "😂" },
];

const whatToBuy = [
  { name: "Summer Dress - Floral", store: "Luxe Apparel", price: "$89.99", emoji: "👗" },
  { name: "Leather Tote Bag", store: "Glow & Co.", price: "$145.00", emoji: "👜" },
  { name: "Gold Hoop Earrings", store: "Radiant Beauty", price: "$35.00", emoji: "💍" },
  { name: "Cashmere Scarf", store: "CozyNest", price: "$95.00", emoji: "🧣" },
  { name: "Classic Heels", store: "Luxe Apparel", price: "$120.00", emoji: "👠" },
];

const creatorPicks = [
  { creator: "Leah", pick: "The Lodge", type: "TV Show", emoji: "⭐" },
  { creator: "Ava", pick: "Summer Beats Vol. 3", type: "Music", emoji: "🎵" },
  { creator: "Maya", pick: "Glow & Co. Skincare Set", type: "Product", emoji: "✨" },
  { creator: "Alex", pick: "Crossfire", type: "Movie", emoji: "🎬" },
];

const trendingStorefronts = [
  { name: "Luxe Apparel", category: "Fashion", emoji: "👗" },
  { name: "Glow & Co.", category: "Beauty", emoji: "💄" },
  { name: "CozyNest", category: "Home Decor", emoji: "🏠" },
  { name: "Radiant Beauty", category: "Skincare", emoji: "✨" },
];

const upcomingEvents = [
  { title: "Spring Fashion Livestream", host: "Luxe Apparel", date: "Mar 5, 2026", time: "7:00 PM EST" },
  { title: "Beauty Essentials Live", host: "Glow & Co.", date: "Mar 8, 2026", time: "6:00 PM EST" },
  { title: "Home Makeover Special", host: "CozyNest", date: "Mar 12, 2026", time: "8:00 PM EST" },
];

export default function Discover() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={fvrdLogo} alt="FVRD TV" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/discover" className="text-sm text-primary font-medium">Discover</Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12 animate-slide-up">
        {/* Featured Banner */}
        <div className="relative rounded-2xl overflow-hidden gradient-primary p-10">
          <div className="relative z-10">
            <p className="text-sm text-primary-foreground/70 font-medium mb-2">Mouthful Reviews</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">{featuredBanner.title}</h1>
            <p className="text-primary-foreground/80 mb-6">{featuredBanner.subtitle}</p>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              <Play className="h-4 w-4" /> {featuredBanner.cta}
            </Button>
          </div>
        </div>

        {/* What to Watch */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground">What to Watch</h2>
            <Button variant="link" className="text-primary gap-1">More <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {whatToWatch.map((item) => (
              <div key={item.title} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[3/4] bg-secondary flex items-center justify-center text-5xl">{item.image}</div>
                <div className="p-3">
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to Buy */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> What to Buy
            </h2>
            <Button variant="link" className="text-primary gap-1">More <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {whatToBuy.map((item) => (
              <div key={item.name} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-square bg-secondary flex items-center justify-center text-4xl">{item.emoji}</div>
                <div className="p-3">
                  <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.store}</p>
                  <p className="text-sm font-semibold text-primary mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator Picks */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" /> Creator Picks
            </h2>
            <Button variant="link" className="text-primary gap-1">More <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {creatorPicks.map((pick) => (
              <div key={pick.pick} className="glass-card rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer">
                <span className="text-3xl mb-3 block">{pick.emoji}</span>
                <p className="font-medium text-foreground">{pick.pick}</p>
                <p className="text-xs text-muted-foreground mt-1">{pick.type} · Picked by {pick.creator}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Storefronts */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" /> Trending Storefronts
            </h2>
            <Button variant="link" className="text-primary gap-1">More <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingStorefronts.map((store) => (
              <div key={store.name} className="glass-card rounded-xl p-6 text-center hover:scale-[1.02] transition-transform cursor-pointer">
                <span className="text-4xl mb-3 block">{store.emoji}</span>
                <p className="font-medium text-foreground">{store.name}</p>
                <p className="text-xs text-muted-foreground">{store.category}</p>
                <Button variant="secondary" size="sm" className="mt-3">Visit Storefront</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" /> Upcoming Events
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="glass-card rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-4 w-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">{event.date} · {event.time}</span>
                </div>
                <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground">Hosted by {event.host}</p>
                <Button variant="secondary" size="sm" className="mt-3">Set Reminder</Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
