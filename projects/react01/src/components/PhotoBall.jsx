function PhotoBall({ src, radius }) {
    return (
        <div style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius:  `${radius}px`,
            overflow: 'hidden',
            margin: '10px',
            border: '1px solid blue',
        }}>
            <img src={src} alt="Photo" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default PhotoBall;