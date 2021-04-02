import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetId } from "../../store/selectedIdSlice";

import { silectSideMenuId } from "../../store/sideMenuSlice";
import s from "./style.module.css";

export const AddBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPageId = useAppSelector(silectSideMenuId);

  const history = useHistory();
  const handleClick = () => {
    dispatch(resetId());
    currentPageId === 1
      ? history.push("/new-team")
      : history.push("/new-player");
  };
  return (
    <div className={s.addBtn}>
      <button className="btn" onClick={handleClick}>
        Add +
      </button>
    </div>
  );
};
