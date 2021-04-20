import { useHistory } from "react-router";
import { useAppDispatch } from "../../core/redux/hooks";
import { onePlayerReset } from "../../modules/player/playerSlice";
import { oneTeamReset } from "../../modules/team/teamSlice";

import s from "./style.module.css";

interface IAddBtnProps {
  page: string;
}

export const AddBtn: React.FC<IAddBtnProps> = ({ page }) => {
  const dispach = useAppDispatch();
  const history = useHistory();
  const handleClick = () => {
    if (page === "teams") {
      dispach(oneTeamReset());
      history.push("/teams/new-team");
    }
    if (page === "players") {
      dispach(onePlayerReset());
      history.push("/players/new-player");
    }
  };
  return (
    <div className={s.addBtn}>
      <button className="btn" onClick={handleClick}>
        Add +
      </button>
    </div>
  );
};
