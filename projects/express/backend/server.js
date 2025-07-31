// Express backend for random quote API
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local development
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Load quotes data
const dataPath = path.join(__dirname, 'data/data.json');
let quotes = [];
try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  const json = JSON.parse(raw);
  quotes = json.quotes;
} catch (err) {
  console.error('Error loading quotes:', err);
}

const images = [
  'https://placekitten.com/400/250',
  'https://picsum.photos/400/250',
  'https://placebear.com/400/250',
  'https://www.fillmurray.com/400/250'
];
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

app.get('/api/citarandom', (req, res) => {
  if (!quotes.length) return res.status(500).json({ error: 'No hay citas disponibles' });
  const idx = Math.floor(Math.random() * quotes.length);
  const quote = quotes[idx];
  // Compose response: text and image
  res.json({
    text: `${quote.cite} — ${quote.author}`,
    url: quote.img && quote.img.length > 0 ? quote.img : getRandomImage()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
