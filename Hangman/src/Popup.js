const Popup = ({ status, word, reset }) => {
  if (!status) return null;

  return (
    <div className="popup">
      <p>You {status}!</p>
      <p>The word was {word}</p>
      <button className="pulse" onClick={reset}>
        Play again
      </button>
    </div>
  );
};

export default Popup;
