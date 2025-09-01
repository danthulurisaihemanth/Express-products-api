const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 699.99 },
  { id: 3, name: "Headphones", price: 149.99 },
  { id: 4, name: "Keyboard", price: 79.99 },
  { id: 5, name: "Mouse", price: 39.99 }
];

app.get('/products', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/cart', (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    if (typeof productId !== 'number' || typeof quantity !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity must be numbers'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const totalPrice = product.price * quantity;

    res.status(200).json({
      success: true,
      data: {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: quantity,
        totalPrice: parseFloat(totalPrice.toFixed(2))
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Products API: http://localhost:${PORT}/products`);
  console.log(`Cart API: http://localhost:${PORT}/cart`);
});

module.exports = app;