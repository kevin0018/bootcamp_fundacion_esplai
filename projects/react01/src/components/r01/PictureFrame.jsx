function PictureFrame({ src, color, padding, background, width, height }) {
    const style = {
        border: `3px solid ${color}`,
        padding: `${padding}px`,
        backgroundColor: background,
        display: 'inline-block',
        width: width,
        height: height,
    };

    return (
        <div style={style}>
            <img src={src} alt="Picture Frame" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
}

export default PictureFrame;