import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import s from "./style.module.css";
import User from "./User";
import userImg from "../../img/profile.svg";
import BurgerBtn from "./BurgerBtn";

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <BurgerBtn />
      <Link to="/" className={s.logo}>
        <img src={Logo} alt="" />
      </Link>
      <div className={s.user}>
        <User userName="John Smith" userImg={userImg} />
      </div>
    </header>
  );
};

export default Header;
