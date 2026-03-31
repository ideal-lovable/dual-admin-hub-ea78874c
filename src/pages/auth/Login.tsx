import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { useState } from "react";

export default function Login() {
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-2 bg-secondary border-border" />
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>

          {/* Role-specific signup options */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-4">Create a new account as:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/signup">
                <Button variant="secondary" size="sm" className="w-full">Subscriber</Button>
              </Link>
              <Link to="/signup/creator">
                <Button variant="secondary" size="sm" className="w-full">Creator</Button>
              </Link>
              <Link to="/signup/business">
                <Button variant="secondary" size="sm" className="w-full">Business</Button>
              </Link>
              <Link to="/signup/publisher">
                <Button variant="secondary" size="sm" className="w-full">Publisher</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-accent/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">👋</div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Welcome Back!</h3>
          <p className="text-muted-foreground">
            Sign in to access your dashboard, manage content, and connect with your audience.
          </p>
        </div>
      </div>
    </div>
  );
}
