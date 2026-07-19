import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { ROUTE } from '../data/route';

const vehicleIcon = L.divIcon({
  html: '<div class="vehicle-marker">🚐</div>',
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const startIcon = L.divIcon({
  html: '<div class="point-marker point-marker--start">🏭</div>',
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const endIcon = L.divIcon({
  html: '<div class="point-marker point-marker--end">🏠</div>',
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(position, { animate: true });
  }, [position, map]);
  return null;
}

export default function MapView({ positionIndex }) {
  const currentPosition = ROUTE[positionIndex];
  const start = ROUTE[0];
  const end = ROUTE[ROUTE.length - 1];

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={ROUTE} pathOptions={{ color: '#a8562f', weight: 4, dashArray: '6 8' }} />
      <Marker position={start} icon={startIcon} />
      <Marker position={end} icon={endIcon} />
      <Marker position={currentPosition} icon={vehicleIcon} />
      <Recenter position={currentPosition} />
    </MapContainer>
  );
}
