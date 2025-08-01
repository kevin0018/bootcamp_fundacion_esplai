export class Quote {
  constructor({ cite, author, img }) {
    this.cite = cite;
    this.author = author;
    this.img = img;
  }

  static getRandomQuote(quotes) {
    if (!quotes.length) throw new Error('No hay citas disponibles');
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
  }
}
