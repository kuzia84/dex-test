import { useHistory } from "react-router";
import { useAppDispatch } from "../../core/redux/hooks";
import { onePlayerReset } from "../../modules/player/playerSlice";
import { oneTeamReset } from "../../modules/team/teamSlice";
import { newPlayerLnk, newTeamLnk } from "../../pages/routes";
import { Button } from "../button/button";

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
      history.push(newTeamLnk);
    }
    if (page === "players") {
      dispach(onePlayerReset());
      history.push(newPlayerLnk);
    }
  };
  return (
    <div className={s.addBtn}>
      <Button handleClick={handleClick}>Add +</Button>
    </div>
  );
};
