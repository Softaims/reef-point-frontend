// api/apiService.js (Updated version)
import axios from "./axiosInstance.js";
import Cookies from "js-cookie";

const apiService = {
  // Admin login
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
};

export default apiService;
