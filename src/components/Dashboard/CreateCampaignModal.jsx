"use client";

import { useState } from "react";
import { X, Calendar, DollarSign, Target, FileText } from "lucide-react";
import { z } from "zod";

// Zod validation schema
const campaignSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Campaign name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  budget: z.number().min(100, { message: "Budget must be at least $100" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  status: z.enum(["Draft", "Active", "Paused"]),
  targetAudience: z
    .string()
    .min(5, { message: "Target audience must be specified" }),
});

const CreateCampaignModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "Draft",
    targetAudience: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Required field validation before zod
    const requiredErrors = {};
    if (!formData.name.trim())
      requiredErrors.name = "Campaign name is required";
    if (!formData.description.trim())
      requiredErrors.description = "Description is required";
    if (!formData.budget || isNaN(Number(formData.budget)))
      requiredErrors.budget = "Budget is required";
    if (!formData.startDate)
      requiredErrors.startDate = "Start date is required";
    if (!formData.endDate) requiredErrors.endDate = "End date is required";
    if (!formData.targetAudience.trim())
      requiredErrors.targetAudience = "Target audience is required";

    if (Object.keys(requiredErrors).length > 0) {
      setErrors(requiredErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Convert budget to number for validation
      const dataToValidate = {
        ...formData,
        budget: Number.parseFloat(formData.budget) || 0,
      };
      // Validate form data
      const validatedData = campaignSchema.parse(dataToValidate);

      // Clear any existing errors
      setErrors({});

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call onCreate to update parent state
      if (onCreate) {
        onCreate(validatedData);
      }

      // Reset form and close modal
      setFormData({
        name: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "Draft",
        targetAudience: "",
      });
      onClose();

      // You could show a success toast here
      // alert("Campaign created successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show all errors for each field (array of messages)
        const fieldErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            if (!fieldErrors[err.path[0]]) fieldErrors[err.path[0]] = [];
            fieldErrors[err.path[0]].push(err.message);
          }
        });
        // If only one error per field, flatten to string for backward compatibility
        Object.keys(fieldErrors).forEach((key) => {
          if (fieldErrors[key].length === 1)
            fieldErrors[key] = fieldErrors[key][0];
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "Draft",
        targetAudience: "",
      });
      setErrors({});
      onClose();
    }
  };

  // Disable main page scroll when modal is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-[4px] flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Campaign
            </h2>
            <p className="text-gray-600 mt-1">
              Set up your marketing campaign details
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <Target className="w-4 h-4 mr-2 text-purple-600" />
              Campaign Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                errors.name
                  ? "border-red-300 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-purple-600" />
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Describe your campaign objectives and strategy"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 resize-none ${
                errors.description
                  ? "border-red-300 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.description}
              </p>
            )}
          </div>

          {/* Budget and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-2">
              <label
                htmlFor="budget"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <DollarSign className="w-4 h-4 mr-2 text-purple-600" />
                Budget (USD)
              </label>
              <input
                id="budget"
                type="number"
                placeholder="10000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.budget
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                }`}
              />
              {errors.budget && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.budget}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Initial Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-purple-500 bg-white hover:border-gray-300 transition-all duration-200"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.startDate
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.endDate
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label
              htmlFor="targetAudience"
              className="block text-sm font-medium text-gray-700"
            >
              Target Audience
            </label>
            <input
              id="targetAudience"
              type="text"
              placeholder="e.g., DeFi enthusiasts, crypto traders, liquidity providers"
              value={formData.targetAudience}
              onChange={(e) =>
                handleInputChange("targetAudience", e.target.value)
              }
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                errors.targetAudience
                  ? "border-red-300 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
              }`}
            />
            {errors.targetAudience && (
              <p className="text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.targetAudience}
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border h-[3rem] border-gray-300 cursor-pointer text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="w-5 h-5"> Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-[3rem] bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]  text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Campaign...
                </div>
              ) : (
                "Create Campaign"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
