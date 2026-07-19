import { useState } from 'react';
import { useApp } from '../context/AppContext';
import OrderList from '../components/OrderList';
import RatingsPanel from '../components/RatingsPanel';
import { ARRIVAL_INDEX } from '../data/route';

const PRESET_MESSAGES = [
  'Verspätung von ca. 15 Minuten aufgrund von Stau.',
  'Die heutige Tour entfällt leider krankheitsbedingt.',
  'Verspätung – der Wagen ist erst in ca. 30 Minuten da.',
];

export default function HaendlerAnsicht() {
  const { orders, positionIndex, isTourRunning, hasArrived, startTour, resetTour, setDisruption, clearDisruption, disruption } =
    useApp();
  const [customMessage, setCustomMessage] = useState('');

  const bindingCount = orders.filter((o) => o.binding).length;
  const interestCount = orders.length - bindingCount;

  function handleDisruptionSubmit(e) {
    e.preventDefault();
    const message = customMessage.trim() || PRESET_MESSAGES[0];
    setDisruption(message);
    setCustomMessage('');
  }

  let tourStatus = 'Tour noch nicht gestartet';
  if (hasArrived) tourStatus = 'Tour abgeschlossen – Händler angekommen';
  else if (isTourRunning) tourStatus = `Tour läuft – Position ${positionIndex} / ${ARRIVAL_INDEX}`;

  return (
    <div className="page page--haendler">
      <section className="status-card">
        <h2>🚚 Händler-Ansicht</h2>
        <p className="status-card__text">{tourStatus}</p>
        <div className="btn-row">
          <button
            className="btn btn--primary"
            onClick={startTour}
            disabled={isTourRunning}
          >
            Tour starten
          </button>
          <button className="btn btn--ghost" onClick={resetTour}>
            Zurücksetzen
          </button>
        </div>
        <p className="hint-text">
          In der finalen Version würde die Position automatisch per GPS aus dem Fahrzeug
          kommen – kein manuelles Eintippen nötig. Dieser Button simuliert das für den
          Prototyp.
        </p>
      </section>

      <section className="summary-card">
        <h3>Eingänge im Überblick</h3>
        <div className="summary-numbers">
          <div className="summary-number">
            <strong>{bindingCount}</strong>
            <span>verbindliche Vorbestellungen</span>
          </div>
          <div className="summary-number">
            <strong>{interestCount}</strong>
            <span>Interessensbekundungen</span>
          </div>
        </div>
      </section>

      <OrderList title="Eingegangene Vorbestellungen & Interessen" />

      <RatingsPanel title="Aktuelle Bewertungen" limit={3} />

      <section className="disruption-card">
        <h3>Ausfall- / Verspätungsmeldung</h3>
        <form onSubmit={handleDisruptionSubmit}>
          <label className="field">
            <span>Vorlage wählen</span>
            <select onChange={(e) => setCustomMessage(e.target.value)} defaultValue="">
              <option value="" disabled>
                – Vorlage auswählen –
              </option>
              {PRESET_MESSAGES.map((msg) => (
                <option key={msg} value={msg}>
                  {msg}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Oder eigener Text</span>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="z. B. Verspätung von 20 Minuten"
            />
          </label>
          <div className="btn-row">
            <button type="submit" className="btn btn--warning">
              Meldung senden
            </button>
            {disruption && (
              <button type="button" className="btn btn--ghost" onClick={clearDisruption}>
                Meldung zurückziehen
              </button>
            )}
          </div>
        </form>
        {disruption && <p className="disruption-preview">Aktuell aktiv: „{disruption.text}“</p>}
      </section>
    </div>
  );
}
