# Natours API & Tour Booking Application

Natours is a full-stack tour booking application built with **Node.js, Express.js, MongoDB, Mongoose, and Pug**. The application provides a complete backend API along with a server-side rendered frontend where users can explore tours, view tour details, create accounts, manage their profiles, write reviews, and book tours.

The project focuses on building a production-style RESTful API with authentication, authorization, database management, error handling, security, and server-side rendering.

## Features

- User registration and authentication
- JWT-based authentication and authorization
- Secure password hashing
- User profile management
- Update password functionality
- Role-based authorization
- Browse and search available tours
- View detailed tour information
- Filter, sort, and paginate tours
- Tour reviews and ratings
- Create, update, and delete reviews
- Tour bookings
- User booking management
- Interactive tour location maps using Leaflet
- Geospatial tour queries
- Image uploads and image processing
- Email functionality
- Secure API design
- Centralized error handling
- MongoDB database integration with Mongoose
- Server-side rendered pages using Pug

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Stripe
- Nodemailer

### Frontend

- Pug
- CSS
- JavaScript
- Leaflet.js

### Development Tools

- Git & GitHub
- Postman
- Morgan
- ESLint

## Project Architecture

The application follows a structured MVC-style architecture:

```text
natours/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── dev-data/
├── app.js
├── server.js
└── package.json
```

- **Models** – Define MongoDB schemas and database relationships.
- **Controllers** – Contain application and business logic.
- **Routes** – Define API endpoints and connect them to controllers.
- **Views** – Pug templates used for server-side rendering.
- **Utils** – Reusable utility functions such as error handling and async wrappers.
- **Public** – Frontend assets including CSS, JavaScript, and images.

## API

The application provides RESTful API endpoints for managing:

- Tours
- Users
- Reviews
- Bookings

Example API routes:

```text
GET    /api/v1/tours
GET    /api/v1/tours/:id
POST   /api/v1/tours
PATCH  /api/v1/tours/:id
DELETE /api/v1/tours/:id

GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users/signup
POST   /api/v1/users/login
PATCH  /api/v1/users/updateMe
PATCH  /api/v1/users/updateMyPassword

GET    /api/v1/reviews
POST   /api/v1/reviews
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id

GET    /api/v1/bookings
POST   /api/v1/bookings
```

## Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

The authentication flow includes:

1. User creates an account.
2. User logs in with their credentials.
3. The server validates the credentials.
4. A JWT is generated and returned to the client.
5. Protected routes verify the JWT before allowing access.
6. Authorization middleware checks whether the authenticated user has the required permissions.

## Database

Natours uses **MongoDB** as its database and **Mongoose** as the ODM.

The main database models include:

- User
- Tour
- Review
- Booking

Mongoose features used in the project include:

- Schema validation
- Middleware
- Virtual properties
- Virtual population
- Query middleware
- Aggregation pipelines
- Referencing documents
- Geospatial queries

## Environment Variables

Create a configuration file for your environment variables.

Example:

```env
NODE_ENV=development
PORT=8000
DATABASE=your_mongodb_connection_string
DATABASE_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Never commit environment variables, API keys, passwords, or secret tokens to GitHub.**

Add your environment files to `.gitignore`:

```gitignore
*.env
```

## Installation

Clone the repository:

```bash
git clone https://github.com/AwaisnBhatti/natours.git
```

Navigate into the project directory:

```bash
cd natours
```

Install dependencies:

```bash
npm install
```

Create your environment configuration file and add the required variables.

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:8000
```

## API Testing

The API can be tested using **Postman**.

The project includes endpoints for:

- Authentication
- Tours
- Users
- Reviews
- Bookings

You can use Postman to send requests, test protected routes, and provide JWT authentication tokens when required.

## Security

The application implements several security practices, including:

- Password hashing with bcrypt
- JWT authentication
- HTTP security headers
- Rate limiting
- Data sanitization
- Parameter pollution prevention
- Input validation
- Centralized error handling

## Future Improvements

Potential future improvements include:

- React-based frontend
- Admin dashboard
- Advanced booking management
- Improved payment workflow
- Real-time notifications
- Automated testing
- CI/CD pipeline
- Docker containerization
- Production deployment

## Author

**Awais Ahmad**

GitHub: [AwaisnBhatti](https://github.com/AwaisnBhatti)
