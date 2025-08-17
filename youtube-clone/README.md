# YouTube Clone

A modern YouTube-like web application built with React and the YouTube Data API v3. This application allows users to search, explore, and watch YouTube videos with a clean, responsive interface similar to YouTube's design.

## Features

- **Video Search**: Search for videos using the YouTube Data API v3
- **Popular Videos**: Display trending/popular videos on the homepage
- **Video Player**: Watch videos directly in the app using YouTube's iframe player
- **Responsive Design**: Clean, modern UI that works on desktop and mobile devices
- **Pagination**: Navigate through multiple pages of search results
- **Dark/Light Theme**: Toggle between dark and light themes
- **Video Information**: Display video titles, channel names, view counts, and publish dates
- **Duration Display**: Show video duration on thumbnails

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design
- **UI Components**: shadcn/ui components for consistent design
- **Icons**: Lucide React icons
- **Build Tool**: Vite for fast development and building
- **API**: YouTube Data API v3 for fetching video data

## Project Structure

```
youtube-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.jsx       # Main header with search and navigation
│   │   ├── SearchBar.jsx    # Search input component
│   │   ├── VideoCard.jsx    # Individual video card component
│   │   ├── VideoGrid.jsx    # Grid layout for video cards
│   │   ├── VideoPlayer.jsx  # Modal video player with iframe
│   │   └── Pagination.jsx   # Pagination controls
│   ├── hooks/
│   │   └── useYouTubeData.js # Custom hook for YouTube API data management
│   ├── lib/
│   │   └── youtube-api.js   # YouTube API service layer
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles and Tailwind imports
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables (API key)
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm package manager
- YouTube Data API v3 key

### Installation

1. **Clone or extract the project**:
   ```bash
   cd youtube-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your YouTube API key:
   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` to view the application.

### Getting a YouTube API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API key)
5. Copy the API key and add it to your `.env` file

## Usage

### Homepage
- The homepage displays popular/trending videos by default
- Videos are displayed in a responsive grid layout
- Each video card shows thumbnail, title, channel name, view count, and publish date

### Search
- Use the search bar in the header to search for videos
- Search results are displayed with pagination
- Clear search to return to popular videos

### Video Player
- Click on any video card to open the video player modal
- Videos play using YouTube's embedded iframe player
- Modal includes video details like description and statistics
- Close the modal to return to the video grid

### Pagination
- Navigate through multiple pages of results using Previous/Next buttons
- Page information is displayed at the bottom of the video grid

### Theme Toggle
- Use the sun/moon icon in the header to toggle between light and dark themes

## API Integration

The application uses the YouTube Data API v3 with the following endpoints:

- **Search**: `/search` - Search for videos
- **Videos**: `/videos` - Get video details, statistics, and content details
- **Popular Videos**: `/videos` with `chart=mostPopular` - Get trending videos

### API Features Used

- Video search with query parameters
- Popular/trending videos
- Video statistics (view count, like count)
- Channel information
- Pagination with page tokens
- Video duration and thumbnails

## Environment Variables

- `VITE_YOUTUBE_API_KEY`: Your YouTube Data API v3 key (required)

## Build for Production

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. YouTube is a trademark of Google Inc.

## Notes

- The API key is included in the frontend code for demonstration purposes
- In a production environment, consider using a backend proxy to hide the API key
- Rate limits apply to the YouTube Data API v3
- Some videos may have embedding restrictions

