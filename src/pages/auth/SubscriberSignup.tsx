import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { useState } from "react";

export default function SubscriberSignup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
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
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground">Sign up to start streaming and shopping</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                <Input id="firstName" placeholder="John" className="mt-2 bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="mt-2 bg-secondary border-border" />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="mt-2 bg-secondary border-border" />
            </div>

            <div>
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input id="username" placeholder="johndoe" className="mt-2 bg-secondary border-border" />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-2">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="bg-secondary border-border pr-10" 
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
              <Label htmlFor="dob" className="text-foreground">Date of Birth</Label>
              <Input id="dob" type="date" className="mt-2 bg-secondary border-border" />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="marketing" className="mt-1" />
              <Label htmlFor="marketing" className="text-sm text-muted-foreground font-normal">
                Send me updates about new content, features, and promotions
              </Label>
            </div>

            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>

          {/* Other Sign Up Options */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-4">Want to do more on FVRD TV?</p>
            <div className="grid grid-cols-3 gap-3">
              <Link to="/signup/creator">
                <Button variant="secondary" size="sm" className="w-full text-xs">Creator</Button>
              </Link>
              <Link to="/signup/business">
                <Button variant="secondary" size="sm" className="w-full text-xs">Business</Button>
              </Link>
              <Link to="/signup/publisher">
                <Button variant="secondary" size="sm" className="w-full text-xs">Publisher</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-accent/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎬</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Stream. Shop. Discover.</h3>
          <p className="text-muted-foreground">
            Join millions of viewers enjoying premium content, live shopping events, and exclusive creator picks.
          </p>
        </div>
      </div>
    </div>
  );
}
