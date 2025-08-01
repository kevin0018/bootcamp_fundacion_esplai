

export class GetRandomQuoteQuery {
  constructor(quoteRepository) {
    this.quoteRepository = quoteRepository;
  }
}

export function getRandomQuoteQueryHandler(getRandomQuoteQuery) {
  return (req, res) => {
    try {
      const quote = getRandomQuoteQuery.quoteRepository.getRandom();
      res.json({
        text: `${quote.cite} — ${quote.author}`,
        url: quote.img
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
