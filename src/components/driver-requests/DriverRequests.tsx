import "./DriverRequests.scss";
import { useStore } from "../../store";
import DocumentUpload from "../document-upload/DocumentUpload";
import { IDriver } from "../../interfaces";

interface DriverRequestsProps {
  currentDriver: IDriver | undefined;
}

const DriverRequests: React.FC<DriverRequestsProps> = ({ currentDriver }) => {
  return (
    <div className="DriverRequests">
      <div className="DriverRequests__container">
        <h2>Все заявки</h2>
        <p className="DriverRequests__subtitle">
          Ваши текущие и новые задания по перевозкам
        </p>
        <div className="DriverRequests__container-request">
          {currentDriver?.requests.map((req) => (
            <div key={req.number} className="DriverRequests__requests">
              <div className="DriverRequests__request">
                <h4>Заявка № {req.number}</h4>
                <div className="DriverRequests__route">
                  {req.from} → {req.to}{" "}
                </div>
                <p
                  className="DriverRequests__status"
                  style={
                    req.status === "В пути"
                      ? { color: "green", borderColor: "green" }
                      : { color: "orange", borderColor: "orange" }
                  }
                >
                  {req.status}
                </p>

                <DocumentUpload requestNumber={req.number} />
                <div className="DriverRequests__container-btn">
                  <button
                    className="DriverRequests__btn"
                    onClick={() =>
                      useStore
                        .getState()
                        .updateRequestStatus(req.number, "В пути")
                    }
                  >
                    {req.status.trim() === "В пути"
                      ? "В работе"
                      : "Взять в работу"}
                  </button>
                  <button
                    className="DriverRequests__btn-danger"
                    onClick={() =>
                      useStore
                        .getState()
                        .deleteCurrentDriverRequest(req.number, req.driverId)
                    }
                  >
                    Выполнена
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverRequests;
