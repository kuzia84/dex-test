import { NavLink } from "react-router-dom";
import { IMenu } from "../../../api/dto/components.g";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import { selectSidebrSate } from "../../../modules/app/appSelect";
import { setSidebrSate } from "../../../modules/app/appSlice";
import s from "./style.module.css";

export const SidebarLink: React.FC<IMenu> = (props) => {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector(selectSidebrSate);
  return (
    <li>
      <NavLink
        to={props.to}
        className={s.navLink}
        activeClassName={s.active}
        onClick={() => {
          dispatch(setSidebrSate(!sidebarState));
        }}
      >
        <props.img />
        <div>{props.name}</div>
      </NavLink>
    </li>
  );
};
