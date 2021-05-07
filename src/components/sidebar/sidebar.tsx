import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import s from "./style.module.css";
import { ReactComponent as Logout } from "../../assets/icons/logout_rounded.svg";
import { useAppSelector } from "../../core/redux/hooks";
import { User } from "../header/user/user";
import userImg from "../../assets/icons/profile.svg";
import { MENU } from "./menu";
import { SidebarLink } from "./sidebarLink/sidebarLink";
import { selectSidebrSate } from "../../modules/app/appSelect";
// import { resetAuth } from "../../modules/autorization/authSlice";
import { homeLnk } from "../../pages/routes";

export const Sidebar: React.FC = () => {
  const sidebarState = useAppSelector(selectSidebrSate);

  const savedName = localStorage.getItem("userName");
  const userName =
    savedName && savedName !== "string" ? savedName : "John Smith";

  const menuList = MENU.map(({ id, to, img, name }) => (
    <SidebarLink key={id} id={id} to={to} img={img} name={name} />
  ));

  return (
    <aside className={cn(s.sidebar, { [s.active]: sidebarState })}>
      <div className={s.user}>
        <User userName={userName} userImg={userImg} />
      </div>
      <nav className={s.sidebarNav}>
        <ul>{menuList}</ul>
      </nav>
      <Link
        className={s.logout}
        to={homeLnk}
        onClick={() => {
          // dispach(resetAuth);
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
        }}
      >
        <Logout />
        <div>Sign out</div>
      </Link>
    </aside>
  );
};
