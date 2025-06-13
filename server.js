const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow CORS for all origins
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ✅ Dummy order endpoint (works on Render)
app.post('/place-order', (req, res) => {
  const newOrder = req.body;
  console.log("🧾 Dummy Order received:", newOrder); // Will show in Render logs
  res.send("✅ Order placed successfully! (Dummy mode)");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
