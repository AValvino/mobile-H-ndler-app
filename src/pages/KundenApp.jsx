import MapView from '../components/MapView';
import ToastStack from '../components/ToastStack';
import PreorderForm from '../components/PreorderForm';
import OrderList from '../components/OrderList';
import { useApp } from '../context/AppContext';
import { ARRIVAL_INDEX } from '../data/route';

export default function KundenApp() {
  const { positionIndex, isTourRunning, hasArrived, etaMinutes } = useApp();

  let statusText;
  if (hasArrived) {
    statusText = 'Der Händler ist bei dir angekommen! 🎉';
  } else if (isTourRunning) {
    statusText = `Unterwegs – geschätzte Ankunft in ca. ${etaMinutes} Minuten`;
  } else {
    statusText = 'Der Händler hat seine Tour noch nicht gestartet.';
  }

  return (
    <div className="page page--kunde">
      <ToastStack />

      <section className="status-card">
        <h2>🥐 Bäckerei Huber unterwegs</h2>
        <p className="status-card__text">{statusText}</p>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${(positionIndex / ARRIVAL_INDEX) * 100}%` }}
          />
        </div>
      </section>

      <MapView positionIndex={positionIndex} />

      <div className="page__grid">
        <PreorderForm />
        <OrderList />
      </div>
    </div>
  );
}
