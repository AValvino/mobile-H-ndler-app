// Fest hinterlegte, frei erfundene Routen-Koordinaten (kleine Ortschaft) für die Simulation.
// Kein echtes GPS – dient nur der Klick-Prototyp-Demo.
export const ROUTE = [
  [47.8005, 13.0450],
  [47.8010, 13.0465],
  [47.8016, 13.0480],
  [47.8022, 13.0495],
  [47.8027, 13.0512],
  [47.8033, 13.0528],
  [47.8038, 13.0545],
  [47.8042, 13.0562],
  [47.8045, 13.0580],
  [47.8049, 13.0598],
  [47.8054, 13.0614],
  [47.8060, 13.0630],
  [47.8067, 13.0644],
  [47.8075, 13.0655], // Zielpunkt: Kundenstraße
];

// Ab diesem Routenindex wird die "Händler kommt in ca. X Minuten"-Benachrichtigung ausgelöst.
export const NOTIFY_INDEX = 9;

// Letzter Index = Ankunftspunkt beim Kunden.
export const ARRIVAL_INDEX = ROUTE.length - 1;

// Angenommene Fahrzeit pro Streckenabschnitt (in Minuten) für die ETA-Berechnung.
export const MINUTES_PER_STEP = 1.5;

// Intervall zwischen zwei Positions-Updates der Fahrzeugsimulation (Millisekunden).
export const TICK_INTERVAL_MS = 3000;

export const PRODUCTS = [
  { id: 'semmeln', name: 'Sonntagssemmeln', unit: 'Stück' },
  { id: 'vollkorn', name: 'Vollkornbrot', unit: 'Laib' },
  { id: 'mohnstriezel', name: 'Mohnstriezel', unit: 'Stück' },
  { id: 'kuchen', name: 'Apfelkuchen (Stück)', unit: 'Stück' },
  { id: 'kaese', name: 'Bauernkäse', unit: '250g-Stück' },
];
