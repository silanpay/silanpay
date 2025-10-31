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
import UPIPaymentPage from "./pages/UPIPaymentPage";
import AboutUsPage from "./pages/AboutUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Styles
import "./styles/globals.css";

// ✅ Create a QueryClient instance (fixed syntax)
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

                    {/* ✅ Toast Notifications (fixed syntax) */}
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
