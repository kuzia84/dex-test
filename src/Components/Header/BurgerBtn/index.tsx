import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectSidebrSate,
  setSidebrSate,
} from "../../../store/sidebarStateSlise";
import s from "./style.module.css";

const BurgerBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector(selectSidebrSate);
  const handleClick = () => {
    dispatch(setSidebrSate(!sidebarState));
  };
  return (
    <div className={s.wrapper}>
      <button className={s.burger} onClick={handleClick}></button>
    </div>
  );
};

export default BurgerBtn;
