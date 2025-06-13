const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ✅ Advanced CORS setup (allow localhost + 127.0.0.1)
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Serve static files (HTML, CSS, JS, images etc.)
app.use(express.static(path.join(__dirname)));

// 🔁 Order handler
app.post('/place-order', (req, res) => {
  const newOrder = req.body;

  fs.readFile('orders.json', 'utf8', (err, data) => {
    let orders = [];
    if (!err && data) {
      try {
        orders = JSON.parse(data);
      } catch (parseErr) {
        console.error("❌ JSON Parse error:", parseErr);
      }
    }

    orders.push(newOrder);

    fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error("❌ Failed to write file:", err);
        return res.status(500).send("Failed to save order");
      }

      res.send("✅ Order placed successfully!");
    });
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
