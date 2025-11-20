import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { buildApiUrl } from "../config/api";

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
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
      return { ...initialState, isLoading: false };
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
const AuthContext = createContext(undefined);

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
          const response = await fetch(buildApiUrl("/auth/verify"), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { user: data.user || data, token },
            });
          } else {
            Cookies.remove("auth_token");
            dispatch({ type: "SET_LOADING", payload: false });
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          Cookies.remove("auth_token");
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await fetch(buildApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        return { success: true };
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: data.message || "Login failed",
        });
        toast.error(data.message || "Login failed");
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = "Network error. Please try again.";
      dispatch({ type: "AUTH_FAILURE", payload: errorMsg });
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await fetch(buildApiUrl("/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
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
        toast.success("Registration successful!");
        navigate("/dashboard");
        return { success: true };
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: data.message || "Registration failed",
        });
        toast.error(data.message || "Registration failed");
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = "Network error. Please try again.";
      dispatch({ type: "AUTH_FAILURE", payload: errorMsg });
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("auth_token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/");
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const contextValue = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
