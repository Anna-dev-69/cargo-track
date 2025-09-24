import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet-routing-machine";
import getRoute, { filterPositions, FitToBounds } from "./map-tracking.utils";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export type DriverPos = { lat: number; lng: number; ts: number };

interface MapTrackerProps {
  driverId: string | null;
  fromCoords?: { lat: number; lng: number };
  toCoords?: { lat: number; lng: number };
  driverName?: string;
  requestNumber?: string;
}

export const MapTracker: React.FC<MapTrackerProps> = ({
  driverId,
  fromCoords,
  toCoords,
  driverName,
  requestNumber,
}) => {
  const [driverPositions, setDriverPositions] = useState<DriverPos[]>([]);
  const [routePath, setRoutePath] = useState<L.LatLngTuple[] | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const filteredPositions = filterPositions(driverPositions, 15);
  const lastPos =
    filteredPositions.length > 0 ? filteredPositions.at(-1) : fromCoords;

  useEffect(() => {
    if (!driverId) return;

    const WS_URL =
      (window.location.protocol === "https:" ? "wss://" : "ws://") +
      window.location.hostname +
      ":3001";

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.addEventListener("message", (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "location" && data.driverId === driverId) {
          setDriverPositions((prev) => [
            ...prev,
            { lat: data.lat, lng: data.lng, ts: data.ts },
          ]);
        }
      } catch (e) {
        console.warn("WS parse error:", e);
      }
    });

    return () => ws.close();
  }, [driverId]);

  useEffect(() => {
    if (fromCoords && toCoords) {
      getRoute(
        [fromCoords.lat, fromCoords.lng],
        [toCoords.lat, toCoords.lng]
      ).then(setRoutePath);
    }
  }, [fromCoords, toCoords]);

  if (!driverId) return null;

  const path = filteredPositions.map((p) => [p.lat, p.lng] as L.LatLngTuple);

  const initialCenter: [number, number] = fromCoords
    ? [fromCoords.lat, fromCoords.lng]
    : [0, 0];

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lastPos && (
        <Marker position={[lastPos.lat, lastPos.lng]}>
          <Popup>
            <strong>Водитель:</strong> {driverName} <br />
            <strong>Заявка №</strong> {requestNumber}
          </Popup>
        </Marker>
      )}

      {routePath && <Polyline positions={routePath} color="blue" weight={4} />}

      {path.length > 1 && (
        <Polyline positions={path} color="green" weight={3} />
      )}

      {(path.length > 0 || routePath?.length) && (
        <FitToBounds path={routePath || path} />
      )}
    </MapContainer>
  );
};
