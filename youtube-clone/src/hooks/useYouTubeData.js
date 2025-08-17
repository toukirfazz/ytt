import { useState, useEffect, useCallback } from 'react';
import { searchVideos, getPopularVideos } from '@/lib/youtube-api';

export const useYouTubeData = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [totalResults, setTotalResults] = useState(null);
  const [pageTokens, setPageTokens] = useState(['']); // Track page tokens for navigation

  // Load popular videos on initial load
  useEffect(() => {
    loadPopularVideos();
  }, []);

  const loadPopularVideos = useCallback(async (pageToken = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPopularVideos(pageToken);
      setVideos(response.items || []);
      setNextPageToken(response.nextPageToken || '');
      setPrevPageToken(response.prevPageToken || '');
      setHasNextPage(!!response.nextPageToken);
      setHasPrevPage(!!response.prevPageToken);
      setTotalResults(response.pageInfo?.totalResults || null);
      setSearchQuery(''); // Clear search query when loading popular videos
    } catch (err) {
      console.error('Error loading popular videos:', err);
      setError('Failed to load popular videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchForVideos = useCallback(async (query, pageToken = '') => {
    if (!query.trim()) {
      loadPopularVideos();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await searchVideos(query, pageToken);
      setVideos(response.items || []);
      setNextPageToken(response.nextPageToken || '');
      setPrevPageToken(response.prevPageToken || '');
      setHasNextPage(!!response.nextPageToken);
      setHasPrevPage(!!response.prevPageToken);
      setTotalResults(response.pageInfo?.totalResults || null);
      setSearchQuery(query);
    } catch (err) {
      console.error('Error searching videos:', err);
      setError('Failed to search videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [loadPopularVideos]);

  const handleSearch = useCallback((query) => {
    setCurrentPage(1);
    setPageTokens(['']); // Reset page tokens
    searchForVideos(query);
  }, [searchForVideos]);

  const handleNextPage = useCallback(() => {
    if (hasNextPage && nextPageToken) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      
      // Add next page token to our tracking array
      const newPageTokens = [...pageTokens];
      if (newPageTokens.length <= newPage - 1) {
        newPageTokens.push(nextPageToken);
      }
      setPageTokens(newPageTokens);
      
      if (searchQuery) {
        searchForVideos(searchQuery, nextPageToken);
      } else {
        loadPopularVideos(nextPageToken);
      }
    }
  }, [hasNextPage, nextPageToken, currentPage, pageTokens, searchQuery, searchForVideos, loadPopularVideos]);

  const handlePrevPage = useCallback(() => {
    if (hasPrevPage && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      
      // Get the page token for the previous page
      const prevToken = pageTokens[newPage - 1] || '';
      
      if (searchQuery) {
        searchForVideos(searchQuery, prevToken);
      } else {
        loadPopularVideos(prevToken);
      }
    }
  }, [hasPrevPage, currentPage, pageTokens, searchQuery, searchForVideos, loadPopularVideos]);

  const refreshData = useCallback(() => {
    if (searchQuery) {
      searchForVideos(searchQuery);
    } else {
      loadPopularVideos();
    }
  }, [searchQuery, searchForVideos, loadPopularVideos]);

  return {
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
    refreshData,
    loadPopularVideos
  };
};

