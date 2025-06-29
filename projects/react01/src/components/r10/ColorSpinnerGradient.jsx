import { useState } from 'react';

const ColorSpinnerGradient = () => {
  // State for first color
  const [red1, setRed1] = useState(127);
  const [green1, setGreen1] = useState(127);
  const [blue1, setBlue1] = useState(127);
  // State for second color
  const [red2, setRed2] = useState(255);
  const [green2, setGreen2] = useState(255);
  const [blue2, setBlue2] = useState(255);
  // State for steps and gradient
  const [steps, setSteps] = useState(10);
  const [gradient, setGradient] = useState([]);

  // Handler to calculate gradient
  const handleCalculate = () => {
    const grad = [];
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const r = Math.round(red1 + (red2 - red1) * t);
      const g = Math.round(green1 + (green2 - green1) * t);
      const b = Math.round(blue1 + (blue2 - blue1) * t);
      grad.push(`rgb(${r}, ${g}, ${b})`);
    }
    setGradient(grad);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-xs mx-auto">
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold">Color 1</span>
        <label className="flex flex-col">
          <span>Rojo: {red1}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={red1}
            onChange={e => setRed1(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Verde: {green1}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={green1}
            onChange={e => setGreen1(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Azul: {blue1}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={blue1}
            onChange={e => setBlue1(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </label>
        <div
          className="rounded-full border shadow self-center"
          style={{ width: 50, height: 50, background: `rgb(${red1}, ${green1}, ${blue1})` }}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold">Color 2</span>
        <label className="flex flex-col">
          <span>Rojo: {red2}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={red2}
            onChange={e => setRed2(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Verde: {green2}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={green2}
            onChange={e => setGreen2(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </label>
        <label className="flex flex-col">
          <span>Azul: {blue2}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={blue2}
            onChange={e => setBlue2(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </label>
        <div
          className="rounded-full border shadow self-center"
          style={{ width: 50, height: 50, background: `rgb(${red2}, ${green2}, ${blue2})` }}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="flex flex-col">
          <span>Pasos: {steps}</span>
          <input
            type="range"
            min="10"
            max="40"
            value={steps}
            onChange={e => setSteps(Number(e.target.value))}
            className="w-full accent-gray-500"
          />
        </label>
        <button
          onClick={handleCalculate}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calcular
        </button>
      </div>
      {gradient.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {gradient.map((color, idx) => (
            <div
              key={idx}
              className="rounded-full border"
              style={{ width: 30, height: 30, background: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSpinnerGradient;