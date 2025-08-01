import { QuoteRepository } from '../infra/quoteRepository.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = new QuoteRepository(path.join(__dirname, '../data/data.json'));

console.log('Test: El modelo inicia correctamente');
if (!repo.getAll().length) throw new Error('No hay datos en el modelo');

console.log('Test: repo.getRandom devuelve citas válidas');
const results = Array.from({ length: 10 }, () => repo.getRandom());
const unique = new Set(results.map(q => q.cite + q.author));
if (unique.size < 2 && repo.getAll().length > 1) {
  throw new Error('No se obtuvo más de una cita diferente en varias llamadas');
}
console.log('Todos los tests pasaron');
