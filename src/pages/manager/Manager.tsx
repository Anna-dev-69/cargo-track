import Header from "../../components/header/Header";
import Request from "../../components/request/Request";
import { useStore } from "../../store";
import { MapTracker } from "../../components/map-tracking/MapTracking";
import { useState } from "react";
import "./Manager.scss";

const Manager = () => {
  const drivers = useStore((s) => s.drivers);
  const [startTracking, setStartTracking] = useState(false);
  const driverName = "Сергей Сергеев";

  const currentDriver = drivers.find((d) => d.name === driverName);

  const activeRequest = currentDriver?.requests.find(
    (req) => req.status === "В пути"
  );

  return (
    <div className="Manager">
      <div className="Manager__container">
        <Header role="Менеджер" />
        <Request onTrack={setStartTracking} />
        {startTracking && (
          <div style={{ width: "800px", height: "500px" }}>
            <MapTracker
              driverId={activeRequest?.driverId || null}
              fromCoords={activeRequest?.fromCoords}
              toCoords={activeRequest?.toCoords}
              driverName={activeRequest?.driverName}
              requestNumber={activeRequest?.number}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
