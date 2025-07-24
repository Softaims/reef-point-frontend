import { Edit, Trash2, Eye, Calendar, TrendingUp } from "lucide-react";

const CampaignTable = ({ campaigns, onDeleteCampaign }) => {
  const getStatusBadge = (isActive, label) => {
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}
      >
        {isActive ? `${label} Active` : `${label} Inactive`}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActiveSeasons = (campaign) => {
    const activeSeasons = [];
    if (campaign.isBootstrapping) activeSeasons.push("Bootstrapping");
    if (campaign.isEarlySzn) activeSeasons.push("Early Season");
    if (campaign.isMemeSzn) activeSeasons.push("Meme Season");

    return activeSeasons.length > 0
      ? activeSeasons.join(", ")
      : "No Active Seasons";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pool ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Pools
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Seasons
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bootstrapping
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Early Season
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meme Season
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {campaign.id}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Pool #{campaign.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {campaign.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.totalPools}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getActiveSeasons(campaign)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {getStatusBadge(campaign.isBootstrapping, "Bootstrap")}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(campaign.bootstrappingStartDate)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {getStatusBadge(campaign.isEarlySzn, "Early")}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(campaign.earlySznStartDate)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {getStatusBadge(campaign.isMemeSzn, "Meme")}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(campaign.memeSznStartDate)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-center group">
                      <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </button>
                      <span className="text-xs mt-1 text-blue-600 group-hover:text-blue-800 transition-colors">
                        View
                      </span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <button className="text-purple-600 hover:text-purple-800 p-1 hover:bg-purple-50 rounded transition-colors">
                        <Edit className="w-4 h-4 cursor-pointer" />
                      </button>
                      <span className="text-xs mt-1 text-purple-600 group-hover:text-purple-800 transition-colors">
                        Edit
                      </span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <button
                        onClick={() => onDeleteCampaign(campaign)}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs mt-1 text-red-600 group-hover:text-red-800 transition-colors">
                        Delete
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
