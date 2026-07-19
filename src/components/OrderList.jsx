import { useApp } from '../context/AppContext';

function formatTime(date) {
  return date.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

export default function OrderList({ title = 'Meine Bestellungen', showTime = true }) {
  const { orders } = useApp();

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
            <div>
              <strong>{order.quantity}× {order.productName}</strong>
              <span className="order-list__unit"> ({order.unit})</span>
            </div>
            <div className="order-list__meta">
              <span className={`badge ${order.binding ? 'badge--binding' : 'badge--interest'}`}>
                {order.binding ? 'verbindlich' : 'Interesse'}
              </span>
              {showTime && <span className="order-list__time">{formatTime(order.createdAt)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
