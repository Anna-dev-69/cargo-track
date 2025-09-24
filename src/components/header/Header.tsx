import { Role } from "../../interfaces";
import { UserOutlined } from "@ant-design/icons";
import "./Header.scss";

interface HeaderProps {
  role: Role;
}

const Header: React.FC<HeaderProps> = ({ role }) => {
  return (
    <div className="Header">
      <div className="Header__container">
        <h1>Грузоперевозки</h1>

        <div className="Header__user">
          <p className="Header__role">{role}</p>

          <div className="Header__container-icon">
            <UserOutlined
              style={{ fontSize: "24px", color: "rgba(236, 240, 241, 1)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
