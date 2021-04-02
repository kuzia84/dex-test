import { SelectSinglePlayerData } from "../../store/getPlayerSlice";
import { useAppSelector } from "../../store/hooks";

import s from "./style.module.css";

export const PlayerInfo: React.FC = () => {
  const singlePlayer = useAppSelector(SelectSinglePlayerData);

  return (
    <>
      <div className={s.photo}>
        <img src={singlePlayer.avatarUrl} alt={singlePlayer.name} />
      </div>
      <div className={s.info}>
        <div className={s.title}>
          {singlePlayer.name}{" "}
          <span className={s.number}>#{singlePlayer.number}</span>
        </div>
        <ul className={s.list}>
          <li>
            <p className={s.name}>Position</p>
            <span className={s.desc}>{singlePlayer.position}</span>
          </li>
          <li>
            <p className={s.name}>Team</p>
            <span className={s.desc}>{singlePlayer.teamName}</span>
          </li>
          <li>
            <p className={s.name}>Height</p>
            <span className={s.desc}>{singlePlayer.height} cm</span>
          </li>
          <li>
            <p className={s.name}>Weight</p>
            <span className={s.desc}>{singlePlayer.weight} kg</span>
          </li>
          <li>
            <p className={s.name}>Age</p>
            <span className={s.desc}>
              {Math.floor(
                (Date.now() - Date.parse(singlePlayer.birthday)) / 31536000000
              )}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
