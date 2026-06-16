# Booking System API

A Node.js RESTful API for managing booking slots with priority time constraints and capacity limits.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)

## Project Structure

```text
├── src/
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Request validation
│   ├── models/         # Mongoose schemas
│   ├── repositories/   # Database queries
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   └── utils/          # Helper functions
├── .env
├── package.json
└── README.md
```

## Setup & Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables. Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/booking_db
```

3. Start the server:

```bash
npm start
```

## API Endpoints

### 1. Create a Booking

**POST** `/api/bookings`

**Body:**

```json
{
  "name": "John Doe",
  "phoneNumber": "0912345678",
  "requestedTime": "2026-06-17T08:30:00.000Z"
}
```

### 2. Get Bookings List

**GET** `/api/bookings`

**Query Parameters:**

- `date` (optional): Filter by date (e.g., `YYYY-MM-DD`)
- `phoneNumber` (optional): Filter by phone number
- `page` (optional): Default `1`
- `limit` (optional): Default `10`

**Example:**

```bash
curl "http://localhost:3000/api/bookings?date=2026-06-17&page=1&limit=10"
```
