import { useState, useEffect } from "react";
const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Load cities from local JSON file
  useEffect(() => {
    fetch("/src/data/ciutats.json")
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  // Filter cities by query (case-insensitive, only by 'municipi')
  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      cities.filter(city => city.municipi.toLowerCase().includes(q))
    );
  }, [query, cities]);

  return (
    <div className="d-flex flex-column gap-2 mx-auto p-4" style={{maxWidth: '350px'}}>
      <label className="d-flex flex-column gap-1">
        <span>Municipio</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="form-control w-100"
          placeholder="Introduce el nombre del municipio"
          style={{minWidth: '180px'}}
        />
      </label>
      <ul
        className="border rounded mt-2 overflow-auto"
        style={{
          backgroundColor: '#111',
          color: '#f8f9fa',
          maxHeight: '12rem',
          minHeight: filtered.length === 0 ? '3.5rem' : undefined,
          transition: 'min-height 0.2s',
        }}
      >
        {filtered.map((city, idx) => (
          <li
            key={idx}
            className="px-3 py-1"
            style={{background: 'transparent', cursor: 'pointer'}}
            onMouseOver={e => e.currentTarget.style.background = '#222'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            {city.municipi}
          </li>
        ))}
      </ul>
      <style>{`
        @media (max-width: 576px) {
          input::placeholder {
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 100%;
            display: block;
          }
        }
        @media (min-width: 577px) and (max-width: 768px) {
          input::placeholder {
            font-size: 16px;
          }
        }
        @media (min-width: 769px) {
          input::placeholder {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Autocomplete;
