const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const ordersFilePath = path.join(__dirname, 'orders.json');

// Handle order placement
app.post('/place-order', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    let orders = [];
    if (!err && data) {
      try {
        orders = JSON.parse(data);
      } catch (parseErr) {
        console.error("❌ JSON Parse error:", parseErr);
      }
    }

    orders.push(newOrder);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error("❌ Failed to write file:", err);
        return res.status(500).send("Failed to save order");
      }

      res.send("✅ Order placed successfully!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
