import React, { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import apiService from "../api/apiService.js";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Action types
const actionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        try {
          // Verify token and get user data
          const userData = await apiService.getCurrentUser();
          const user = userData.admin;
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: {
              user,
            },
          });
        } catch (error) {
          console.log("🚀 ~ initializeAuth ~ error:", error);
          dispatch({ type: actionTypes.LOGOUT });
        }
      } else {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    console.log("🚀 ~ login ~ credentials:", credentials);
    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    try {
      const response = await apiService.Signin(credentials);
      // Always use response.admin as user (per your backend result)
      const user = response.admin;
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          user,
        },
      });

      return response;
    } catch (error) {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refreshToken");

    dispatch({ type: actionTypes.LOGOUT });
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiService.refreshToken({ refreshToken });

      // Update access token
      Cookies.set("access_token", response.data.accessToken, {
        expires: 1,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return response.data.accessToken;
    } catch (error) {
      // Refresh failed, logout user
      logout();
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
