import { Edit, Trash2, Eye } from "lucide-react";

const CampaignTable = ({ campaigns, onDeleteCampaign }) => {
  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Paused: "bg-yellow-100 text-yellow-800",
      Completed: "bg-blue-100 text-blue-800",
      Draft: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusStyles[status] || statusStyles.Draft
        }`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(budget);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
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
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {campaign.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(campaign.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(campaign.startDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(campaign.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatBudget(campaign.budget)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-8">
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
