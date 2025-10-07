# Movie Catalog App Documentation

## Overview
A full-stack movie catalog application where users can browse movies, add comments, and admins can manage the movie collection.

## Tech Stack
- **Frontend:** React, React Bootstrap, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Features

### User Features
- Browse all movies
- View movie details
- Add comments to movies
- User registration and login

### Admin Features
- All user features
- Add new movies
- Edit existing movies
- Delete movies
- Access to admin dashboard

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### Environment Variables

**Server (`.env` in `server/` folder):**
```
MONGODB_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
PORT=4000
```

**Client (`.env` in `client/` folder):**
```
REACT_APP_API_URL=http://localhost:4000
```

### Installation

1. **Install server dependencies:**
```bash
cd server
npm install
```

2. **Install client dependencies:**
```bash
cd client
npm install
```

3. **Run the application:**

Terminal 1 (Server):
```bash
cd server
npm start
```

Terminal 2 (Client):
```bash
cd client
npm start
```

## API Endpoints

### User Routes
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/details` - Get user details (protected)

### Movie Routes
- `GET /movies/getMovies` - Get all movies
- `GET /movies/getMovie/:movieId` - Get single movie
- `POST /movies/addMovie` - Add movie (admin only)
- `PATCH /movies/updateMovie/:movieId` - Update movie (admin only)
- `DELETE /movies/deleteMovie/:movieId` - Delete movie (admin only)
- `PATCH /movies/addComment/:movieId` - Add comment (protected)
- `GET /movies/getComments/:movieId` - Get movie comments (protected)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main app component
│   │   └── UserContext.js   # User context for state
│   └── package.json
│
└── server/
    ├── controllers/         # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── auth.js             # JWT authentication
    └── index.js            # Server entry point
```

## User Roles

**Regular User:**
- Can view and comment on movies
- Must be logged in to comment

**Admin:**
- Full CRUD operations on movies
- Access to admin dashboard
- Set `isAdmin: true` in database for admin privileges

### Admin Credentials
```
Email: admin@mail.com
Password: admin123
```

## Key Dependencies

### Frontend
- `react-router-dom` - Routing
- `react-bootstrap` - UI components
- `notyf` - Notifications

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests

## Notes
- Passwords must be at least 8 characters
- Email validation is performed on registration
- All admin actions require authentication and admin role
- Comments are tied to user IDs
