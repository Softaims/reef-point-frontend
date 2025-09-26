// api/apiService.js (Updated version)
import axios from "./axiosInstance.js";
import Cookies from "js-cookie";

const apiService = {
  // admin routes
  Signin: async (payload) => {
    console.log("🚀 ~ Signin: ~ payload:", payload);
    try {
      const response = await axios.post("/admin/admin-login", payload);
      console.log("🚀 ~ Signin: ~ response:", response);
      const staticExpiryDate = new Date();
      staticExpiryDate.setDate(staticExpiryDate.getDate() + 7); // 7 days from now

      // Support both {data: {access_token, ...}} and {access_token, ...} response shapes
      const data = response.data.data || response.data;
      const { access_token, refreshToken } = data;
      if (access_token) {
        Cookies.set("access_token", access_token, {
          expires: staticExpiryDate,
        });
      }
      if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
      }
      return data;
    } catch (error) {
      console.log("🚀 ~ Signin: ~ error:", error.response?.data || error);
      throw error.response?.data || { message: "Something went wrong" };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await axios.get("/admin/profile");
      return response.data;
    } catch (error) {
      console.log(
        "🚀 ~ getCurrentUser: ~ error:",
        error.response?.data || error
      );
      throw error.response?.data || { message: "Failed to get user data" };
    }
  },

  // Get all campaigns
  getCampaigns: async () => {
    try {
      const response = await axios.get("/settings");
      return response.data;
    } catch (error) {
      console.log("🚀 ~ getCampaigns: ~ error:", error.response?.data || error);
      throw error.response?.data || { message: "Failed to fetch campaigns" };
    }
  },
  // Update campaign
  updateCampaign: async (payload) => {
    try {
      const response = await axios.post(`settings/update/`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update campaign" };
    }
  },

  // Refresh token
  refreshToken: async (payload) => {
    try {
      const response = await axios.post("/auth/refresh", payload);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ refreshToken: ~ error:", error.response?.data || error);
      throw error.response?.data || { message: "Failed to refresh token" };
    }
  },

  // Logout
  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refreshToken");
    Cookies.remove("userRole");
  },

  deleteCampaign: async (id) => {
    try {
      const response = await axios.delete(`/admin/campaign/${id}`);
      console.log("🚀 ~ deleteCampaign: ~ response:", response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete campaign" };
    }
  },

  // user routes

  connectWallet: async (address) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/connect-wallet`,
        { address }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to connect wallet",
        }
      );
    }
  },

  // Get daily leaderboard points

  getLeaderboardPoints: async () => {
    try {
      const response = await axios.get("points/daily-total-points");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch leaderboard points",
        }
      );
    }
  },
  // Leaderboard for user (with EVM address)
  getUserLeaderboardPoints: async (address) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/points/daily-total-points/${address}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch user leaderboard points",
        }
      );
    }
  },

  // Weekly stats for a user
  getUserWeeklyStats: async (address) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/points/user-stats?userAddress=${address}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch weekly stats",
        }
      );
    }
  },
  // Referral info for a user
  getReferralInfo: async (address) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/referrals/user-referral-info/0x641e34931C03751BFED14C4087bA395303bEd1A5`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch referral info",
        }
      );
    }
  },
};
export default apiService;
