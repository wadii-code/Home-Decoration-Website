const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const products = require('./products.json');

const app = express();
const port = 3001;

const ordersFilePath = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading orders file:', err);
      return res.status(500).send('Error reading orders data.');
    }
    res.json(JSON.parse(data));
  });
});

// Add a new order
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading orders file:', err);
      return res.status(500).send('Error preparing to save order.');
    }
    
    const orders = JSON.parse(data);
    newOrder.id = new Date().getTime(); // Assign a unique ID
    orders.push(newOrder);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error('Error writing orders file:', err);
        return res.status(500).send('Error saving order.');
      }
      res.status(201).json(newOrder);
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});