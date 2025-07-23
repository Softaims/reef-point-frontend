import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import CampaignTable from "../components/Dashboard/CampaignTable";
// import { mockCampaigns } from "../data/mockCampaigns";
import { mockCampaigns as initialMockCampaigns } from "../data/mockCampaigns";
import { Plus, Filter, Download } from "lucide-react";
import CreateCampaignModal from "../components/Dashboard/CreateCampaignModal";
import DeleteCampaignModal from "../components/Dashboard/DeleteCampaignModal";

const CampaignsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState(initialMockCampaigns);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const handleAddCampaign = (newCampaign) => {
    setCampaigns((prev) => [
      { ...newCampaign, id: Date.now() }, // Add a unique id
      ...prev,
    ]);
  };
  const handleCreateCampaign = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={handleCreateCampaign}
                className="text-white w-[12rem] h-[3rem] rounded-2xl bg-gradient-to-br from-[#ae27a5] to-[#742cb2] shadow-[0_5px_20px_-10px_#742cb2]  font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 text-sm lg:text-base cursor-pointer"
              >
                <Plus className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* <CampaignTable campaigns={mockCampaigns} /> */}
        <CampaignTable
          campaigns={campaigns}
          onDeleteCampaign={handleOpenDeleteModal}
        />
      </main>

      {/* Mobile Menu Overlay */}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreate={handleAddCampaign}
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
