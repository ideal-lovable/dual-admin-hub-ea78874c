import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff, Store } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { useState } from "react";

export default function BusinessSignup() {
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
              <Store className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Business Account</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Start Selling</h2>
            <p className="text-muted-foreground">Open your storefront on FVRD TV</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-secondary'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-secondary'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-accent' : 'bg-secondary'}`} />
          </div>

          {/* Form Step 1 - Account Info */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div>
                <Label htmlFor="ownerName" className="text-foreground">Owner Full Name</Label>
                <Input id="ownerName" placeholder="Sarah Lopez" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Business Email</Label>
                <Input id="email" type="email" placeholder="hello@yourbusiness.com" className="mt-2 bg-secondary border-border" required />
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

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Continue
              </Button>
            </form>
          )}

          {/* Form Step 2 - Business Info */}
          {step === 2 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div>
                <Label htmlFor="businessName" className="text-foreground">Business Name</Label>
                <Input id="businessName" placeholder="Luxe Apparel" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="tagline" className="text-foreground">Tagline</Label>
                <Input id="tagline" placeholder="e.g., Modern women's fashion" className="mt-2 bg-secondary border-border" />
              </div>

              <div>
                <Label htmlFor="category" className="text-foreground">Business Category</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                    <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="art">Art & Crafts</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground">Business Description</Label>
                <Textarea 
                  id="description" 
                  rows={3}
                  placeholder="Tell customers about your business..."
                  className="mt-2 bg-secondary border-border resize-none"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-foreground">Website (optional)</Label>
                <Input id="website" placeholder="www.yourbusiness.com" className="mt-2 bg-secondary border-border" />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Form Step 3 - Location & Terms */}
          {step === 3 && (
            <form className="space-y-5">
              <div>
                <Label htmlFor="address" className="text-foreground">Business Address</Label>
                <Input id="address" placeholder="123 Main Street" className="mt-2 bg-secondary border-border" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-foreground">City</Label>
                  <Input id="city" placeholder="Dallas" className="mt-2 bg-secondary border-border" required />
                </div>
                <div>
                  <Label htmlFor="state" className="text-foreground">State</Label>
                  <Input id="state" placeholder="TX" className="mt-2 bg-secondary border-border" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip" className="text-foreground">ZIP Code</Label>
                  <Input id="zip" placeholder="75201" className="mt-2 bg-secondary border-border" required />
                </div>
                <div>
                  <Label htmlFor="country" className="text-foreground">Country</Label>
                  <Input id="country" placeholder="United States" className="mt-2 bg-secondary border-border" required />
                </div>
              </div>

              <div>
                <Label htmlFor="taxId" className="text-foreground">Tax ID / EIN (optional)</Label>
                <Input id="taxId" placeholder="XX-XXXXXXX" className="mt-2 bg-secondary border-border" />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                  I agree to the <Link to="/terms" className="text-accent hover:underline">Seller Terms</Link>, <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>, and <Link to="/fees" className="text-accent hover:underline">Fee Schedule</Link>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="verify" className="mt-1" />
                <Label htmlFor="verify" className="text-sm text-muted-foreground font-normal">
                  I verify that all information provided is accurate and I am authorized to represent this business
                </Label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                  Submit Application
                </Button>
              </div>
            </form>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-accent/20 via-secondary to-primary/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🛍️</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Grow Your Business</h3>
          <p className="text-muted-foreground mb-6">
            Reach millions of customers, host live shopping events, and partner with top creators.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-accent">✓</span>
              <span className="text-sm">Just $6.99/month subscription</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-accent">✓</span>
              <span className="text-sm">Access to creator partnerships</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-accent">✓</span>
              <span className="text-sm">Live shopping integration</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <span className="text-accent">✓</span>
              <span className="text-sm">Built-in analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
