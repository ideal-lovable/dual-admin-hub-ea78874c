import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff, Film } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { useState } from "react";

export default function PublisherSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={fvrdLogo} alt="FVRD TV" className="h-10 w-auto" />
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Film className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">Publisher Account</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Become a Publisher</h2>
            <p className="text-muted-foreground">Distribute your content on FVRD TV</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-success' : 'bg-secondary'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-success' : 'bg-secondary'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-success' : 'bg-secondary'}`} />
          </div>

          {/* Form Step 1 - Account Info */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div>
                <Label htmlFor="contactName" className="text-foreground">Primary Contact Name</Label>
                <Input id="contactName" placeholder="John Smith" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Business Email</Label>
                <Input id="email" type="email" placeholder="contact@studio.com" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative mt-2">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="bg-secondary border-border pr-10" 
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-success text-success-foreground hover:bg-success/90">
                Continue
              </Button>
            </form>
          )}

          {/* Form Step 2 - Company Info */}
          {step === 2 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div>
                <Label htmlFor="companyName" className="text-foreground">Company / Studio Name</Label>
                <Input id="companyName" placeholder="Stellar Productions" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="companyType" className="text-foreground">Company Type</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Film/TV Studio</SelectItem>
                    <SelectItem value="production">Production Company</SelectItem>
                    <SelectItem value="distributor">Content Distributor</SelectItem>
                    <SelectItem value="network">Network/Channel</SelectItem>
                    <SelectItem value="indie">Independent Filmmaker</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contentType" className="text-foreground">Primary Content Type</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="series">TV Series</SelectItem>
                    <SelectItem value="documentary">Documentaries</SelectItem>
                    <SelectItem value="short">Short Films</SelectItem>
                    <SelectItem value="live">Live Events</SelectItem>
                    <SelectItem value="mixed">Mixed Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground">Company Description</Label>
                <Textarea 
                  id="description" 
                  rows={3}
                  placeholder="Tell us about your company and content..."
                  className="mt-2 bg-secondary border-border resize-none"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-foreground">Company Website</Label>
                <Input id="website" placeholder="www.yourcompany.com" className="mt-2 bg-secondary border-border" />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-success text-success-foreground hover:bg-success/90">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Form Step 3 - Content & Licensing */}
          {step === 3 && (
            <form className="space-y-5">
              <div>
                <Label htmlFor="catalogSize" className="text-foreground">Estimated Catalog Size</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 titles</SelectItem>
                    <SelectItem value="11-50">11-50 titles</SelectItem>
                    <SelectItem value="51-100">51-100 titles</SelectItem>
                    <SelectItem value="101-500">101-500 titles</SelectItem>
                    <SelectItem value="500+">500+ titles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="territories" className="text-foreground">Licensing Territories</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select territories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States Only</SelectItem>
                    <SelectItem value="na">North America</SelectItem>
                    <SelectItem value="worldwide">Worldwide</SelectItem>
                    <SelectItem value="custom">Custom Territories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="existingDistribution" className="text-foreground">Current Distribution Platforms (optional)</Label>
                <Input id="existingDistribution" placeholder="e.g., Netflix, Hulu, Prime Video" className="mt-2 bg-secondary border-border" />
              </div>

              <div>
                <Label htmlFor="notes" className="text-foreground">Additional Notes (optional)</Label>
                <Textarea 
                  id="notes" 
                  rows={2}
                  placeholder="Any additional information..."
                  className="mt-2 bg-secondary border-border resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                  I agree to the <Link to="/terms" className="text-success hover:underline">Publisher Agreement</Link> and <Link to="/privacy" className="text-success hover:underline">Privacy Policy</Link>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="rights" className="mt-1" />
                <Label htmlFor="rights" className="text-sm text-muted-foreground font-normal">
                  I confirm that I have the legal rights to distribute the content I will upload
                </Label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-success text-success-foreground hover:bg-success/90">
                  Submit Application
                </Button>
              </div>
            </form>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-success hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-success/20 via-secondary to-accent/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎬</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Distribute Your Content</h3>
          <p className="text-muted-foreground mb-6">
            Reach new audiences with your films, series, and live events on FVRD TV's growing platform.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-success">✓</span>
              <span className="text-sm">Premium content placement</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-success">✓</span>
              <span className="text-sm">Revenue share on views</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-success">✓</span>
              <span className="text-sm">Creator recommendation network</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-success">✓</span>
              <span className="text-sm">Detailed analytics & reporting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
