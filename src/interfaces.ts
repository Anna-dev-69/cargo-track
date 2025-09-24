import { FileData } from "./store";

export type Role = "Администратор" | "Менеджер" | "Водитель";

export interface IDriver {
  id: string;
  name: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  isTracking?: boolean;
  route?: Array<{ lat: number; lng: number }>;
  requests: IRequestData[];
}
export type Status = "Ожидает" | "В пути" | "Выполнена";

export interface IRequestData {
  id: string;
  number: string;
  from: string;
  to: string;
  driver: string;
  driverId: string;
  driverName: string;
  status: Status;
  fromCoords?: { lat: number; lng: number };
  toCoords?: { lat: number; lng: number };
  files?: FileData[];
}
