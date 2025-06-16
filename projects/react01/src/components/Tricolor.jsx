import { useState } from 'react';

function Tricolor() {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['grey', 'red', 'green', 'blue'];

    // Handler to change color on click
    const handleClick = () => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: colors[colorIndex],
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}
        ></div>
    );
}

export default Tricolor;