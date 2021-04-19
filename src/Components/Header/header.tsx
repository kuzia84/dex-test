import { Link } from "react-router-dom";
import { User } from "./user/user";
import { BurgerBtn } from "./burgerBtn/burgerBtn";
import Logo from "../../assets/img/logo.png";
import userImg from "../../assets/icons/profile.svg";
import s from "./style.module.css";

export const Header: React.FC = () => {
  const savedName = localStorage.getItem("userName");
  const userName =
    savedName && savedName !== "string" ? savedName : "John Smith";
  return (
    <header className={s.header}>
      <BurgerBtn />
      <Link to="/" className={s.logo}>
        <img src={Logo} alt="" />
      </Link>
      <div className={s.user}>
        <User userName={userName} userImg={userImg} />
      </div>
    </header>
  );
};
