import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...initialState };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("auth_token");
      if (token) {
        try {
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { user: userData, token },
            });
          } else {
            Cookies.remove("auth_token");
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          Cookies.remove("auth_token");
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        const { user, token } = data;

        Cookies.set("auth_token", token, {
          expires: 30,
          secure: import.meta.env.MODE === "production",
          sameSite: "strict",
        });

        dispatch({ type: "AUTH_SUCCESS", payload: { user, token } });
        toast.success("Login successful!");

        navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      } else {
        dispatch({ type: "AUTH_FAILURE", payload: data.message || "Login failed" });
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE", payload: "Network error. Please try again." });
      toast.error("Network error. Please try again.");
    }
  };

  // Register function
  const register = async (data) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please check your email.");
        navigate("/login");
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: responseData.message || "Registration failed",
        });
        toast.error(responseData.message || "Registration failed");
      }
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE", payload: "Network error. Please try again." });
      toast.error("Network error. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("auth_token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) toast.success("Password reset link sent!");
      else toast.error(data.message || "Failed to send reset link");
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  // Reset Password
  const resetPassword = async (token, password) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else toast.error(data.message || "Password reset failed");
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  // Update Profile
  const updateProfile = async (data) => {
    if (!state.token) return;

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_USER", payload: responseData });
        toast.success("Profile updated successfully");
      } else toast.error(responseData.message || "Failed to update profile");
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  // Change Password
  const changePassword = async (currentPassword, newPassword) => {
    if (!state.token) return;

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) toast.success("Password changed successfully");
      else toast.error(data.message || "Failed to change password");
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  // Clear Error
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  // Refresh Token
  const refreshToken = async () => {
    if (!state.token) return;

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { Authorization: `Bearer ${state.token}` },
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("auth_token", data.token, {
          expires: 30,
          secure: import.meta.env.MODE === "production",
          sameSite: "strict",
        });
        dispatch({ type: "AUTH_SUCCESS", payload: { user: state.user, token: data.token } });
      } else logout();
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const contextValue = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    clearError,
    refreshToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthContext;
