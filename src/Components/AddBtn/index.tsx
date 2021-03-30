import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetId } from "../../store/selectedIdSlise";

import { silectSideMenuId } from "../../store/sideMenuSlise";
import s from "./style.module.css";

const AddBtn: React.FC = () => {
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

export default AddBtn;
