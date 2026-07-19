import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const AUTO_DISMISS_MS = 6000;

export default function ToastStack() {
  const { notifications, dismissNotification, disruption, clearDisruption } = useApp();

  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => dismissNotification(n.id), AUTO_DISMISS_MS)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <div className="toast-stack">
      {disruption && (
        <div className="toast toast--disruption">
          <span>⚠️ {disruption.text}</span>
          <button className="toast__close" onClick={clearDisruption} aria-label="Meldung schließen">
            ×
          </button>
        </div>
      )}
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast--${n.kind}`}>
          <span>{n.text}</span>
          <button
            className="toast__close"
            onClick={() => dismissNotification(n.id)}
            aria-label="Benachrichtigung schließen"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
