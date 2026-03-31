import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { useState } from "react";

export default function CreatorSignup() {
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
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Creator Account</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Become a Creator</h2>
            <p className="text-muted-foreground">Share content, go live, and earn with your audience</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
          </div>

          {/* Form Step 1 */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input id="firstName" placeholder="Sarah" className="mt-2 bg-secondary border-border" required />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                  <Input id="lastName" placeholder="Martinez" className="mt-2 bg-secondary border-border" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" type="email" placeholder="sarah@example.com" className="mt-2 bg-secondary border-border" required />
              </div>

              <div>
                <Label htmlFor="creatorName" className="text-foreground">Creator/Display Name</Label>
                <Input id="creatorName" placeholder="@sarahstyles" className="mt-2 bg-secondary border-border" required />
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

              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2 bg-secondary border-border" />
              </div>

              <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                Continue
              </Button>
            </form>
          )}

          {/* Form Step 2 */}
          {step === 2 && (
            <form className="space-y-5">
              <div>
                <Label htmlFor="category" className="text-foreground">Primary Content Category</Label>
                <Select>
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Style</SelectItem>
                    <SelectItem value="beauty">Beauty & Makeup</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                    <SelectItem value="food">Food & Cooking</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bio" className="text-foreground">Bio / About You</Label>
                <Textarea 
                  id="bio" 
                  rows={3}
                  placeholder="Tell us about yourself and what content you create..."
                  className="mt-2 bg-secondary border-border resize-none"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="text-foreground">Instagram Handle (optional)</Label>
                <Input id="instagram" placeholder="@yourusername" className="mt-2 bg-secondary border-border" />
              </div>

              <div>
                <Label htmlFor="tiktok" className="text-foreground">TikTok Handle (optional)</Label>
                <Input id="tiktok" placeholder="@yourusername" className="mt-2 bg-secondary border-border" />
              </div>

              <div>
                <Label htmlFor="youtube" className="text-foreground">YouTube Channel (optional)</Label>
                <Input id="youtube" placeholder="youtube.com/c/yourchannel" className="mt-2 bg-secondary border-border" />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Creator Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 gradient-primary text-primary-foreground">
                  Submit Application
                </Button>
              </div>
            </form>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-accent/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎥</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Share Your Voice</h3>
          <p className="text-muted-foreground mb-6">
            Create content, host livestreams, share your favorite picks, and build your audience on FVRD TV.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-primary">5M+</p>
              <p className="text-xs text-muted-foreground">Active Viewers</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-primary">10K+</p>
              <p className="text-xs text-muted-foreground">Creators</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-primary">$2M+</p>
              <p className="text-xs text-muted-foreground">Creator Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
