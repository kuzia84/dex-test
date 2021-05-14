import { ReactComponent as Pen } from "../../assets/icons/create.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { useAppDispatch } from "../../core/redux/hooks";
import s from "./style.module.css";
import { useHistory } from "react-router";
import { deletePlayerRequest, deleteTeamRequest } from "../../api/urls";
import { fetchDeleteItemById } from "../../modules/app/appThunk";
import { IControlButtonsProps } from "../../api/dto/components.g";
import {
  newPlayerLnk,
  newTeamLnk,
  playersLnk,
  teamsLnk,
} from "../../pages/routes";

export const ControlButtons: React.FC<IControlButtonsProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage = props.page;
  let deleteRequest = "";
  if (currentPage === "players") {
    deleteRequest = deletePlayerRequest + props.itemId;
  } else if (currentPage === "teams") {
    deleteRequest = deleteTeamRequest + props.itemId;
  }

  const handleDeleteButton = () => {
    if (window.confirm("Confirm Delete")) {
      dispatch(fetchDeleteItemById(deleteRequest));
      if (currentPage === "players") {
        history.push(playersLnk);
      }
      if (currentPage === "teams") {
        history.push(teamsLnk);
      }
    } else alert("Canceled");
  };

  const handleUpdateButton = () => {
    if (currentPage === "players") {
      history.push(`${newPlayerLnk}?id=${props.itemId}`);
    }
    if (currentPage === "teams") {
      history.push(`${newTeamLnk}?id=${props.itemId}`);
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
