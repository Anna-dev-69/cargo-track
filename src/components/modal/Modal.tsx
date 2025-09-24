import { Form, FormInstance, Input, Modal, Select } from "antd";
const { Option } = Select;

interface AssignDriverModalProps {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  onChange: (value: { id: string; name: string }) => void;
  selectedDriver: {
    id: string;
    name: string;
  } | null;
  drivers: {
    id: string;
    name: string;
  }[];
  form: FormInstance<any>;
}

const AssignDriverModal: React.FC<AssignDriverModalProps> = ({
  isModalOpen,
  onOk,
  onCancel,
  onChange,
  selectedDriver,
  drivers,
  form,
}) => {
  async function geocode(city: string) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        city
      )}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  }

  return (
    <Modal
      open={isModalOpen}
      title="Назначение водителя"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Номер"
          name="number"
          rules={[{ required: true, message: "Введите номер" }]}
        >
          <Input placeholder="Введите номер" />
        </Form.Item>

        <Form.Item
          label="Откуда"
          name="from"
          rules={[{ required: true, message: "Введите место отправления" }]}
        >
          <Input
            placeholder="Откуда"
            onBlur={async (e) => {
              const coords = await geocode(e.target.value);

              if (coords) {
                form.setFieldsValue({ fromCoords: coords });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Куда"
          name="to"
          rules={[{ required: true, message: "Введите место назначения" }]}
        >
          <Input
            placeholder="Куда"
            onBlur={async (e) => {
              const coords = await geocode(e.target.value);

              if (coords) {
                form.setFieldsValue({ toCoords: coords });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Водитель"
          name="driver"
          rules={[{ required: true, message: "Выберите водителя" }]}
        >
          <Select placeholder="Выберите водителя">
            {drivers.map((driver) => (
              <Option key={driver.id} value={driver.id}>
                {driver.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="fromCoords" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="toCoords" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignDriverModal;
