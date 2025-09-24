import { useMap } from "react-leaflet";
import { DriverPos } from "./MapTracking";
import * as L from "leaflet";
import { useEffect } from "react";

async function getRoute(from: L.LatLngExpression, to: L.LatLngExpression) {
  const fromTuple: L.LatLngTuple = Array.isArray(from)
    ? from
    : [from.lat, from.lng];
  const toTuple: L.LatLngTuple = Array.isArray(to) ? to : [to.lat, to.lng];

  const coords = `${fromTuple[1]},${fromTuple[0]};${toTuple[1]},${toTuple[0]}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === "Ok") {
      return data.routes[0].geometry.coordinates.map(
        (c: number[]) => [c[1], c[0]] as L.LatLngTuple
      );
    }
  } catch (e) {
    console.error("OSRM route error:", e);
  }
  return null;
}

export default getRoute;

export function filterPositions(
  positions: DriverPos[],
  minDistance = 15
): DriverPos[] {
  if (positions.length <= 1) return positions;

  const filtered = [positions[0]];
  for (let i = 1; i < positions.length; i++) {
    const prev = filtered[filtered.length - 1];
    const curr = positions[i];

    const distance = L.latLng(prev.lat, prev.lng).distanceTo(
      L.latLng(curr.lat, curr.lng)
    );

    if (distance >= minDistance) {
      filtered.push(curr);
    }
  }
  return filtered;
}

export function FitToBounds({ path }: { path: L.LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (path.length > 1) {
      map.fitBounds(path, { padding: [50, 50] });
    } else if (path.length === 1) {
      map.setView(path[0], 13);
    }
  }, [path, map]);
  return null;
}
