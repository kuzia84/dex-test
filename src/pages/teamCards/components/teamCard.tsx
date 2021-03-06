import { TeamDto } from "../../../api/dto/team.g";
import { baseUrl } from "../../../api/requests/baseRequest";
import s from "./style.module.css";

export const TeamCard: React.FC<TeamDto> = ({
  id,
  name,
  imageUrl,
  foundationYear,
  onClick,
}) => {
  const handleTeamClick = () => {
    onClick && onClick(id);
  };
  return (
    <div className={s.team} onClick={handleTeamClick}>
      <div className={s.team__wrapper}>
        <div className={s.team__logo}>
          <img src={baseUrl + imageUrl} alt={name} />
        </div>
        <div className={s.team__info}>
          <div className={s.team__name}>{name}</div>
          <div className={s.team__foundation}>
            Year of foundation: {foundationYear}
          </div>
        </div>
      </div>
    </div>
  );
};
