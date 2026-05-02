import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminStoreProvider } from "@/lib/admin-store";

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
import PublisherDistribution from "./pages/publisher/PublisherDistribution";
import PublisherNotifications from "./pages/publisher/PublisherNotifications";
import PublisherSettings from "./pages/publisher/PublisherSettings";

// Super Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import AdminContentEdit from "./pages/admin/AdminContentEdit";
import AdminContentPreview from "./pages/admin/AdminContentPreview";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminGenres from "./pages/admin/AdminGenres";
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
import AdminControls from "./pages/admin/AdminControls";

// Creator Pages
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import CreatorVideos from "./pages/creator/CreatorVideos";
import CreatorLivestreams from "./pages/creator/CreatorLivestreams";
import CreatorScheduled from "./pages/creator/CreatorScheduled";
import CreatorGoLive from "./pages/creator/CreatorGoLive";
import CreatorScheduleStream from "./pages/creator/CreatorScheduleStream";
import CreatorProducts from "./pages/creator/CreatorProducts";
import CreatorAnalytics from "./pages/creator/CreatorAnalytics";
import CreatorNotifications from "./pages/creator/CreatorNotifications";
import CreatorSettings from "./pages/creator/CreatorSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminStoreProvider>
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
          <Route path="/business/products/*" element={<BusinessProducts />} />
          <Route path="/business/orders" element={<BusinessOrders />} />
          <Route path="/business/orders/*" element={<BusinessOrders />} />
          <Route path="/business/livestreams" element={<BusinessLivestreams />} />
          <Route path="/business/livestreams/*" element={<BusinessLivestreams />} />
          <Route path="/business/analytics" element={<BusinessAnalytics />} />
          <Route path="/business/policies" element={<BusinessPolicies />} />
          <Route path="/business/messages" element={<BusinessMessages />} />
          <Route path="/business/settings" element={<BusinessSettings />} />
          
          {/* Publisher Routes */}
          <Route path="/publisher" element={<Navigate to="/publisher/dashboard" replace />} />
          <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
          <Route path="/publisher/content" element={<PublisherContent />} />
          <Route path="/publisher/analytics" element={<PublisherAnalytics />} />
          <Route path="/publisher/distribution" element={<PublisherDistribution />} />
          <Route path="/publisher/notifications" element={<PublisherNotifications />} />
          <Route path="/publisher/settings" element={<PublisherSettings />} />
          
          {/* Super Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/*" element={<AdminUsers />} />
          <Route path="/admin/storefronts" element={<AdminBusinesses />} />
          <Route path="/admin/storefronts/*" element={<AdminBusinesses />} />
          <Route path="/admin/businesses" element={<Navigate to="/admin/storefronts" replace />} />
          <Route path="/admin/content/categories" element={<AdminCategories />} />
          <Route path="/admin/content/genres" element={<AdminGenres />} />
          <Route path="/admin/content/new" element={<AdminContentEdit />} />
          <Route path="/admin/content/:type/new" element={<AdminContentEdit />} />
          <Route path="/admin/content/preview/:id" element={<AdminContentPreview />} />
          <Route path="/admin/content/:id/edit" element={<AdminContentEdit />} />
          <Route path="/admin/content/:type/:id/edit" element={<AdminContentEdit />} />
          <Route path="/admin/content/:type/:id" element={<AdminContentPreview />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/content/*" element={<AdminContent />} />
          <Route path="/admin/commerce" element={<Navigate to="/admin/commerce/orders" replace />} />
          <Route path="/admin/commerce/orders" element={<AdminCommerceOrders />} />
          <Route path="/admin/commerce/*" element={<AdminCommerceOrders />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/analytics/*" element={<AdminAnalytics />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/calendar/*" element={<AdminCalendar />} />
          <Route path="/admin/discover" element={<Navigate to="/admin/discover/banner" replace />} />
          <Route path="/admin/discover/*" element={<AdminDiscover />} />
          <Route path="/admin/mapping" element={<Navigate to="/admin/mapping/access" replace />} />
          <Route path="/admin/mapping/*" element={<AdminCreatorMapping />} />
          <Route path="/admin/automation" element={<Navigate to="/admin/automation/emails" replace />} />
          <Route path="/admin/automation/*" element={<AdminAutomation />} />
          <Route path="/admin/controls" element={<Navigate to="/admin/controls/roles" replace />} />
          <Route path="/admin/controls/*" element={<AdminControls />} />
          <Route path="/admin/config" element={<Navigate to="/admin/config/categories" replace />} />
          <Route path="/admin/config/*" element={<AdminPlatformConfig />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Creator Routes */}
          <Route path="/creator" element={<Navigate to="/creator/dashboard" replace />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/content/videos" element={<CreatorVideos />} />
          <Route path="/creator/content/livestreams" element={<CreatorLivestreams />} />
          <Route path="/creator/content/scheduled" element={<CreatorScheduled />} />
          <Route path="/creator/live/create" element={<CreatorGoLive />} />
          <Route path="/creator/live/schedule" element={<CreatorScheduleStream />} />
          <Route path="/creator/products/assigned" element={<CreatorProducts />} />
          <Route path="/creator/products/performance" element={<CreatorProducts />} />
          <Route path="/creator/analytics" element={<CreatorAnalytics />} />
          <Route path="/creator/notifications" element={<CreatorNotifications />} />
          <Route path="/creator/settings" element={<CreatorSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AdminStoreProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
