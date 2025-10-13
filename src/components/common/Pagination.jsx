import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showPageSizeSelector = true,
  showJumpToPage = true,
  pageSizeOptions = [10, 20, 50, 100],
  className = "",
}) => {
  const [jumpToPageInput, setJumpToPageInput] = useState("");
  const [showJumpInput, setShowJumpInput] = useState(false);

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show pages 2, 3, 4, 5, ..., last
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push("ellipsis-end");
        }
      } else if (currentPage >= totalPages - 3) {
        // Show 1, ..., last-4, last-3, last-2, last-1, last
        if (totalPages > 5) {
          pages.push("ellipsis-start");
        }
        for (let i = Math.max(2, totalPages - 4); i <= totalPages - 1; i++) {
          pages.push(i);
        }
      } else {
        // Show 1, ..., current-1, current, current+1, ..., last
        pages.push("ellipsis-start");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis-end");
      }

      // Always show last page if totalPages > 1
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPageInput);
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
    setJumpToPageInput("");
    setShowJumpInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    } else if (e.key === "Escape") {
      setJumpToPageInput("");
      setShowJumpInput(false);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}
    >
      {/* Mobile View */}
      <div className="flex items-center justify-between px-4 py-3 sm:hidden">
        <div className="flex flex-col">
          <div className="text-sm text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {startItem}–{endItem} of {totalItems} items
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:items-center sm:justify-between px-6 py-4">
        {/* Left Section - Items info and page size selector */}
        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-semibold text-gray-900">{startItem}</span> to{" "}
            <span className="font-semibold text-gray-900">{endItem}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
            results
          </div>

          {showPageSizeSelector && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          )}
        </div>

        {/* Right Section - Pagination controls */}
        <div className="flex items-center space-x-4">
          {/* Jump to page */}
          {showJumpToPage && (
            <div className="flex items-center space-x-2">
              {!showJumpInput ? (
                <button
                  onClick={() => setShowJumpInput(true)}
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
                >
                  Go to page
                </button>
              ) : (
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpToPageInput}
                    onChange={(e) => setJumpToPageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={() => {
                      if (!jumpToPageInput) setShowJumpInput(false);
                    }}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder={currentPage.toString()}
                    autoFocus
                  />
                  <button
                    onClick={handleJumpToPage}
                    className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                  >
                    Go
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <nav className="flex items-center space-x-1">
            {/* First page button */}
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous page button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {getVisiblePages().map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                  return (
                    <button
                      key={`ellipsis-${index}`}
                      className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowJumpInput(true)}
                      title="More pages"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  );
                }

                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 transform scale-105"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next page button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last page button */}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
