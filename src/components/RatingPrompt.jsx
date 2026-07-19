import { useState } from 'react';
import StarRating from './StarRating';
import { useApp } from '../context/AppContext';

export default function RatingPrompt({ order, onDone }) {
  const { addRating } = useApp();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (stars === 0) return;
    addRating({ orderId: order.id, productName: order.productName, stars, comment: comment.trim() });
    onDone();
  }

  return (
    <form className="rating-prompt" onSubmit={handleSubmit}>
      <p className="rating-prompt__intro">Wie war deine Abholung von {order.productName}?</p>
      <StarRating value={stars} onChange={setStars} size="lg" />
      <input
        type="text"
        className="rating-prompt__comment"
        placeholder="Kurzer Kommentar (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={140}
      />
      <div className="btn-row">
        <button type="submit" className="btn btn--primary" disabled={stars === 0}>
          Bewertung abschicken
        </button>
        <button type="button" className="btn btn--ghost" onClick={onDone}>
          Überspringen
        </button>
      </div>
    </form>
  );
}
