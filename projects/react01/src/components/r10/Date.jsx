import { useState } from 'react';

function Date() {
    const [selectedDate, setSelectedDate] = useState('');

    // Handles date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Returns the day of the week
    const getDayOfWeek = (date) => {
        return date.toLocaleDateString('es-ES', { weekday: 'long' });
    };

    // Returns the number of days passed since the beginning of the year
    const getDaysPassed = (date) => {
        const startOfYear = new window.Date(date.getFullYear(), 0, 1);
        return Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
    };

    // Returns the number of days left in the year
    const getDaysLeft = (date) => {
        const endOfYear = new window.Date(date.getFullYear() + 1, 0, 1);
        return Math.floor((endOfYear - date) / (1000 * 60 * 60 * 24));
    };

    // Returns the percentage of the year that has passed
    const getYearPercentage = (date) => {
        const startOfYear = new window.Date(date.getFullYear(), 0, 1);
        const endOfYear = new window.Date(date.getFullYear() + 1, 0, 1);
        return ((date - startOfYear) / (endOfYear - startOfYear)) * 100;
    };

    // Always render the input, only show info if a valid date is selected
    let dateObj = null;
    let isValidDate = false;
    if (selectedDate) {
        dateObj = new window.Date(selectedDate + 'T00:00:00');
        isValidDate = !isNaN(dateObj.getTime());
    }

    return (
        <div className="container mt-4">
            <h2>Selecciona una fecha</h2>
            <input 
                type="date" 
                value={selectedDate} 
                onChange={handleDateChange} 
                className="form-control mb-3"
            />
            {isValidDate && (
                <div className="mt-3">
                    <p><strong>Día de la semana:</strong> {getDayOfWeek(dateObj)}</p>
                    <p><strong>Días transcurridos desde el inicio del año:</strong> {getDaysPassed(dateObj)}</p>
                    <p><strong>Días restantes del año:</strong> {getDaysLeft(dateObj)}</p>
                    <p><strong>% del año "gastado":</strong> {getYearPercentage(dateObj).toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
}

export default Date;
