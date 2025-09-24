import "./Home.scss";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/user-card/UserCard";
import {
  CarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <div className="Home__container">
        <h1>Платформа грузоперевозок</h1>
        <p>Управление логистикой и перевозками в реальном времени</p>
        <p>Для входа выберите вашу роль:</p>

        <div className="Home__container-btn">
          <UserCard
            icon={<TeamOutlined />}
            onClick={() => navigate("/manager")}
            role="manager"
            subtitle="Управление заказами, мониторинг перевозок и аналитика эффективности"
            title="менеджер"
          />
          <UserCard
            icon={<CarOutlined />}
            onClick={() => navigate("/driver")}
            role="driver"
            subtitle="Получение заданий, навигация и отчетность по выполненным перевозкам"
            title="водитель"
          />
          <UserCard
            icon={<SafetyCertificateOutlined />}
            onClick={() => navigate("/admin")}
            role="admin"
            subtitle="Полный контроль над системой, управление пользователями и настройками платформы"
            title="администратор"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
