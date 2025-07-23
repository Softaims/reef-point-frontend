import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  BarChart3,
  Settings,
  Coins,
  Waves,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: Megaphone,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Tokens",
      path: "/tokens",
      icon: Coins,
    },
    {
      name: "Pools",
      path: "/pools",
      icon: Waves,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white h-screen w-64 shadow-lg border-r border-gray-200 fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reef
          </div>
          <div className="text-xl font-semibold text-gray-700 ml-1">SWAP</div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <div className="px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Main Menu
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
          <p className="text-xs font-medium text-purple-800">Need Help?</p>
          <p className="text-xs text-purple-600 mt-1">Contact support team</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
