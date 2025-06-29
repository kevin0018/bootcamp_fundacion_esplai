function Cat({ width, height, name }) {
    return (
        <div style={{
            width: width,
            height: height,
            textAlign: 'center',
            margin: '10px',
            border: '1px solid blue',
            padding: '5px',
        }}>
            <img src={`https://loremflickr.com/${width}/${height}`} alt={name} style={{ width: '100%', height: 'auto' }} />
            <div>{name}</div>
        </div>
    );
}

export default Cat;