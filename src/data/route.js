// Fest hinterlegte, frei erfundene Routen-Koordinaten (Graz) für die Simulation.
// Kein echtes GPS – dient nur der Klick-Prototyp-Demo.
export const ROUTE = [
  [47.0650, 15.4250],
  [47.0655, 15.4265],
  [47.0661, 15.4280],
  [47.0667, 15.4295],
  [47.0672, 15.4312],
  [47.0678, 15.4328],
  [47.0683, 15.4345],
  [47.0687, 15.4362],
  [47.0690, 15.4380],
  [47.0694, 15.4398],
  [47.0699, 15.4414],
  [47.0705, 15.4430],
  [47.0712, 15.4444],
  [47.0720, 15.4455], // Zielpunkt: Kundenstraße
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
  { id: 'kuchen', name: 'Apfelkuchen', unit: 'Stück' },
  { id: 'kaese', name: 'Bauernkäse', unit: '250g-Stück' },
];
