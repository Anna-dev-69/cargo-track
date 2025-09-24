import { Button, Form, Table } from "antd";
import "./Request.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import AssignDriverModal from "../modal/Modal";
import { useStore } from "../../store";
import { getColumns } from "./data";

interface RequestProps {
  onTrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Request: React.FC<RequestProps> = ({ onTrack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const requests = useStore((s) => s.requests);
  const drivers = useStore((s) => s.drivers);

  const [form] = Form.useForm();

  const handleChange = (value: { id: string; name: string }) => {
    setSelectedDriver(value);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const selectedDriver = drivers.find(
          (driver) => driver.id === values.driver
        );

        const requestWithStatus = {
          ...values,
          driverId: values.driver,
          driverName: selectedDriver ? selectedDriver.name : "",
          status: "назначена",
        };

        useStore.getState().addRequestToTable(requestWithStatus);
        setIsModalOpen(false);

        form.resetFields();
      })
      .catch((e) => {
        console.log("Ошибка:", e);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTrack = () => {
    onTrack(true);
  };

  return (
    <div className="Request">
      <div className="Request__container">
        <div className="Request__container-btn">
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            Создать заявку
          </Button>
        </div>
        <Table
          className="Request__table"
          dataSource={requests}
          columns={getColumns(handleTrack)}
        />
      </div>

      <AssignDriverModal
        form={form}
        selectedDriver={selectedDriver}
        drivers={drivers}
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        onChange={handleChange}
        onOk={handleOk}
      />
    </div>
  );
};

export default Request;
