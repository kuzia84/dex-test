import { ReactComponent as Pen } from "../../img/create.svg";
import { ReactComponent as Delete } from "../../img/delete.svg";
import { fetchDeleteItemById } from "../../store/deleteItemById";
import { silectSideMenuId } from "../../store/sideMenuSlise";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import s from "./style.module.css";
import { useHistory } from "react-router";

interface IProps {
  itemId: number;
}

const ControlButtons: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPageId = useAppSelector(silectSideMenuId);
  let deleteRequest = "";
  if (currentPageId === 2) {
    deleteRequest = `http://dev.trainee.dex-it.ru/api/Player/Delete?id=${props.itemId}`;
  } else if (currentPageId === 1) {
    deleteRequest = `http://dev.trainee.dex-it.ru/api/Team/Delete?id=${props.itemId}`;
  }

  const handleDeleteButton = () => {
    if (window.confirm("Confirm Delete")) {
      dispatch(fetchDeleteItemById(deleteRequest));
      if (currentPageId === 2) {
        history.push("/players");
      } else if (currentPageId === 1) {
        history.push("/teams");
      }
    } else alert("Canceled");
  };

  const handleUpdateButton = () => {
    if (currentPageId === 2) {
      history.push("/new-player");
    } else if (currentPageId === 1) {
      history.push("/new-team");
    }
  };

  return (
    <div className={s.buttons}>
      <button>
        <Pen onClick={handleUpdateButton} />
      </button>
      <button>
        <Delete onClick={handleDeleteButton} />
      </button>
    </div>
  );
};

export default ControlButtons;
