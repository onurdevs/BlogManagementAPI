# Blog API

This project is a simple blog management panel backend developed using Node.js and Express. It provides basic functionalities such as user registration/login, category and post management.

## 🚀 Features

- User authentication with JWT
- Category CRUD operations
- Blog post CRUD operations
- MongoDB (Mongoose) database integration
- N-Tier architecture structure
- RESTful API design
- Test coverage with Jest

## 📁 Project Structure

```
blog-api/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Custom middleware functions
├── models/         # MongoDB models
├── repository/     # Data access layer
├── routes/         # API route definitions
├── services/       # Business logic layer
├── tests/          # Test files
├── utils/          # Utility functions
├── app.js          # Express application setup
├── server.js       # Server entry point
└── package.json    # Project dependencies
```

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Jest for testing
- Bcrypt for password hashing
- CORS for cross-origin requests

## 🚀 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/onurdevs/BlogManagementAPI
   cd blog-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create `.env` file in the root directory

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog-api
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start

   # Run tests
   npm run test
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Category Endpoints

- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category
- `GET /api/categories/:id` - Get specific category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Blog Posts Endpoints

- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 🧪 Testing

The project uses Jest for testing. To run the tests:

```bash
npm run test
```

