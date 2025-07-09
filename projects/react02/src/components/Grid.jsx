import { useState } from "react";

/**
 * Grid component: 4x4 boolean grid with localStorage save/load/clear.
*/
const GRID_KEY = "grid-state";

export default function Grid() {
  // State: 16 booleans representing the grid
  const [grid, setGrid] = useState(Array(16).fill(false));

  // Toggle the state of a cell by index
  const handleToggle = (idx) => {
    setGrid((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  // Save grid state to localStorage
  const handleSave = () => {
    localStorage.setItem(GRID_KEY, JSON.stringify(grid));
  };

  // Load grid state from localStorage
  const handleLoad = () => {
    const stored = localStorage.getItem(GRID_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 16) {
          setGrid(parsed.map(Boolean));
        }
      } catch {
        console.error("Error loading grid state from localStorage:", stored);
      }
    }
  };

  // Clear grid (set all to false)
  const handleClear = () => {
    setGrid(Array(16).fill(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-4">
      <div className="grid grid-cols-4 gap-3 w-full max-w-xs mb-8">
        {grid.map((active, idx) => (
          <button
            key={idx}
            className={`aspect-square w-full rounded transition-all duration-150 border-none focus:outline-none active:scale-90 active:ring-2 active:ring-blue-400 ${active ? 'bg-blue-500' : 'bg-gray-200'}`}
            onClick={() => handleToggle(idx)}
            aria-label={`Cel·la ${idx + 1}`}
            type="button"
          />
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        <button
          className="px-4 py-2 rounded border bg-white text-black shadow hover:bg-gray-100 transition active:scale-95 active:ring-2 active:ring-blue-400"
          onClick={handleSave}
        >Desar</button>
        <button
          className="px-4 py-2 rounded border bg-white text-black shadow hover:bg-gray-100 transition active:scale-95 active:ring-2 active:ring-blue-400"
          onClick={handleClear}
        >Net</button>
        <button
          className="px-4 py-2 rounded border bg-white text-black shadow hover:bg-gray-100 transition active:scale-95 active:ring-2 active:ring-blue-400"
          onClick={handleLoad}
        >Carregar</button>
      </div>
    </div>
  );
}
