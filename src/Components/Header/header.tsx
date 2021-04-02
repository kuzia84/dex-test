import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import s from "./style.module.css";
import { User } from "./User/user";
import userImg from "../../img/profile.svg";
import { BurgerBtn } from "./BurgerBtn/burgerBtn";

export const Header: React.FC = () => {
  const userName: any = localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "John Smith";
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
