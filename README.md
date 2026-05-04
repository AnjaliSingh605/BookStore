# 📚 Bookstore API – Online Book Store Backend

A RESTful backend for an online bookstore with user authentication, book management, order processing, and real-time chat.

## Features

* JWT-based user authentication & role management
* Full CRUD for books (admin only)
* Order placement with stock validation & auto price calculation

## Tech Stack

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT & bcryptjs
* Socket.io

## Run Locally

Clone the repository

```
git clone https://github.com/your-username/bookstore-api.git
```

Install dependencies

```
npm install
```

Create a `.env` file

```
MONGO_DB_URL=your_mongodb_url
JWT_SECRET_KEY=your_secret_key
PORT=5000
```

Start the development server

```
npm run dev
```

API runs at **http://localhost:5000**

## Author

Anjali Singh
