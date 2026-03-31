import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";

// Auth Pages
import Login from "./pages/auth/Login";
import SubscriberSignup from "./pages/auth/SubscriberSignup";
import CreatorSignup from "./pages/auth/CreatorSignup";
import BusinessSignup from "./pages/auth/BusinessSignup";
import PublisherSignup from "./pages/auth/PublisherSignup";

// User (Creator) Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserVideos from "./pages/user/UserVideos";
import UserLivestreams from "./pages/user/UserLivestreams";
import UserCreatorPicks from "./pages/user/UserCreatorPicks";
import UserAnalytics from "./pages/user/UserAnalytics";
import UserGuidelines from "./pages/user/UserGuidelines";
import UserSettings from "./pages/user/UserSettings";

// Business Pages
import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessStorefront from "./pages/business/BusinessStorefront";
import BusinessProducts from "./pages/business/BusinessProducts";
import BusinessOrders from "./pages/business/BusinessOrders";
import BusinessLivestreams from "./pages/business/BusinessLivestreams";
import BusinessAnalytics from "./pages/business/BusinessAnalytics";
import BusinessPolicies from "./pages/business/BusinessPolicies";
import BusinessMessages from "./pages/business/BusinessMessages";
import BusinessSettings from "./pages/business/BusinessSettings";

// Publisher Pages
import PublisherDashboard from "./pages/publisher/PublisherDashboard";
import PublisherContent from "./pages/publisher/PublisherContent";
import PublisherAnalytics from "./pages/publisher/PublisherAnalytics";
import PublisherSettings from "./pages/publisher/PublisherSettings";

// Super Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminReports from "./pages/admin/AdminReports";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminCommerceOrders from "./pages/admin/AdminCommerceOrders";
import AdminDiscover from "./pages/admin/AdminDiscover";
import AdminAutomation from "./pages/admin/AdminAutomation";
import AdminCreatorMapping from "./pages/admin/AdminCreatorMapping";
import AdminPlatformConfig from "./pages/admin/AdminPlatformConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SubscriberSignup />} />
          <Route path="/signup/creator" element={<CreatorSignup />} />
          <Route path="/signup/business" element={<BusinessSignup />} />
          <Route path="/signup/publisher" element={<PublisherSignup />} />
          
          {/* User (Creator) Routes */}
          <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/videos" element={<UserVideos />} />
          <Route path="/user/livestreams" element={<UserLivestreams />} />
          <Route path="/user/picks" element={<UserCreatorPicks />} />
          <Route path="/user/analytics" element={<UserAnalytics />} />
          <Route path="/user/guidelines" element={<UserGuidelines />} />
          <Route path="/user/settings" element={<UserSettings />} />
          
          {/* Business Routes */}
          <Route path="/business" element={<Navigate to="/business/dashboard" replace />} />
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/business/storefront" element={<BusinessStorefront />} />
          <Route path="/business/products" element={<BusinessProducts />} />
          <Route path="/business/orders" element={<BusinessOrders />} />
          <Route path="/business/livestreams" element={<BusinessLivestreams />} />
          <Route path="/business/analytics" element={<BusinessAnalytics />} />
          <Route path="/business/policies" element={<BusinessPolicies />} />
          <Route path="/business/messages" element={<BusinessMessages />} />
          <Route path="/business/settings" element={<BusinessSettings />} />
          
          {/* Publisher Routes */}
          <Route path="/publisher" element={<Navigate to="/publisher/dashboard" replace />} />
          <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
          <Route path="/publisher/content" element={<PublisherContent />} />
          <Route path="/publisher/analytics" element={<PublisherAnalytics />} />
          <Route path="/publisher/settings" element={<PublisherSettings />} />
          
          {/* Super Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/*" element={<AdminUsers />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/content/*" element={<AdminContent />} />
          <Route path="/admin/storefronts" element={<AdminBusinesses />} />
          <Route path="/admin/storefronts/*" element={<AdminBusinesses />} />
          <Route path="/admin/businesses" element={<AdminBusinesses />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/analytics/*" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/calendar/*" element={<AdminCalendar />} />
          <Route path="/admin/commerce/orders" element={<AdminCommerceOrders />} />
          <Route path="/admin/commerce/*" element={<AdminCommerceOrders />} />
          <Route path="/admin/discover/*" element={<AdminDiscover />} />
          <Route path="/admin/automation/*" element={<AdminAutomation />} />
          <Route path="/admin/mapping/*" element={<AdminCreatorMapping />} />
          <Route path="/admin/controls/*" element={<AdminSettings />} />
          <Route path="/admin/config/*" element={<AdminPlatformConfig />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
