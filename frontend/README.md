# Magic Job Frontend

React + Vite frontend for the Magic Job application with real-time Socket.io integration.

## Features

- ✨ Modern React with Vite
- 🔌 Socket.io real-time communication
- 🎨 Responsive design with dark theme
- 📡 RESTful API integration with axios
- ⚡ Fast HMR (Hot Module Replacement)

## Setup

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `VITE_API_URL` if your backend runs on a different URL.

## Development

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Build

Build for production:

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── .env.example         # Environment template
```

## API Integration

The frontend connects to the backend at `http://localhost:5000` (configurable via `.env.local`).

### Available Endpoints

- `GET /health` - Check backend health status
- `GET /api` - Main API endpoint

### Socket.io Events

Real-time connection with automatic reconnection handling.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
