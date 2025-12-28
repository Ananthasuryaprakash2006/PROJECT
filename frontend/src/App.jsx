import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import Funds from "./pages/Funds";
import Compare from "./pages/Compare";
import Advisor from "./pages/Advisor";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import FundExplorer from "./pages/FundExplorer";
import FundDetails from "./pages/FundDetails";
import AIAdvisor from "./pages/AIAdvisor";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AiChat from "./pages/AiChat";

// New
import Watchlist from "./pages/Watchlist";

function Layout() {
  const location = useLocation();
  const noSidebar = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  // same sizes as Sidebar.jsx
  const SIDEBAR_CLOSED = 80; // px
  const SIDEBAR_OPEN = 256; // px

  // detect sidebar state from body class
  const isOpen = document.body.classList.contains("sidebar-open");

  return (
    <div
      className="min-h-screen bg-gray-950 text-gray-100 transition-all duration-500"
      style={{
        paddingLeft: noSidebar
          ? 0
          : isOpen
          ? SIDEBAR_OPEN
          : SIDEBAR_CLOSED,
      }}
    >
      {!noSidebar && <Sidebar />}

      <div className="p-6 w-full transition-all duration-500">
        <Routes>
          {/* Homepage = Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />
          <Route path="/ai-chat" element={<AiChat />} />

          <Route
            path="/funds"
            element={
              <ProtectedRoute>
                <Funds />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fund-explorer"
            element={
              <ProtectedRoute>
                <FundExplorer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fund/:id"
            element={
              <ProtectedRoute>
                <FundDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/advisor"
            element={
              <ProtectedRoute>
                <Advisor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-advisor"
            element={
              <ProtectedRoute>
                <AIAdvisor />
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
