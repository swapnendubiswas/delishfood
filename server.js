const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// ✅ Use Render-provided port OR fallback to 3000 for local dev
const PORT = process.env.PORT || 3000;

// ✅ CORS for both local and any frontend
const corsOptions = {
  origin: '*', // Allow all origins OR add specific domain like: ['https://swapnendubiswas.github.io']
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Serve static files (optional, only if needed)
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

// ✅ Start server using correct port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
