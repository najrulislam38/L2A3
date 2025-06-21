# Library Management Server

**Library Management server** is a powerful backend server for managing library operations, built with Node.js, Express, and MongoDB with Mongoose. This server provides RESTful APIs for book management, borrowing operations, and administrative functions.

## Features

### Core Functionality

- **Book Management:** CRUD operations for books with details like title, author, ISBN, availability status
- **Borrowing System:** Track book checkouts, returns, and due dates.
- **Filtering by genre:** Advanced search capabilities for books with multiple filter options.
- **Request Queuing:** Implement queries System for handling high-demand book requests
- **Sort and Limit Query:** Implement sort and limit capabilities for books with multiple filter options.
- **Borrowed Book quality:** Get borrowed book totalQuantity per every Borrowed book.
- **Data Validation:** Robust input validation for all API endpoints.

## Prerequisites

Before you begin, ensure you have met the following requirements:

    1. Node.js
    2. npm
    3. Express
    4. TypeScript
    5. MongoDB with Mongoose
    6. dotenv

## Installation

Follow these steps to set up the project locally:

#### 1. Clone the repository.

```bash
git clone https://github.com/your-username/library-management-server.git
cd library-management-server
```

#### 2. Install dependencies

```bash
  npm install
  or
  yarn install
```

#### 3. Create .env file on root directory and set environment variables

```text
  MONGODB_URL= your mongodb url with db name
```

#### 4. Start the server

```bash
  npm run dev
```

## API Documentation

After starting the server, you can access the API documentation at:

- **CRUD Operation for Books collection:** `http://localhost:5000/api/books`
- **Get and Create Borrow book for Borrow collection:** `http://localhost:5000/api/borrow`
