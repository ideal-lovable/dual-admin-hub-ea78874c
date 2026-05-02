import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ShoppingBag, Radio, Tv, Store, Users, Film, ChevronRight, TrendingUp } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";

const trendingShows = [
  { title: "The Lodge", genre: "Thriller", emoji: "🎬" },
  { title: "Murder at Castlewick", genre: "Mystery", emoji: "🎭" },
  { title: "Crossfire", genre: "Action", emoji: "🔥" },
  { title: "Tomorrow", genre: "Drama", emoji: "🌅" },
  { title: "Comedy Hour", genre: "Comedy", emoji: "😂" },
];

const trendingProducts = [
  { name: "Summer Dress", store: "Luxe Apparel", price: "$89.99", emoji: "👗" },
  { name: "Leather Tote", store: "Glow & Co.", price: "$145.00", emoji: "👜" },
  { name: "Gold Earrings", store: "Radiant Beauty", price: "$35.00", emoji: "💍" },
  { name: "Cashmere Scarf", store: "CozyNest", price: "$95.00", emoji: "🧣" },
  { name: "Classic Heels", store: "Luxe Apparel", price: "$120.00", emoji: "👠" },
];

const featuredStorefronts = [
  { name: "Luxe Apparel", category: "Fashion", emoji: "👗" },
  { name: "Glow & Co.", category: "Beauty", emoji: "💄" },
  { name: "CozyNest", category: "Home Decor", emoji: "🏠" },
  { name: "Radiant Beauty", category: "Skincare", emoji: "✨" },
];

const liveNow = [
  { title: "Spring Fashion Showcase", host: "Luxe Apparel", viewers: 234 },
  { title: "Beauty Essentials Live", host: "Glow & Co.", viewers: 178 },
  { title: "Home Makeover Tips", host: "CozyNest", viewers: 92 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={fvrdLogo} alt="FVRD TV" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discover</Link>
            <Link to="/business/storefront" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Store</Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/signup">
              <Button size="sm" className="gradient-primary text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Stream. Shop. Discover.
            <br />
            <span className="text-gradient">All in One Place</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your favorite creators, small businesses, shows, and livestreams — all on FVRD TV.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/discover">
              <Button size="lg" className="gradient-primary text-primary-foreground gap-2 shadow-glow text-base px-8">
                <Play className="h-5 w-5" /> Start Watching
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8">
                <ShoppingBag className="h-5 w-5" /> Browse Marketplace
              </Button>
            </Link>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6 text-center">
              <Tv className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Watch Shows & Live Channels</h3>
              <p className="text-sm text-muted-foreground">Movies, TV shows, podcasts, music, and creator content</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <ShoppingBag className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Shop Small Business Products</h3>
              <p className="text-sm text-muted-foreground">Browse curated storefronts and discover trending products</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <Radio className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Join Live Shopping & Events</h3>
              <p className="text-sm text-muted-foreground">Watch livestreams and buy products in real time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Trending Now</h2>
          <Link to="/discover"><Button variant="link" className="text-primary gap-1">View All <ChevronRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {trendingShows.map((show) => (
            <div key={show.title} className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="aspect-[3/4] bg-secondary flex items-center justify-center text-5xl">{show.emoji}</div>
              <div className="p-3">
                <p className="font-medium text-sm text-foreground">{show.title}</p>
                <p className="text-xs text-muted-foreground">{show.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" /> Discover Small Businesses & Trending Products
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {trendingProducts.map((item) => (
            <div key={item.name} className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
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

      {/* Live Now */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio className="h-6 w-6 text-destructive animate-pulse" /> Live Now — Join the Experience
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {liveNow.map((stream) => (
            <div key={stream.title} className="glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="aspect-video bg-secondary flex items-center justify-center relative">
                <Radio className="h-12 w-12 text-muted-foreground/30" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/90 text-destructive-foreground text-xs px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive-foreground animate-pulse" />
                  LIVE
                </div>
                <div className="absolute top-3 right-3 text-xs text-foreground bg-background/60 backdrop-blur px-2 py-1 rounded">
                  {stream.viewers} watching
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground">{stream.title}</h3>
                <p className="text-sm text-muted-foreground">Hosted by {stream.host}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Storefronts */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" /> Featured Storefronts
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredStorefronts.map((store) => (
            <div key={store.name} className="glass-card rounded-xl p-6 text-center cursor-pointer hover:scale-[1.02] transition-transform">
              <span className="text-5xl mb-4 block">{store.emoji}</span>
              <p className="font-display font-semibold text-foreground">{store.name}</p>
              <p className="text-sm text-muted-foreground mb-3">{store.category}</p>
              <Button variant="secondary" size="sm">Visit Storefront</Button>
            </div>
          ))}
        </div>
      </section>

      {/* For Creators & Businesses */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">For Creators & Small Businesses</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Join the FVRD TV ecosystem and reach millions of engaged viewers and shoppers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-8 text-center">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Creators</h3>
            <p className="text-sm text-muted-foreground mb-4">Upload videos, host livestreams, curate picks, and grow your audience</p>
            <Link to="/user/dashboard"><Button variant="secondary" className="w-full">Open Creator Panel</Button></Link>
          </div>
          <div className="glass-card rounded-xl p-8 text-center">
            <Store className="h-10 w-10 text-success mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Small Businesses</h3>
            <p className="text-sm text-muted-foreground mb-4">Sell products, host live content, and build your storefront</p>
            <Link to="/business/dashboard"><Button variant="secondary" className="w-full">Open Business Panel</Button></Link>
          </div>
          <div className="glass-card rounded-xl p-8 text-center">
            <Film className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Publishers</h3>
            <p className="text-sm text-muted-foreground mb-4">Submit films, music, TV shows, games, and track performance</p>
            <Link to="/publisher/dashboard"><Button variant="secondary" className="w-full">Open Publisher Panel</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src={fvrdLogo} alt="FVRD TV" className="h-8 w-auto mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Where business meets entertainment. Stream, shop, and discover — all in one place.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
