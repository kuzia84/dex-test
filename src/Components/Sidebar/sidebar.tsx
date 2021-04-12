import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import s from "./style.module.css";
import { ReactComponent as Logout } from "../../shared/icons/logout_rounded.svg";
import { useAppSelector } from "../../core/redux/hooks";
import { User } from "../header/user/user";
import userImg from "../../shared/icons/profile.svg";
import { selectSidebrSate } from "../../core/sidebarStateSlice";
import { MENU } from "./menu";
import { SidebarLink } from "./sidebarLink/sidebarLink";

export const Sidebar: React.FC = () => {
  const sidebarState = useAppSelector(selectSidebrSate);

  const userName: any = localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "John Smith";

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
        to="/"
        onClick={() => {
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
