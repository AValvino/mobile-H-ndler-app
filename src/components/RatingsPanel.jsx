import { useApp } from '../context/AppContext';
import StarRating from './StarRating';

function formatTime(date) {
  return date.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

export default function RatingsPanel({ title = 'Bewertungen', limit }) {
  const { ratings, averageRating } = useApp();
  const visible = limit ? ratings.slice(0, limit) : ratings;

  return (
    <div className="ratings-panel">
      <div className="ratings-panel__header">
        <h3>{title}</h3>
        {ratings.length > 0 && (
          <div className="ratings-panel__average">
            <StarRating value={Math.round(averageRating)} />
            <span>{averageRating.toFixed(1)} / 5 ({ratings.length})</span>
          </div>
        )}
      </div>

      {ratings.length === 0 ? (
        <p className="empty-hint">Noch keine Bewertungen vorhanden.</p>
      ) : (
        <ul className="ratings-panel__list">
          {visible.map((r) => (
            <li key={r.id} className="ratings-panel__item">
              <div className="ratings-panel__item-top">
                <StarRating value={r.stars} />
                <span className="ratings-panel__time">{formatTime(r.createdAt)}</span>
              </div>
              <div className="ratings-panel__product">{r.productName}</div>
              {r.comment && <p className="ratings-panel__comment">„{r.comment}“</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
