import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

// Initial State
const initialState = {
  paymentMethods: [],
  gateways: [],
  transactions: [],
  paymentLinks: [],
  settlements: [],
  isLoading: false,
  error: null,
  stats: {
    totalTransactions: 0,
    totalAmount: 0,
    successRate: 0,
    pendingSettlements: 0,
    todayTransactions: 0,
    todayAmount: 0,
  },
};

// Reducer
const paymentReducer = (state, action) => {
  switch (action.type) {
    case "PAYMENT_START":
      return { ...state, isLoading: true, error: null };

    case "PAYMENT_SUCCESS":
      return { ...state, isLoading: false, error: null };

    case "PAYMENT_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "SET_PAYMENT_METHODS":
      return { ...state, paymentMethods: action.payload };

    case "SET_GATEWAYS":
      return { ...state, gateways: action.payload };

    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };

    case "SET_PAYMENT_LINKS":
      return { ...state, paymentLinks: action.payload };

    case "SET_SETTLEMENTS":
      return { ...state, settlements: action.payload };

    case "SET_STATS":
      return { ...state, stats: action.payload };

    case "ADD_TRANSACTION":
      return { ...state, transactions: [...state.transactions, action.payload] };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "ADD_PAYMENT_LINK":
      return { ...state, paymentLinks: [...state.paymentLinks, action.payload] };

    case "UPDATE_PAYMENT_LINK":
      return {
        ...state,
        paymentLinks: state.paymentLinks.map((pl) =>
          pl.id === action.payload.id ? action.payload : pl
        ),
      };

    case "REMOVE_PAYMENT_LINK":
      return {
        ...state,
        paymentLinks: state.paymentLinks.filter((pl) => pl.id !== action.payload),
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

// Context
const PaymentContext = createContext();

// Provider
export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);
  const { token, isAuthenticated } = useAuth();

  // Load all payment data when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      loadInitialData();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, token]);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        getPaymentMethods(),
        getGateways(),
        getTransactions(),
        getPaymentLinks(),
        getSettlements(),
        refreshStats(),
      ]);
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };

  const getPaymentMethods = async () => {
    try {
      const res = await fetch("/api/payments/methods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_PAYMENT_METHODS", payload: data });
      }
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
    }
  };

  const getGateways = async () => {
    try {
      const res = await fetch("/api/payments/gateways", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_GATEWAYS", payload: data });
      }
    } catch (err) {
      console.error("Failed to fetch gateways:", err);
    }
  };

  const getTransactions = async (filters = {}) => {
    dispatch({ type: "PAYMENT_START" });
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/payments/transactions?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_TRANSACTIONS", payload: data });
        dispatch({ type: "PAYMENT_SUCCESS" });
      } else {
        dispatch({ type: "PAYMENT_FAILURE", payload: data.message });
      }
    } catch {
      dispatch({ type: "PAYMENT_FAILURE", payload: "Network error" });
    }
  };

  const getPaymentLinks = async () => {
    try {
      const res = await fetch("/api/payments/links", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_PAYMENT_LINKS", payload: data });
      }
    } catch (err) {
      console.error("Failed to fetch payment links:", err);
    }
  };

  const getSettlements = async () => {
    try {
      const res = await fetch("/api/payments/settlements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_SETTLEMENTS", payload: data });
      }
    } catch (err) {
      console.error("Failed to fetch settlements:", err);
    }
  };

  const createPayment = async (data) => {
    dispatch({ type: "PAYMENT_START" });
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (res.ok) {
        dispatch({ type: "ADD_PAYMENT_LINK", payload: resData });
        dispatch({ type: "PAYMENT_SUCCESS" });
        toast.success("Payment link created successfully");
        return resData.link;
      } else {
        toast.error(resData.message || "Failed to create payment");
        throw new Error(resData.message || "Failed to create payment");
      }
    } catch {
      dispatch({ type: "PAYMENT_FAILURE", payload: "Network error" });
      toast.error("Network error");
    }
  };

  const createPaymentLink = createPayment;

  const updatePaymentLink = async (id, data) => {
    try {
      const res = await fetch(`/api/payments/links/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        dispatch({ type: "UPDATE_PAYMENT_LINK", payload: resData });
        toast.success("Payment link updated successfully");
      } else {
        toast.error(resData.message || "Failed to update payment link");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const deletePaymentLink = async (id) => {
    try {
      const res = await fetch(`/api/payments/links/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        dispatch({ type: "REMOVE_PAYMENT_LINK", payload: id });
        toast.success("Payment link deleted successfully");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete payment link");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const refreshStats = async () => {
    try {
      const res = await fetch("/api/payments/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "SET_STATS", payload: data });
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const contextValue = {
    ...state,
    createPayment,
    createPaymentLink,
    getTransactions,
    getPaymentLinks,
    getSettlements,
    updatePaymentLink,
    deletePaymentLink,
    clearError,
    refreshStats,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

// Custom Hook
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePayment must be used within PaymentProvider");
  return context;
};

export default PaymentContext;
