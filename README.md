# Backend API

## Project Overview

This is a simple backend API for a blogging platform, built using Node.js, Express, and Prisma ORM with a PostgreSQL database. It provides authentication, post creation and management, and comment functionality. It also uses JSON Web Tokens (JWT) for secure authentication.

## Features

- **User Authentication**: Registration and login using email and password with secure password hashing (bcrypt.js).
- **Post Management**: Authors can create, update, publish, and delete posts.
- **Commenting System**: Users can post, update, and delete comments on blog posts.
- **Role-based Authorization**: Only authenticated users can create posts or comments, and only authors can manage posts.

## Technologies Used

- **Node.js**: Server-side JavaScript environment.
- **Express**: Web framework for building the API.
- **Prisma**: ORM for managing PostgreSQL database interactions.
- **PostgreSQL**: Relational database system.
- **JWT**: Used for user authentication and authorization.
- **Bcrypt.js**: Secure password hashing.
- **dotenv**: Loads environment variables from a `.env` file.

## Setup and Installation

### 1. Clone the Repository

    git clone https://github.com/your-repo/backend-api.git
    cd backend-api


### 2. Install Dependencies

    npm install

### 3. Set up Environment Variables
Create a .env file in the root directory and add the following:

    DATABASE_URL="postgresql://your_database_url"
    JWT_SECRET="your_jwt_secret_key"

### 4. Prisma Database Setup
Before running the application, make sure to run the Prisma migrations to create the necessary tables in the PostgreSQL database:

    npx prisma migrate dev

### 5. Start the Application

    npm start

This will start the server on http://localhost:5000.

# Endpoints

## Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

## Posts

- `GET /api/posts`: Get all published posts.
- `GET /api/posts/:id`: Get a single post by its ID.
- `POST /api/posts`: Create a new post (author only).
- `PUT /api/posts/:id`: Update a post (author only).
- `DELETE /api/posts/:id`: Delete a post (author only).
- `PUT /api/posts/:id/publish`: Publish a post (author only).
- `PUT /api/posts/:id/unpublish`: Unpublish a post (author only).

## Comments

- `GET /api/comments/post/:postId`: Get all comments for a post.
- `POST /api/comments`: Create a new comment (authenticated users only).
- `PUT /api/comments/:id`: Update a comment (authenticated users only).
- `DELETE /api/comments/:id`: Delete a comment (authenticated users only).

## Middleware

### Authentication

- `authenticateUser`: Verifies the JWT token to authenticate a user.
- `authorizeAuthor`: Ensures that the authenticated user is an author before allowing certain actions.

## Prisma Models

### User
    
    model User {
    id        Int       @id @default(autoincrement())
    username  String    @unique
    email     String    @unique
    password  String
    isAuthor  Boolean   @default(false)
    posts     Post[]
    comments  Comment[]
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
    }

### Post

    model Post {
    id        Int       @id @default(autoincrement())
    title     String
    content   String
    published Boolean   @default(false)
    author    User      @relation(fields: [authorId], references: [id])
    authorId  Int
    comments  Comment[]
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
    }

### Comment

    model Comment {
    id        Int      @id @default(autoincrement())
    content   String
    post      Post     @relation(fields: [postId], references: [id])
    postId    Int
    user      User     @relation(fields: [userId], references: [id])
    userId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}