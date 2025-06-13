function BallX({size, margin, background}) {
    return (
        <div style={{
            width: size,
            height: size,
            margin: margin,
            borderRadius: '50%',
            backgroundColor:  background,
        }}></div>
    )
}

export default BallX;