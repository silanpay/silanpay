import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BalancePage from "./pages/BalancePage";
import TransactionsPage from "./pages/TransactionsPage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import PaymentsPage from "./pages/PaymentsPage";
import InvoicePage from "./pages/InvoicePage";
import DevelopersPage from "./pages/DevelopersPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import SetupPage from "./pages/SetupPage";
import DesignPage from "./pages/DesignPage";
import SettingsPage from "./pages/SettingsPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import VerificationRequests from "./pages/VerificationRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

/**
 * The App component is the main entry point for the application.
 * It renders a toaster component for displaying notifications and
 * a router component for handling client-side routing.
 *
 * Routes:
 * - /login: LoginPage (public)
 * - /: DashboardLayout with nested routes (protected)
 *   - /: DashboardPage (Overview)
 *   - /balance: BalancePage
 *   - /transactions: TransactionsPage
 *   - /customers: CustomersPage
 *   - /products: ProductsPage
 *   - /reports: ReportsPage
 *   - /payments: PaymentsPage
 *   - /invoice: InvoicePage
 *   - /developers: DevelopersPage
 *   - /affiliates: AffiliatesPage
 *   - /setup: SetupPage
 *   - /design: DesignPage
 *   - /settings: SettingsPage
 *   - /account-settings: AccountSettingsPage (Profile dropdown)
 *   - /help-support: HelpSupportPage (Profile dropdown)
 * - *: Redirect to /
 */

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Main Navigation Routes */}
          <Route index element={<DashboardPage />} />
          <Route path="balance" element={<BalancePage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="invoice" element={<InvoicePage />} />

          {/* Other Navigation Routes */}
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="affiliates" element={<AffiliatesPage />} />
          <Route path="setup" element={<SetupPage />} />
          <Route path="design" element={<DesignPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="verification" element={<VerificationRequests />} />

          {/* Profile Dropdown Routes */}
          <Route path="account-settings" element={<AccountSettingsPage />} />
          <Route path="help-support" element={<HelpSupportPage />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
