const STARS = [1, 2, 3, 4, 5];

export default function StarRating({ value, onChange, size = 'md' }) {
  const interactive = typeof onChange === 'function';

  return (
    <div className={`star-rating star-rating--${size}`} role={interactive ? 'radiogroup' : undefined}>
      {STARS.map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            className={`star ${n <= value ? 'star--filled' : ''}`}
            onClick={() => onChange(n)}
            aria-label={`${n} von 5 Sternen`}
          >
            ★
          </button>
        ) : (
          <span key={n} className={`star ${n <= value ? 'star--filled' : ''}`}>
            ★
          </span>
        )
      )}
    </div>
  );
}
