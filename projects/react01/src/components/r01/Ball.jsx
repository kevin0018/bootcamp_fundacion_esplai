function Ball({children}) {
    return (
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'red',
            display: 'inline-block',
            margin: '5px',
        }}>
            {children}
        </div>
    );
}

export default Ball;