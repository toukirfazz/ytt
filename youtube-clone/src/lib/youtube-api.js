// YouTube Data API v3 service layer
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyAep_KHiIAiEVLMSiA0Z0JX-fEy1Skm7IY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search for videos on YouTube
 * @param {string} query - Search query
 * @param {string} pageToken - Page token for pagination
 * @param {number} maxResults - Maximum number of results (default: 25)
 * @returns {Promise<Object>} Search results
 */
export const searchVideos = async (query, pageToken = '', maxResults = 25) => {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      q: query,
      key: API_KEY,
      maxResults: maxResults.toString(),
      order: 'relevance'
    });

    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    const response = await fetch(`${BASE_URL}/search?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Get video IDs to fetch additional details
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const videosData = await getVideoDetails(videoIds);
    
    // Merge search results with video details
    const enrichedItems = data.items.map(item => {
      const videoDetail = videosData.items.find(video => video.id === item.id.videoId);
      return {
        ...item,
        statistics: videoDetail?.statistics || {},
        contentDetails: videoDetail?.contentDetails || {}
      };
    });

    return {
      ...data,
      items: enrichedItems
    };
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

/**
 * Get popular videos (trending)
 * @param {string} pageToken - Page token for pagination
 * @param {number} maxResults - Maximum number of results (default: 25)
 * @param {string} regionCode - Region code (default: 'US')
 * @returns {Promise<Object>} Popular videos
 */
export const getPopularVideos = async (pageToken = '', maxResults = 25, regionCode = 'US') => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      regionCode,
      key: API_KEY,
      maxResults: maxResults.toString()
    });

    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    const response = await fetch(`${BASE_URL}/videos?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    throw error;
  }
};

/**
 * Get video details by video IDs
 * @param {string} videoIds - Comma-separated video IDs
 * @returns {Promise<Object>} Video details
 */
export const getVideoDetails = async (videoIds) => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,statistics,contentDetails',
      id: videoIds,
      key: API_KEY
    });

    const response = await fetch(`${BASE_URL}/videos?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

/**
 * Get channel details by channel ID
 * @param {string} channelId - Channel ID
 * @returns {Promise<Object>} Channel details
 */
export const getChannelDetails = async (channelId) => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,statistics',
      id: channelId,
      key: API_KEY
    });

    const response = await fetch(`${BASE_URL}/channels?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};

/**
 * Format view count for display
 * @param {string|number} viewCount - View count
 * @returns {string} Formatted view count
 */
export const formatViewCount = (viewCount) => {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Format duration from ISO 8601 format
 * @param {string} duration - Duration in ISO 8601 format (PT4M13S)
 * @returns {string} Formatted duration (4:13)
 */
export const formatDuration = (duration) => {
  if (!duration) return '0:00';
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Format published date for display
 * @param {string} publishedAt - Published date in ISO format
 * @returns {string} Formatted date
 */
export const formatPublishedDate = (publishedAt) => {
  const date = new Date(publishedAt);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
};

