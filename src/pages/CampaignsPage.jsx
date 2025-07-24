import { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import CampaignTable from "../components/Dashboard/CampaignTable";
// import { mockCampaigns } from "../data/mockCampaigns";
import apiService from "../api/apiService";
import { Plus, Filter, Download } from "lucide-react";
import CreateCampaignModal from "../components/Dashboard/CreateCampaignModal";
import DeleteCampaignModal from "../components/Dashboard/DeleteCampaignModal";
import Uik from "@reef-chain/ui-kit";

const CampaignsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  // Fetch campaigns from backend on mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await apiService.getCampaigns();
        console.log("🚀 ~ fetchCampaigns ~ response:", response);
        // Support array, {data: array}, or single object
        let data = [];
        if (Array.isArray(response)) {
          data = response;
        } else if (response && Array.isArray(response.data)) {
          data = response.data;
        } else if (response && typeof response === "object") {
          data = [response];
        }
        setCampaigns(data);
      } catch (err) {
        setFetchError(err.message || "Failed to fetch campaigns");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  // Add or update campaign
  const handleSaveCampaign = (campaign) => {
    if (editingCampaign) {
      // Update existing
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id ? { ...c, ...campaign } : c
        )
      );
    } else {
      // Add new
      setCampaigns((prev) => [{ ...campaign, id: Date.now() }, ...prev]);
    }
    setEditingCampaign(null);
    setIsCreateModalOpen(false);
  };

  // Open modal for create
  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setIsCreateModalOpen(true);
  };

  // Open modal for edit
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingCampaign(null);
  };
  // Delete modal handlers
  const handleDeleteCampaign = (campaignId) => {
    setCampaigns((prev) =>
      prev.filter((campaign) => campaign.id !== campaignId)
    );
  };
  const handleOpenDeleteModal = (campaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCampaignToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="lg:ml-64 sm:pt-[7rem] pt-[11rem] p-4 ">
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                All Campaigns
              </h1>
              <p className="text-gray-600 mt-1 text-sm lg:text-base">
                Manage all your marketing campaigns
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full sm:w-[12rem] h-[3rem] rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, #742cb2 0%, #ae27a5 100%)",
                }}
              >
                {/* Bubble effect background - positioned to fill button */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                  <Uik.Bubbles />
                </div>

                {/* Button content */}
                <button
                  onClick={handleCreateCampaign}
                  className="relative z-20 text-white w-full h-full rounded-2xl shadow-[0_5px_20px_-10px_#742cb2] font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm lg:text-base cursor-pointer bg-transparent border-none hover:shadow-[0_8px_30px_-12px_#742cb2]"
                >
                  <Plus className="w-4 lg:w-5 h-4 lg:h-5" />
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <CampaignTable campaigns={mockCampaigns} /> */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-500 text-sm">
              Loading campaigns...
            </span>
          </div>
        ) : fetchError ? (
          <div className="text-center text-red-500 py-8">{fetchError}</div>
        ) : (
          <CampaignTable
            campaigns={campaigns}
            onDeleteCampaign={handleOpenDeleteModal}
            onEditCampaign={handleEditCampaign}
          />
        )}
      </main>

      {/* Mobile Menu Overlay */}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreate={handleSaveCampaign}
        initialData={editingCampaign}
        isEdit={!!editingCampaign}
      />
      <DeleteCampaignModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteCampaign}
        campaign={campaignToDelete}
      />
    </div>
  );
};

export default CampaignsPage;
