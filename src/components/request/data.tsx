import { Button, Tag } from "antd";
import { useStore } from "../../store";
import { ColumnsType } from "antd/es/table";
import { IRequestData } from "../../interfaces";

export const dataSource = [
  {
    key: "1",
    number: "001",
    from: "Москва",
    to: "Санкт-Петербург",
    driver: "Иван Иванов",
    status: "В пути",
  },
  {
    key: "2",
    number: "002",
    from: "Казань",
    to: "Нижний Новгород",
    driver: "Пётр Петров",
    status: "Ожидает",
  },
];

export const getColumns = (
  onTrack: (request: IRequestData) => void
): ColumnsType<IRequestData> => [
  { title: "Номер", dataIndex: "number", key: "number" },
  { title: "Откуда", dataIndex: "from", key: "from" },
  { title: "Куда", dataIndex: "to", key: "to" },
  { title: "Водитель", dataIndex: "driverName", key: "driver" },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status: any) => {
      let color = status === "В пути" ? "green" : "orange";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Действия",
    key: "actions",
    render: (_: any, record: IRequestData) => (
      <>
        <Button
          type="link"
          onClick={() => useStore.getState().deleteRequest(record.number)}
        >
          Удалить заявку
        </Button>
        {record.status === "В пути" && (
          <Button type="link" onClick={() => onTrack(record)}>
            Начать отслеживание
          </Button>
        )}
      </>
    ),
  },
];
