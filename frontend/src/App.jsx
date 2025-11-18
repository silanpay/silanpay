import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import PaymentStatusPage from "./pages/PaymentStatusPage";
import DocumentationPage from "./pages/DocumentationPage";
import SupportPage from "./pages/SupportPage";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";
import FeaturesPage from "./pages/FeaturesPage";
import UPIPaymentPage from "./pages/UPIPaymentPage";
import AboutUsPage from "./pages/AboutUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundPage from "./pages/NotFoundPage";
// New Product Pages
import CollectionServicePage from "./pages/CollectionServicePage";
import PayoutsPage from "./pages/PayoutsPage";
import SmartCheckoutPage from "./pages/SmartCheckoutPage";
import WalletPage from "./pages/WalletPage";
import SoundBoxPage from "./pages/SoundBoxPage";
// New Developer Pages
import ApiSdksPage from "./pages/ApiSdksPage";
import WebhooksPage from "./pages/WebhooksPage";
import PluginsPage from "./pages/PluginsPage";
import Document from "./pages/Document";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/common/ScrollToTopOnRouteChange"; // ✅ ADD THIS

// Styles
import "./styles/globals.css";

// ✅ Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Router>
              {/* ✅ ADD THIS - Scrolls to top on route change */}
              <ScrollToTopOnRouteChange />

              <AuthProvider>
                <PaymentProvider>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                      />
                      <Route
                        path="/reset-password/:token"
                        element={<ResetPasswordPage />}
                      />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/docs" element={<DocumentationPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/contact-us" element={<ContactUsPage />} />
                      <Route
                        path="/terms"
                        element={<TermsAndConditionsPage />}
                      />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                      />
                      <Route
                        path="/refund-policy"
                        element={<RefundPolicyPage />}
                      />
                      <Route
                        path="/upi-payments"
                        element={<UPIPaymentPage />}
                      />
                      <Route path="/about-us" element={<AboutUsPage />} />

                      {/* Product Pages */}
                      <Route
                        path="/collection-service"
                        element={<CollectionServicePage />}
                      />
                      <Route path="/payouts" element={<PayoutsPage />} />
                      <Route
                        path="/smart-checkout"
                        element={<SmartCheckoutPage />}
                      />
                      <Route path="/wallet" element={<WalletPage />} />
                      <Route path="/sound-box" element={<SoundBoxPage />} />

                      {/* Developer Pages */}
                      <Route path="/api-sdks" element={<ApiSdksPage />} />
                      <Route path="/webhooks" element={<WebhooksPage />} />
                      <Route path="/plugins" element={<PluginsPage />} />
                      <Route path="/document" element={<Document />} />

                      {/* Payment Gateway (Public) */}
                      <Route
                        path="/payments/gateway/:id"
                        element={<PaymentGatewayPage />}
                      />
                      <Route
                        path="/payments/status/:id"
                        element={<PaymentStatusPage />}
                      />

                      {/* Protected Routes */}
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* 404 */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                    {/* ✅ Scroll to Top Button */}
                    <ScrollToTop />

                    {/* ✅ Toast Notifications */}
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 3000,
                        style: {
                          background: "#363636",
                          color: "#fff",
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: "#10B981",
                            secondary: "#fff",
                          },
                        },
                        error: {
                          duration: 3000,
                          iconTheme: {
                            primary: "#EF4444",
                            secondary: "#fff",
                          },
                        },
                      }}
                    />
                  </div>
                </PaymentProvider>
              </AuthProvider>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
