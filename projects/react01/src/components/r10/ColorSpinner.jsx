import { useState } from 'react';
const ColorSpinner = () => {
  // State for RGB values
  const [red, setRed] = useState(127);
  const [green, setGreen] = useState(127);
  const [blue, setBlue] = useState(127);

  // Compute the rgb color string
  const rgbString = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-xs mx-auto">
      <div className="flex flex-col gap-2 w-full">
        <label className="flex flex-col">
          <span>Rojo: {red}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={e => setRed(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Verde: {green}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={e => setGreen(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Azul: {blue}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={e => setBlue(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </label>
      </div>
      <div
        className="rounded-full border shadow"
        style={{ width: 80, height: 80, background: rgbString }}
        aria-label="Color preview"
      />
      <span className="text-sm text-gray-600">Color actual: {rgbString}</span>
    </div>
  );
};

export default ColorSpinner;