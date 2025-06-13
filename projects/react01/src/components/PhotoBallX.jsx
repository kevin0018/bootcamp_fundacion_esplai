function PhotoBallX({ src, radius }) {
  const style = {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: `${radius}px`,
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return <div className="photo-ball-x" style={style}></div>;
}

export default PhotoBallX;
