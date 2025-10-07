import { useEffect, useState } from "react";
import apiService from "../../api/apiService";
import {
  X,
  Calendar,
  TrendingUp,
  Settings,
  Zap,
  Droplets,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { z } from "zod";

// Available token pools - you can move this to a config file or fetch from API
const AVAILABLE_POOLS = [
  { id: "reef-usdc", name: "REEF/USDC", status: "coming_soon" },
  { id: "reef-mrd", name: "REEF/MRD", status: "active" },
  { id: "reef-hydra", name: "REEF/HYDRA", status: "active" },
  { id: "reef-eth", name: "REEF/ETH", status: "active" },
  { id: "reef-btc", name: "REEF/BTC", status: "active" },
  { id: "usdc-eth", name: "USDC/ETH", status: "active" },
  { id: "mrd-hydra", name: "MRD/HYDRA", status: "active" },
];

// Updated Zod validation schema
const campaignSchema = z.object({
  totalPools: z.number().min(1, { message: "Total pools must be at least 1" }),
  isBootstrapping: z.boolean(),
  bootstrappingStartDate: z
    .string()
    .min(1, { message: "Bootstrapping start date is required" }),
  bootstrappingPools: z.array(z.string()),
  isEarlySzn: z.boolean(),
  earlySznStartDate: z
    .string()
    .min(1, { message: "Early season start date is required" }),
  earlySznPools: z.array(z.string()),
  isMemeSzn: z.boolean(),
  memeSznStartDate: z
    .string()
    .min(1, { message: "Meme season start date is required" }),
  memeSznPools: z.array(z.string()),
});

// Pool Selection Component
const PoolSelector = ({
  title,
  icon: Icon,
  iconColor,
  selectedPools,
  onPoolsChange,
  isExpanded,
  onToggleExpanded,
  searchQuery,
  onSearchChange,
}) => {
  const filteredPools = AVAILABLE_POOLS.filter((pool) =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePoolToggle = (poolId) => {
    const isSelected = selectedPools.includes(poolId);
    let newSelectedPools;

    if (isSelected) {
      newSelectedPools = selectedPools.filter((id) => id !== poolId);
    } else {
      newSelectedPools = [...selectedPools, poolId];
    }

    onPoolsChange(newSelectedPools);
  };

  const handleSelectAll = () => {
    const allPoolIds = filteredPools.map((pool) => pool.id);
    const areAllSelected = allPoolIds.every((id) => selectedPools.includes(id));

    if (areAllSelected) {
      const newSelectedPools = selectedPools.filter(
        (id) => !allPoolIds.includes(id)
      );
      onPoolsChange(newSelectedPools);
    } else {
      const newSelectedPools = [...new Set([...selectedPools, ...allPoolIds])];
      onPoolsChange(newSelectedPools);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg border border-gray-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">
            ({selectedPools.length} selected)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {/* Search and Select All */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pools..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              {filteredPools.every((pool) => selectedPools.includes(pool.id))
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          {/* Pool Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {filteredPools.map((pool) => (
              <div
                key={pool.id}
                className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedPools.includes(pool.id)
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => handlePoolToggle(pool.id)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedPools.includes(pool.id)}
                    onChange={() => handlePoolToggle(pool.id)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{pool.name}</div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          pool.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {pool.status === "active" ? "Active" : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPools.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pools found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CreateCampaignModal = ({
  isOpen,
  onClose,
  onCreate,
  initialData,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    totalPools: "",
    isBootstrapping: false,
    bootstrappingStartDate: "",
    bootstrappingPools: [],
    isEarlySzn: false,
    earlySznStartDate: "",
    earlySznPools: [],
    isMemeSzn: false,
    memeSznStartDate: "",
    memeSznPools: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Separate search states for each campaign type
  const [searchQueries, setSearchQueries] = useState({
    bootstrapping: "",
    earlySzn: "",
    memeSzn: "",
  });

  // Expanded states for each pool selector
  const [expandedSections, setExpandedSections] = useState({
    bootstrapping: true,
    earlySzn: true,
    memeSzn: true,
  });

  // Helper to convert ISO string to 'yyyy-MM-ddTHH:mm' for datetime-local
  const toDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
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
        bootstrappingPools: initialData.bootstrappingPools || [],
        isEarlySzn: !!initialData.isEarlySzn,
        earlySznStartDate: toDatetimeLocal(initialData.earlySznStartDate),
        earlySznPools: initialData.earlySznPools || [],
        isMemeSzn: !!initialData.isMemeSzn,
        memeSznStartDate: toDatetimeLocal(initialData.memeSznStartDate),
        memeSznPools: initialData.memeSznPools || [],
      });
    } else if (isOpen && !initialData) {
      setFormData({
        totalPools: "",
        isBootstrapping: false,
        bootstrappingStartDate: "",
        bootstrappingPools: [],
        isEarlySzn: false,
        earlySznStartDate: "",
        earlySznPools: [],
        isMemeSzn: false,
        memeSznStartDate: "",
        memeSznPools: [],
      });
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSearchChange = (campaignType, query) => {
    setSearchQueries((prev) => ({
      ...prev,
      [campaignType]: query,
    }));
  };

  const handleToggleExpanded = (campaignType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [campaignType]: !prev[campaignType],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredErrors = {};
    if (!formData.totalPools || isNaN(Number(formData.totalPools)))
      requiredErrors.totalPools = "Total pools is required";
    if (formData.isBootstrapping && !formData.bootstrappingStartDate)
      requiredErrors.bootstrappingStartDate =
        "Bootstrapping start date is required";
    if (formData.isEarlySzn && !formData.earlySznStartDate)
      requiredErrors.earlySznStartDate = "Early season start date is required";
    if (formData.isMemeSzn && !formData.memeSznStartDate)
      requiredErrors.memeSznStartDate = "Meme season start date is required";

    // Validate that at least one pool is selected for enabled campaigns
    if (formData.isBootstrapping && formData.bootstrappingPools.length === 0) {
      requiredErrors.bootstrappingPools =
        "At least one pool must be selected for Bootstrapping";
    }
    if (formData.isEarlySzn && formData.earlySznPools.length === 0) {
      requiredErrors.earlySznPools =
        "At least one pool must be selected for Early Season";
    }
    if (formData.isMemeSzn && formData.memeSznPools.length === 0) {
      requiredErrors.memeSznPools =
        "At least one pool must be selected for Meme Season";
    }

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

      console.log("🚀 ~ handleSubmit ~ isEdit:", isEdit);
      console.log("🚀 ~ handleSubmit ~ initialData:", initialData);
      if (isEdit && initialData?.id) {
        payload.id = initialData.id;
        await apiService.updateCampaign(payload);
      } else {
        // For create operations, you might want to call apiService.createCampaign(payload)
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
          bootstrappingPools: [],
          isEarlySzn: false,
          earlySznStartDate: "",
          earlySznPools: [],
          isMemeSzn: false,
          memeSznStartDate: "",
          memeSznPools: [],
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
      } else {
        console.error("Error creating/updating campaign:", error);
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
        bootstrappingPools: [],
        isEarlySzn: false,
        earlySznStartDate: "",
        earlySznPools: [],
        isMemeSzn: false,
        memeSznStartDate: "",
        memeSznPools: [],
      });
      setErrors({});
      setSearchQueries({
        bootstrapping: "",
        earlySzn: "",
        memeSzn: "",
      });
      onClose();
    }
  };

  // Disable main page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-[4px] flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit
                ? "Edit Campaign Configuration"
                : "Create New Campaign Configuration"}
            </h2>
            <p className="text-gray-600 mt-1">
              {isEdit
                ? "Update your campaign seasons and pool eligibility"
                : "Set up your campaign seasons and pool eligibility"}
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
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Bootstrapping Campaign
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
                  Enable Campaign
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bootstrappingStartDate"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Start Date
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

            {/* Bootstrapping Pool Selection */}
            <PoolSelector
              title="Eligible Pools for Bootstrapping"
              icon={Droplets}
              iconColor="text-blue-600"
              selectedPools={formData.bootstrappingPools}
              onPoolsChange={(pools) =>
                handleInputChange("bootstrappingPools", pools)
              }
              isExpanded={expandedSections.bootstrapping}
              onToggleExpanded={() => handleToggleExpanded("bootstrapping")}
              searchQuery={searchQueries.bootstrapping}
              onSearchChange={(query) =>
                handleSearchChange("bootstrapping", query)
              }
            />
            {errors.bootstrappingPools && (
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
                {errors.bootstrappingPools}
              </p>
            )}
          </div>

          {/* Early Season and Meme Season Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Early Season Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Early Season Campaign
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
                    Enable
                  </label>
                </div>
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

              {/* Early Season Pool Selection */}
              <PoolSelector
                title="Eligible Pools for Early Season"
                icon={Droplets}
                iconColor="text-green-600"
                selectedPools={formData.earlySznPools}
                onPoolsChange={(pools) =>
                  handleInputChange("earlySznPools", pools)
                }
                isExpanded={expandedSections.earlySzn}
                onToggleExpanded={() => handleToggleExpanded("earlySzn")}
                searchQuery={searchQueries.earlySzn}
                onSearchChange={(query) =>
                  handleSearchChange("earlySzn", query)
                }
              />
              {errors.earlySznPools && (
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
                  {errors.earlySznPools}
                </p>
              )}
            </div>

            {/* Meme Season Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-pink-600" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Meme Season Campaign
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
                    Enable
                  </label>
                </div>
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

              {/* Meme Season Pool Selection */}
              <PoolSelector
                title="Eligible Pools for Meme Season"
                icon={Droplets}
                iconColor="text-pink-600"
                selectedPools={formData.memeSznPools}
                onPoolsChange={(pools) =>
                  handleInputChange("memeSznPools", pools)
                }
                isExpanded={expandedSections.memeSzn}
                onToggleExpanded={() => handleToggleExpanded("memeSzn")}
                searchQuery={searchQueries.memeSzn}
                onSearchChange={(query) => handleSearchChange("memeSzn", query)}
              />
              {errors.memeSznPools && (
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
                  {errors.memeSznPools}
                </p>
              )}
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
