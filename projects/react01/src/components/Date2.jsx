import { useState } from "react";

/**
 * Date2 component: allows user to select two dates and shows business days and midpoint date.
 */
const Date2 = () => {
  // State for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Helper to count business days between two dates (inclusive)
  const getBusinessDays = (start, end) => {
    let count = 0;
    let current = new Date(start);
    const last = new Date(end);
    if (current > last) return 0;
    while (current <= last) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++; // Exclude Sunday (0) and Saturday (6)
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  // Helper to get the midpoint date between two dates
  const getMidpointDate = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const midTime = Math.floor((startTime + endTime) / 2);
    const midDate = new Date(midTime);
    // Format as yyyy-mm-dd for display
    return midDate.toISOString().split("T")[0];
  };

  // Only show results if both dates are selected
  const showResults = startDate && endDate;
  let businessDays = 0;
  let midpoint = "";
  if (showResults) {
    const [minDate, maxDate] = [startDate, endDate].sort();
    businessDays = getBusinessDays(minDate, maxDate);
    midpoint = getMidpointDate(minDate, maxDate);
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs mx-auto p-4">
      <label className="flex flex-col gap-1">
        <span>Fecha de inicio</span>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Fecha de fin</span>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </label>
      {showResults && (
        <div className="mt-4 bg-gray-100 rounded p-3 text-center">
          <div className="mb-2">
            <strong>Días laborables:</strong> {businessDays}
          </div>
          <div>
            <strong>Fecha a la mitad del período:</strong> {midpoint}
          </div>
        </div>
      )}
    </div>
  );
};

export default Date2;
