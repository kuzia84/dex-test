import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  fetchTeamsAsync,
  reset,
  selectTeamsData,
  selectTeamsIsLoading,
} from "../../core/getTeamsSlice";
import { PlayerDto } from "../../api/dto/player.g";
import s from "./style.module.css";
import { getTeamsRequest } from "../../api/requests/team";

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
    dispatch(reset());
    dispatch(fetchTeamsAsync(getTeamsRequest));
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
          <img src={avatarUrl} alt={name} />
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
