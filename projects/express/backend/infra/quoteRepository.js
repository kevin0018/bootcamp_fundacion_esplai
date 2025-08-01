import fs from 'fs';
import path from 'path';
import { Quote } from '../domain/quote.js';

export class QuoteRepository {
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.quotes = [];
    this.load();
  }

  load() {
    try {
      const raw = fs.readFileSync(this.dataPath, 'utf8');
      const json = JSON.parse(raw);
      this.quotes = json.quotes.map(q => new Quote(q));
    } catch (err) {
      this.quotes = [];
    }
  }

  getAll() {
    return this.quotes;
  }

  getRandom() {
    if (!this.quotes.length) throw new Error('No hay citas disponibles');
    const idx = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[idx];
  }
}
