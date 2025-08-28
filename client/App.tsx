import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "@/hooks/use-user";
import { AcNavbar } from "@/components/ui/ac-navbar";
import { AcBottomNav } from "@/components/ui/ac-bottom-nav";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

// Layout component that includes navigation
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, simulateRole } = useUser();
  const location = useLocation();

  // Hide navigation on login/signup pages
  const hideNavigation = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-ac-bg">
      {!hideNavigation && (
        <AcNavbar
          currentUser={user}
          onRoleChange={simulateRole}
        />
      )}

      <main className={hideNavigation ? '' : 'pb-20 md:pb-0'}>
        {children}
      </main>

      {!hideNavigation && (
        <AcBottomNav currentUser={user} />
      )}
    </div>
  );
};

// Routes component
const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route
      path="/signup"
      element={
        <Placeholder
          title="Sign Up"
          description="Registration page will be built in the next iteration."
        />
      }
    />

    {/* Protected routes */}
    <Route path="/" element={<Dashboard />} />

    {/* Task routes */}
    <Route
      path="/tasks"
      element={
        <Placeholder
          title="Task List"
          description="View and manage all cleaning tasks."
        />
      }
    />
    <Route
      path="/tasks/:id"
      element={
        <Placeholder
          title="Task Execution"
          description="Complete cleaning checklist and upload evidence."
        />
      }
    />

    {/* Role-specific routes */}
    <Route
      path="/tenant/inventory"
      element={
        <Placeholder
          title="Inventory Confirmation"
          description="Confirm inventory items and report issues."
        />
      }
    />
    <Route
      path="/mediator/assign"
      element={
        <Placeholder
          title="Task Assignment"
          description="Assign cleaners to pending tasks."
        />
      }
    />
    <Route
      path="/owner/review"
      element={
        <Placeholder
          title="Review & Approval"
          description="Review completed tasks and approve or reject them."
        />
      }
    />

    {/* General routes */}
    <Route
      path="/reviews"
      element={
        <Placeholder
          title="Reviews"
          description="View reviews and feedback."
        />
      }
    />
    <Route
      path="/profile"
      element={
        <Placeholder
          title="Profile"
          description="Manage your account settings and preferences."
        />
      }
    />

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
