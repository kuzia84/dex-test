import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/hooks";
import s from "./style.module.css";
import cn from "classnames";
import { PlayerDto, playersRequestType } from "../../../../api/dto/player.g";
import { selectPlayersData } from "../../../../modules/player/playerSelector";
import { fetchPlayersAsync } from "../../../../modules/player/playerThunk";
import { getPlayersRequest } from "../../../../api/urls";
import { baseUrl } from "../../../../api/requests/baseRequest";

interface ITeamRosterProps {
  teamId: number;
}

export const TeamRoster: React.FC<ITeamRosterProps> = ({ teamId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const playersRequest: playersRequestType = {
      requesrUrl: getPlayersRequest,
      searchText: "",
      teamIds: `&TeamIds=${String(teamId)}`,
      pageNumber: 1,
      pageSize: 6,
    };
    dispatch(fetchPlayersAsync(playersRequest));
  }, [dispatch, teamId]);

  const playersRedux = useAppSelector(selectPlayersData);
  const players = playersRedux.data;

  return (
    <div className={s.roster}>
      {players.length === 0 ? (
        <h3 className={s.empty}>No players in roster</h3>
      ) : (
        <div className={s.wrapper}>
          <ul className={s.list}>
            <li className={cn(s.item, s.title)}>Roster</li>
            <li className={cn(s.item, s.legend)}>
              <div className={s.number}>#</div>
              <div className={s.player}>Player</div>
              <div className={s.height}>Height</div>
              <div className={s.weight}>Weight</div>
              <div className={s.age}>Age</div>
            </li>
            {players.map((item: PlayerDto) => (
              <li className={s.item} key={item.id}>
                <div className={s.number}>{item.number}</div>
                <div className={s.player}>
                  <div className={s.avatar}>
                    <img src={baseUrl + item.avatarUrl} alt={item.name} />
                  </div>
                  <div className={s.information}>
                    <div className={s.name}>{item.name}</div>
                    <div className={s.position}>{item.position}</div>
                  </div>
                </div>
                <div className={s.height}>{item.height}</div>
                <div className={s.weight}>{item.weight}</div>
                <div className={s.age}>
                  {item.birthday &&
                    Math.floor(
                      (Date.now() - Date.parse(item.birthday)) / 31536000000
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
