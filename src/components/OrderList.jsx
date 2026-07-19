import { useState } from 'react';
import { useApp } from '../context/AppContext';
import RatingPrompt from './RatingPrompt';

function formatTime(date) {
  return date.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

export default function OrderList({ title = 'Meine Bestellungen', showTime = true, showPickupActions = false }) {
  const { orders, markPickedUp } = useApp();
  const [ratingOrderId, setRatingOrderId] = useState(null);

  if (orders.length === 0) {
    return (
      <div className="order-list">
        <h3>{title}</h3>
        <p className="empty-hint">Noch keine Bestellungen vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h3>{title}</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="order-list__item">
            <div className="order-list__item-row">
              <div>
                <strong>{order.quantity}× {order.productName}</strong>
                <span className="order-list__unit"> ({order.unit})</span>
              </div>
              <div className="order-list__meta">
                <span className={`badge ${order.binding ? 'badge--binding' : 'badge--interest'}`}>
                  {order.binding ? 'verbindlich' : 'Interesse'}
                </span>
                {order.pickedUp && <span className="badge badge--pickedup">abgeholt</span>}
                {showTime && <span className="order-list__time">{formatTime(order.createdAt)}</span>}
              </div>
            </div>

            {showPickupActions && order.binding && !order.pickedUp && (
              <div className="order-list__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={() => {
                    markPickedUp(order.id);
                    setRatingOrderId(order.id);
                  }}
                >
                  Als abgeholt markieren
                </button>
              </div>
            )}

            {showPickupActions && ratingOrderId === order.id && (
              <RatingPrompt order={order} onDone={() => setRatingOrderId(null)} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
