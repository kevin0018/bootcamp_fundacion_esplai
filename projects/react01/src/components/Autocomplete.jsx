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
    <div className="flex flex-col gap-2 max-w-xs mx-auto p-4">
      <label className="flex flex-col gap-1">
        <span>Municipio</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Introduce el nombre del municipio"
        />
      </label>
      {filtered.length > 0 && (
        <ul className="bg-white border rounded mt-2 max-h-48 overflow-y-auto">
          {filtered.map((city, idx) => (
            <li key={idx} className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
              {city.municipi}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
