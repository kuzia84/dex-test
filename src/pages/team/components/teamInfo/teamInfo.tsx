import { useAppSelector } from "../../../../core/redux/hooks";
import { selectSingleTeamData } from "../../../../modules/team/teamSelector";

import s from "./style.module.css";

export const TeamInfo: React.FC = () => {
  const singleTeam = useAppSelector(selectSingleTeamData);

  return (
    <>
      <div className={s.photo}>
        <img
          src={"http://dev.trainee.dex-it.ru" + singleTeam.imageUrl}
          alt={singleTeam.name}
        />
      </div>
      <div className={s.info}>
        <div className={s.title}>{singleTeam.name}</div>
        <ul className={s.list}>
          <li>
            <p className={s.name}>Year of foundation</p>
            <span className={s.desc}>{singleTeam.foundationYear}</span>
          </li>
          <li>
            <p className={s.name}>Division</p>
            <span className={s.desc}>{singleTeam.division}</span>
          </li>
          <li>
            <p className={s.name}>Conference</p>
            <span className={s.desc}>{singleTeam.conference}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
