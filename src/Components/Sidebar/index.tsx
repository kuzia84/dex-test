import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import s from "./style.module.css";
import { ReactComponent as Logout } from "../../img/logout_rounded.svg";
import { ReactComponent as TeamsImg } from "../../img/group_person_rounded.svg";
import { ReactComponent as PlayersImg } from "../../img/person_rounded.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { silectSideMenuId, setMenuId } from "../../store/sideMenuSlise";
import { IMenu } from "../../Interfaces";
import User from "../Header/User";
import userImg from "../../img/profile.svg";
import { selectSidebrSate, setSidebrSate } from "../../store/sidebarStateSlise";

const Sidebar: React.FC = () => {
  const MENU: IMenu[] = [
    {
      id: 1,
      name: "Teams",
      img: TeamsImg,
      active: false,
      to: "/teams",
    },
    {
      id: 2,
      name: "Players",
      img: PlayersImg,
      active: false,
      to: "/players",
    },
  ];

  const [menu, setMenu] = useState(MENU);

  const dispatch = useAppDispatch();
  const menuId = useAppSelector(silectSideMenuId);
  const newMenu = menu.map((item) => {
    item.id === menuId ? (item.active = true) : (item.active = false);
    return item;
  });
  const sidebarState = useAppSelector(selectSidebrSate);

  const handleClick = (linkId: number) => {
    dispatch(setMenuId(linkId));
    setMenu(newMenu);
    dispatch(setSidebrSate(!sidebarState));
  };

  useEffect(() => {
    setMenu(newMenu);
  }, []);

  return (
    <aside className={cn(s.sidebar, { [s.active]: sidebarState })}>
      <div className={s.user}>
        <User userName="John Smith" userImg={userImg} />
      </div>
      <nav className={s.sidebarNav}>
        <ul>
          {menu &&
            menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={cn(s.navLink, { [s.active]: item.active })}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <item.img />
                  <div>{item.name}</div>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <Link className={s.logout} to="/">
        <Logout />
        <div>Sign out</div>
      </Link>
    </aside>
  );
};

export default Sidebar;
