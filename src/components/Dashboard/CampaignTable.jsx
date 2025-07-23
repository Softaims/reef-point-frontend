import { Edit, Trash2, Eye } from "lucide-react";

const CampaignTable = ({ campaigns }) => {
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
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 max-w-[260px]">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8 max-w-[120px]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8 max-w-[120px]">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8 max-w-[120px]">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8 max-w-[120px]">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8 max-w-[100px]">
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
                <td className="px-6 py-4 max-w-[260px] align-top">
                  <div
                    className="text-sm font-medium text-gray-900 truncate"
                    title={campaign.name}
                  >
                    {campaign.name}
                  </div>
                  <div
                    className="text-sm text-gray-500 truncate"
                    title={campaign.description}
                  >
                    {campaign.description}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[120px] align-top">
                  <div className="truncate" title={campaign.status}>
                    {getStatusBadge(campaign.status)}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[120px] align-top text-sm text-gray-900">
                  <div
                    className="truncate"
                    title={formatDate(campaign.startDate)}
                  >
                    {formatDate(campaign.startDate)}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[120px] align-top text-sm text-gray-900">
                  <div
                    className="truncate"
                    title={formatDate(campaign.endDate)}
                  >
                    {formatDate(campaign.endDate)}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[120px] align-top text-sm font-medium text-gray-900">
                  <div
                    className="truncate"
                    title={formatBudget(campaign.budget)}
                  >
                    {formatBudget(campaign.budget)}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[100px] align-top text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-800 p-1 hover:bg-purple-50 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
