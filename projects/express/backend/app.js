import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { QuoteRepository } from './infra/quoteRepository.js';
import { GetRandomQuoteQuery, getRandomQuoteQueryHandler } from './app/getRandomQuoteQuery.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const repo = new QuoteRepository(path.join(__dirname, 'data/data.json'));
const getRandomQuoteQuery = new GetRandomQuoteQuery(repo);
app.get('/api/citarandom', getRandomQuoteQueryHandler(getRandomQuoteQuery));

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
