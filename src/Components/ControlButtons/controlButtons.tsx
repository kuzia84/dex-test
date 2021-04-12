import { ReactComponent as Pen } from "../../shared/icons/create.svg";
import { ReactComponent as Delete } from "../../shared/icons/delete.svg";
import { fetchDeleteItemById } from "../../core/deleteItemById";
import { useAppDispatch } from "../../core/redux/hooks";
import s from "./style.module.css";
import { useHistory } from "react-router";

interface IControlButtonsProps {
  itemId: number;
  page: string;
}

export const ControlButtons: React.FC<IControlButtonsProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage = props.page;
  let deleteRequest = "";
  if (currentPage === "players") {
    deleteRequest = `http://dev.trainee.dex-it.ru/api/Player/Delete?id=${props.itemId}`;
  } else if (currentPage === "teams") {
    deleteRequest = `http://dev.trainee.dex-it.ru/api/Team/Delete?id=${props.itemId}`;
  }

  const handleDeleteButton = () => {
    if (window.confirm("Confirm Delete")) {
      dispatch(fetchDeleteItemById(deleteRequest));
      if (currentPage === "players") {
        history.push("/players");
      } else if (currentPage === "teams") {
        history.push("/teams");
      }
    } else alert("Canceled");
  };

  const handleUpdateButton = () => {
    if (currentPage === "players") {
      history.push(`/players/new-player?id=${props.itemId}`);
    } else if (currentPage === "teams") {
      history.push(`/teams/new-team?id=${props.itemId}`);
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
