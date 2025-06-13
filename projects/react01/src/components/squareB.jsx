function SquareB({size, margin, border, color}) {
    return (
        <div style={{
            width: size,
            height: size,
            margin: margin,
            border: border + ' solid ' + color,
        }}></div>
    );
}

export default SquareB;