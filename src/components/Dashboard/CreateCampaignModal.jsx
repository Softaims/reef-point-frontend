import { useEffect, useState } from "react";
import apiService from "../../api/apiService";
import { X, Calendar, TrendingUp, Settings, Zap } from "lucide-react";
import { z } from "zod";

// Zod validation schema for the new data structure
const campaignSchema = z.object({
  totalPools: z.number().min(1, { message: "Total pools must be at least 1" }),
  isBootstrapping: z.boolean(),
  bootstrappingStartDate: z
    .string()
    .min(1, { message: "Bootstrapping start date is required" }),
  isEarlySzn: z.boolean(),
  earlySznStartDate: z
    .string()
    .min(1, { message: "Early season start date is required" }),
  isMemeSzn: z.boolean(),
  memeSznStartDate: z
    .string()
    .min(1, { message: "Meme season start date is required" }),
});

const CreateCampaignModal = ({
  isOpen,
  onClose,
  onCreate,
  initialData,
  isEdit,
}) => {
  console.log("🚀 ~ CreateCampaignModal ~ initialData:", initialData);
  const [formData, setFormData] = useState({
    totalPools: "",
    isBootstrapping: false,
    bootstrappingStartDate: "",
    isEarlySzn: false,
    earlySznStartDate: "",
    isMemeSzn: false,
    memeSznStartDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prefill form for edit
  // Helper to convert ISO string to 'yyyy-MM-ddTHH:mm' for datetime-local
  const toDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    // Pad with zeros
    const pad = (n) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        totalPools: initialData.totalPools?.toString() || "",
        isBootstrapping: !!initialData.isBootstrapping,
        bootstrappingStartDate: toDatetimeLocal(
          initialData.bootstrappingStartDate
        ),
        isEarlySzn: !!initialData.isEarlySzn,
        earlySznStartDate: toDatetimeLocal(initialData.earlySznStartDate),
        isMemeSzn: !!initialData.isMemeSzn,
        memeSznStartDate: toDatetimeLocal(initialData.memeSznStartDate),
      });
    } else if (isOpen && !initialData) {
      setFormData({
        totalPools: "",
        isBootstrapping: false,
        bootstrappingStartDate: "",
        isEarlySzn: false,
        earlySznStartDate: "",
        isMemeSzn: false,
        memeSznStartDate: "",
      });
    }
  }, [isOpen, initialData]);

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
    if (!formData.totalPools || isNaN(Number(formData.totalPools)))
      requiredErrors.totalPools = "Total pools is required";
    if (!formData.bootstrappingStartDate)
      requiredErrors.bootstrappingStartDate =
        "Bootstrapping start date is required";
    if (!formData.earlySznStartDate)
      requiredErrors.earlySznStartDate = "Early season start date is required";
    if (!formData.memeSznStartDate)
      requiredErrors.memeSznStartDate = "Meme season start date is required";

    if (Object.keys(requiredErrors).length > 0) {
      setErrors(requiredErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Convert totalPools to number for validation
      const dataToValidate = {
        ...formData,
        totalPools: Number.parseInt(formData.totalPools) || 0,
      };

      // Validate form data
      const validatedData = campaignSchema.parse(dataToValidate);

      // Clear any existing errors
      setErrors({});

      // Prepare payload for API (convert datetime-local to ISO)
      const toISO = (val) => (val ? new Date(val).toISOString() : "");
      const payload = {
        ...validatedData,
        bootstrappingStartDate: toISO(formData.bootstrappingStartDate),
        earlySznStartDate: toISO(formData.earlySznStartDate),
        memeSznStartDate: toISO(formData.memeSznStartDate),
      };
      if (isEdit && initialData?.id) {
        payload.id = initialData.id;
        await apiService.updateCampaign(payload);
      }

      // Simulate API call for create (remove this if you wire up create to backend)
      if (!isEdit) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Call onCreate to update parent state
      if (onCreate) {
        onCreate(isEdit ? { ...payload } : validatedData);
      }

      // Reset form and close modal (only for create)
      if (!isEdit) {
        setFormData({
          totalPools: "",
          isBootstrapping: false,
          bootstrappingStartDate: "",
          isEarlySzn: false,
          earlySznStartDate: "",
          isMemeSzn: false,
          memeSznStartDate: "",
        });
      }
      onClose();
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
        totalPools: "",
        isBootstrapping: false,
        bootstrappingStartDate: "",
        isEarlySzn: false,
        earlySznStartDate: "",
        isMemeSzn: false,
        memeSznStartDate: "",
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
              {isEdit
                ? "Edit Pool Configuration"
                : "Create New Pool Configuration"}
            </h2>
            <p className="text-gray-600 mt-1">
              {isEdit
                ? "Update your pool seasons and configuration"
                : "Set up your pool seasons and configuration"}
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
          {/* Total Pools */}
          <div className="space-y-2">
            <label
              htmlFor="totalPools"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              Total Pools
            </label>
            <input
              id="totalPools"
              type="number"
              placeholder="Enter total number of pools"
              value={formData.totalPools}
              onChange={(e) => handleInputChange("totalPools", e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                errors.totalPools
                  ? "border-red-300 focus:border-red-500 bg-red-50/50"
                  : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
              }`}
            />
            {errors.totalPools && (
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
                {errors.totalPools}
              </p>
            )}
          </div>

          {/* Bootstrapping Section */}
          <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Bootstrapping Configuration
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="isBootstrapping"
                type="checkbox"
                checked={formData.isBootstrapping}
                onChange={(e) =>
                  handleInputChange("isBootstrapping", e.target.checked)
                }
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label
                htmlFor="isBootstrapping"
                className="text-sm font-medium text-gray-700"
              >
                Enable Bootstrapping
              </label>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bootstrappingStartDate"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Bootstrapping Start Date
              </label>
              <input
                id="bootstrappingStartDate"
                type="datetime-local"
                value={formData.bootstrappingStartDate}
                onChange={(e) =>
                  handleInputChange("bootstrappingStartDate", e.target.value)
                }
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                  errors.bootstrappingStartDate
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                }`}
              />
              {errors.bootstrappingStartDate && (
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
                  {errors.bootstrappingStartDate}
                </p>
              )}
            </div>
          </div>

          {/* Early Season and Meme Season Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Early Season Section */}
            <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="text-base font-semibold text-gray-900">
                  Early Season
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  id="isEarlySzn"
                  type="checkbox"
                  checked={formData.isEarlySzn}
                  onChange={(e) =>
                    handleInputChange("isEarlySzn", e.target.checked)
                  }
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="isEarlySzn"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable Early Season
                </label>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="earlySznStartDate"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-green-600" />
                  Start Date
                </label>
                <input
                  id="earlySznStartDate"
                  type="datetime-local"
                  value={formData.earlySznStartDate}
                  onChange={(e) =>
                    handleInputChange("earlySznStartDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.earlySznStartDate
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                  }`}
                />
                {errors.earlySznStartDate && (
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
                    {errors.earlySznStartDate}
                  </p>
                )}
              </div>
            </div>

            {/* Meme Season Section */}
            <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-pink-600" />
                <h3 className="text-base font-semibold text-gray-900">
                  Meme Season
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  id="isMemeSzn"
                  type="checkbox"
                  checked={formData.isMemeSzn}
                  onChange={(e) =>
                    handleInputChange("isMemeSzn", e.target.checked)
                  }
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="isMemeSzn"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable Meme Season
                </label>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="memeSznStartDate"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-pink-600" />
                  Start Date
                </label>
                <input
                  id="memeSznStartDate"
                  type="datetime-local"
                  value={formData.memeSznStartDate}
                  onChange={(e) =>
                    handleInputChange("memeSznStartDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.memeSznStartDate
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-gray-200 focus:border-purple-500 bg-white hover:border-gray-300"
                  }`}
                />
                {errors.memeSznStartDate && (
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
                    {errors.memeSznStartDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 h-[3rem] border border-gray-300 cursor-pointer text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-[3rem] bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isEdit
                    ? "Updating Configuration..."
                    : "Creating Configuration..."}
                </div>
              ) : isEdit ? (
                "Update Configuration"
              ) : (
                "Create Configuration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
