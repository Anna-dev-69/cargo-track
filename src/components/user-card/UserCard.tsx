import { Button } from "antd";
import "./UserCard.scss";

interface UserCardProps {
  role: "admin" | "manager" | "driver";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}
const UserCard: React.FC<UserCardProps> = ({
  role,
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div className="UserCard">
      <div className="UserCard__icon-container">{icon}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>

      <Button onClick={onClick} className="UserCard__btn">
        Войти как {title}
      </Button>
    </div>
  );
};

export default UserCard;
