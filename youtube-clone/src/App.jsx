import { useState } from 'react';
import Header from '@/components/Header';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';
import Pagination from '@/components/Pagination';
import { useYouTubeData } from '@/hooks/useYouTubeData';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const {
    videos,
    loading,
    error,
    searchQuery,
    currentPage,
    hasNextPage,
    hasPrevPage,
    totalResults,
    handleSearch,
    handleNextPage,
    handlePrevPage,
    refreshData
  } = useYouTubeData();

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const handleClosePlayer = () => {
    setSelectedVideoId(null);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Popular Videos'}
          </h1>
          {searchQuery && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover videos related to your search
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                  Error Loading Videos
                </h3>
                <p className="text-red-600 dark:text-red-300 mt-1">
                  {error}
                </p>
              </div>
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <RefreshCw size={16} className="mr-2" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <VideoGrid 
          videos={videos}
          onVideoClick={handleVideoClick}
          loading={loading}
        />

        {/* Pagination */}
        {!loading && !error && videos.length > 0 && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            loading={loading}
            totalResults={totalResults}
            resultsPerPage={25}
          />
        )}
      </main>

      {/* Video Player Modal */}
      {selectedVideoId && (
        <VideoPlayer
          videoId={selectedVideoId}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
}

export default App;
