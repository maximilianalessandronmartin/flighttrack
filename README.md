# FlightTrack

## Overview

**FlightTrack** is a web application designed for tracking and visualizing flight data. It provides users with an interactive map interface to view airports and flight routes. Built with a modern tech stack, it combines a Node.js backend with a React.js frontend to deliver a seamless user experience.

---

## Features

- **Interactive Map**:
  - Visualize flight data using map tiles.
  - Browse airports and view their details.

- **Airport Data**:
  - Access detailed information about airports, including location, elevation, and time zone.
  - Filter airports based on specific criteria (e.g., ICAO codes starting with "ED").

- **Caching for Performance**:
  - Backend routes are cached for improved response times.

- **Scalable Backend**:
  - Built with Express.js for fast and scalable server-side operations.
  - Handles JSON-based APIs for serving airport and tile data.

- **Configurable Environment**:
  - Easily manage and customize environment variables using `dotenv`.

- **Frontend**:
  - React-based interactive and dynamic user interface.
  - Bootstrapped with Create React App for a modern development experience.

---

## Technologies Used

### Backend
- **Node.js**: Server-side runtime for executing JavaScript.
- **Express.js**: Web framework for building REST APIs.
- **@mapbox/mbtiles**: For managing and serving map tiles.
- **Apicache**: Middleware for caching API responses.
- **dotenv**: Manage environment variables.
- **CORS**: Enable secure cross-origin resource sharing.
- **body-parser**: Parse incoming request bodies.

### Frontend
- **React.js**: Frontend library for building user interfaces.
- **Create React App**: Bootstrapped for development convenience.
- **HTML, CSS, SCSS**: For styling and layout.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- NPM (Node Package Manager)
- A modern browser for frontend visualization.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/maximilianalessandronmartin/flighttrack.git
