import Header from "../components/header/Header";
import { useStore } from "../store";
import DriverRequests from "../components/driver-requests/DriverRequests";

const Driver = () => {
  const drivers = useStore((s) => s.drivers);
  const driverName = "Сергей Сергеев";

  const currentDriver = drivers.find((d) => d.name === driverName);

  return (
    <div
      style={{
        width: "1200px",
      }}
    >
      <Header role="Водитель" />
      <DriverRequests currentDriver={currentDriver} />
    </div>
  );
};

export default Driver;
