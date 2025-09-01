# Express Products API

A simple Node.js/Express service that provides APIs for managing products and cart functionality.

## Features

- **GET /products**: Returns a hardcoded list of products with id, name, and price
- **POST /cart**: Accepts product ID and quantity, returns total price calculation
- **GET /health**: Health check endpoint

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone this repository:
```bash
git clone <your-repository-url>
cd express-products-api
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the PORT environment variable.

## API Endpoints

### 1. Get Products
- **URL**: `/products`
- **Method**: `GET`
- **Description**: Returns a list of all available products

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    },
    {
      "id": 2,
      "name": "Smartphone",
      "price": 699.99
    }
  ]
}
```

### 2. Add to Cart
- **URL**: `/cart`
- **Method**: `POST`
- **Description**: Calculates total price for a given product and quantity

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "productName": "Laptop",
    "unitPrice": 999.99,
    "quantity": 2,
    "totalPrice": 1999.98
  }
}
```

### 3. Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns server status

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

### Get Products:
```bash
curl http://localhost:3000/products
```

### Add to Cart:
```bash
curl -X POST http://localhost:3000/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

## Error Handling

The API includes proper error handling for:
- Invalid product IDs
- Missing or invalid request parameters
- Invalid quantity values
- Server errors

## Available Products

The service includes these hardcoded products:
1. Laptop - $999.99
2. Smartphone - $699.99
3. Headphones - $149.99
4. Keyboard - $79.99
5. Mouse - $39.99

## License

MIT