function SquareB({size, margin, border, color}) {
    return (
        <div style={{
            width: size,
            height: size,
            margin: margin,
            border: border,
            borderColor: color,
            borderStyle: 'solid',
        }}></div>
    );
}

export default SquareB;