import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDriver, IRequestData, Status } from "./interfaces";

export interface FileData {
  name: string;
  content: string | ArrayBuffer | null;
}

interface StoreState {
  requests: IRequestData[];
  drivers: IDriver[];
  addRequestToTable: (newRequest: any) => void;
  updateRequestStatus: (requestNumber: string, newStatus: Status) => void;
  deleteRequest: (number: string) => void;
  deleteCurrentDriverRequest: (number: string, currentDriverId: string) => void;
  files: FileData[];
  addFileToRequest: (file: FileData, requestNumber: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      requests: [],
      drivers: [
        { id: "1", name: "Иван Иванов", requests: [] },
        { id: "2", name: "Пётр Петров", requests: [] },
        { id: "3", name: "Сергей Сергеев", requests: [] },
      ],
      files: [],

      addFileToRequest: (file, requestNumber) =>
        set((state) => ({
          requests: state.requests.map((req) =>
            req.number === requestNumber
              ? { ...req, files: [...(req.files || []), file] }
              : req
          ),
        })),

      addRequestToTable: (newRequest) =>
        set((state) => ({
          requests: [...state.requests, newRequest],
          drivers: state.drivers.map((driver) =>
            driver.id === newRequest.driverId
              ? { ...driver, requests: [...driver.requests, newRequest] }
              : driver
          ),
        })),

      updateRequestStatus: (requestNumber, newStatus) =>
        set((state) => ({
          requests: state.requests.map((req) =>
            req.number === requestNumber ? { ...req, status: newStatus } : req
          ),
          drivers: state.drivers.map((driver) => ({
            ...driver,
            requests: driver.requests.map((req) =>
              req.number === requestNumber ? { ...req, status: newStatus } : req
            ),
          })),
        })),

      deleteRequest: (number) =>
        set((state) => ({
          requests: state.requests.filter((req) => req.number !== number),
          drivers: state.drivers.map((d) => ({
            ...d,
            requests: d.requests.filter((req) => req.number !== number),
          })),
        })),

      deleteCurrentDriverRequest: (number, currentDriverId) =>
        set((state) => ({
          requests: state.requests.filter((req) => req.number !== number),

          drivers: state.drivers.map((driver) =>
            driver.id === currentDriverId
              ? {
                  ...driver,
                  requests: driver.requests.filter(
                    (req) => req.number !== number
                  ),
                }
              : driver
          ),
        })),
    }),

    {
      name: "requests-storage",
      partialize: (state) => ({
        ...state,
        files: [],
        requests: state.requests.map((req) => ({
          ...req,
          files: [],
        })),
      }),
    }
  )
);
