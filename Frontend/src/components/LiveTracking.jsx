import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RoutingControl = ({ pointA, pointB }) => {
  const map = useMap();

  useEffect(() => {
    if (!pointA || !pointB || !map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pointA.ltd, pointA.lng),
        L.latLng(pointB.ltd, pointB.lng),
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: '#0066ff', weight: 4 }],
      },
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: i === 0
              ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
              : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
          title: i === 0 ? 'Start Point' : 'End Point',
        }).bindPopup(i === 0 ? 'Start Location' : 'Destination');
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, pointA, pointB]);

  return null;
};

const LiveTracking = ({ pointA, pointB }) => {
  return (
    <MapContainer
      center={[pointA?.ltd || 0, pointA?.lng || 0]}
      zoom={13}
      scrollWheelZoom={true}
      className="map-container"
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingControl pointA={pointA} pointB={pointB} />
    </MapContainer>
  );
};

export default LiveTracking;
