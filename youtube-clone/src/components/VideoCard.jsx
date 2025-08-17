import { formatViewCount, formatDuration, formatPublishedDate } from '@/lib/youtube-api';

const VideoCard = ({ video, onClick }) => {
  const {
    id,
    snippet,
    statistics = {},
    contentDetails = {}
  } = video;

  const videoId = typeof id === 'string' ? id : id?.videoId;
  const thumbnailUrl = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;
  const title = snippet?.title || 'Untitled Video';
  const channelTitle = snippet?.channelTitle || 'Unknown Channel';
  const publishedAt = snippet?.publishedAt;
  const viewCount = statistics?.viewCount;
  const duration = contentDetails?.duration;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick && videoId) {
      onClick(videoId, video);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Thumbnail Container */}
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(duration)}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {title}
        </h3>

        {/* Channel Name */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
          {channelTitle}
        </p>

        {/* Video Stats */}
        <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs space-x-2">
          {viewCount && (
            <span>{formatViewCount(viewCount)} views</span>
          )}
          {viewCount && publishedAt && <span>•</span>}
          {publishedAt && (
            <span>{formatPublishedDate(publishedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

