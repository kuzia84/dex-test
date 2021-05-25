import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import { PlayerDto } from "../../../api/dto/player.g";
import s from "./style.module.css";
import { getTeamsRequest } from "../../../api/urls";
import { fetchTeamsAsync } from "../../../modules/team/teamThunk";
import {
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../../modules/team/teamSelector";
import { teamsRequestType } from "../../../api/dto/team.g";

export const PlayerCard: React.FC<PlayerDto> = ({
  name,
  number,
  team,
  avatarUrl,
  onClick,
  id,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const teamsRequest: teamsRequestType = {
      requesrUrl: getTeamsRequest,
      searchText: "",
      pageNumber: 1,
      pageSize: 6,
    };
    dispatch(fetchTeamsAsync(teamsRequest));
  }, [dispatch]);
  const teamsRedux = useAppSelector(selectTeamsData);
  const teamsIsLoading = useAppSelector(selectTeamsIsLoading);
  const teams = teamsRedux.data;

  const handlePlayerClick = () => {
    onClick && onClick(id);
  };

  return (
    <div className={s.player}>
      <div className={s.player__wrapper} onClick={handlePlayerClick}>
        <div className={s.player__logo}>
          <img src={"http://dev.trainee.dex-it.ru" + avatarUrl} alt={name} />
        </div>
        <div className={s.player__info}>
          <div className={s.player__name}>
            {name} <span className={s.player__number}>#{number}</span>
          </div>
          <div className={s.player__team}>
            {teamsIsLoading === true
              ? "Loading..."
              : teams.filter((item) => item.id === team)[0]?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
