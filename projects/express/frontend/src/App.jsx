import { useState, useEffect } from 'react';
import './App.css';

/**
 * Main app component for random quote and image display.
 */
function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch random quote from API
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/citarandom');
      if (!res.ok) throw new Error('Error al obtener la cita');
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      setError('No se pudo cargar la cita');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col lg:flex-row items-center">
        {/* Text section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start mb-4 lg:mb-0 lg:mr-6">
          <h2 className="text-2xl font-bold text-white mb-2 text-center lg:text-left">Cita aleatoria</h2>
          {loading ? (
            <p className="text-white">Cargando...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : quote ? (
            <p className="text-white text-lg text-center lg:text-left">{quote.text}</p>
          ) : null}
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={fetchQuote}
            disabled={loading}
          >
            Refrescar cita
          </button>
        </div>
        {/* Image section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          {quote && (
            <img
              src={quote.url}
              alt="Imagen de la cita"
              className="max-w-xs w-full rounded-lg shadow-lg object-cover"
              style={{ maxHeight: 250 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
