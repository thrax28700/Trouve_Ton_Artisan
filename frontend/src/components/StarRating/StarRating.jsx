function StarRating({ note, showLabel = true, size = 'md' }) {
  const stars = [];
  const full  = Math.floor(note);
  const half  = note % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  for (let i = 0; i < full;  i++) stars.push(<i key={`f${i}`} className="bi bi-star-fill" aria-hidden="true" />);
  if (half)                         stars.push(<i key="h"      className="bi bi-star-half" aria-hidden="true" />);
  for (let i = 0; i < empty; i++) stars.push(<i key={`e${i}`} className="bi bi-star"      aria-hidden="true" />);

  const sizeClass = size === 'sm' ? 'star-rating--sm' : size === 'lg' ? 'star-rating--lg' : '';

  return (
    <span
      className={`star-rating ${sizeClass}`}
      role="img"
      aria-label={`Note : ${note} sur 5`}
    >
      {stars}
      {showLabel && <span className="star-rating__label">{note.toFixed(1)}</span>}
    </span>
  );
}

export default StarRating;
