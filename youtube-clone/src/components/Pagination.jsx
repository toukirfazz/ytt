import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pagination = ({ 
  currentPage, 
  hasNextPage, 
  hasPrevPage, 
  onNextPage, 
  onPrevPage, 
  loading = false,
  totalResults = null,
  resultsPerPage = 25
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults || currentPage * resultsPerPage);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      {/* Results Info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {totalResults ? (
          <span>
            Showing {startResult}-{endResult} of {totalResults.toLocaleString()} results
          </span>
        ) : (
          <span>
            Page {currentPage}
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={!hasPrevPage || loading}
          className="flex items-center space-x-1"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-2 px-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Page {currentPage}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          className="flex items-center space-x-1"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

