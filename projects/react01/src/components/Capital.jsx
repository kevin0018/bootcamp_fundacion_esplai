function Capital({ word }) {
  const initial = word.charAt(0).toUpperCase();
  return (
    <div className="capital">
      <div className="initial" style={{ fontSize: '200px' }}>
        {initial}
      </div>
      <div className="full-word" style={{ fontSize: '30px' }}>
        {word}
      </div>
    </div>
  );
}

export default Capital;