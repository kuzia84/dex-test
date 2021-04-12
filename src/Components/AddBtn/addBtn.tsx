import { useHistory } from "react-router";

import s from "./style.module.css";

interface IAddBtnProps {
  page: string;
}

export const AddBtn: React.FC<IAddBtnProps> = ({ page }) => {
  const history = useHistory();
  const handleClick = () => {
    page === "teams"
      ? history.push("/teams/new-team")
      : history.push("/players/new-player");
  };
  return (
    <div className={s.addBtn}>
      <button className="btn" onClick={handleClick}>
        Add +
      </button>
    </div>
  );
};
