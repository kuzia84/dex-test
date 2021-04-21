import { Link } from "react-router-dom";
import s from "./style.module.css";

interface IProps {
  path: string;
  name: string;
}

export const BreadCrumbs: React.FC<IProps> = (props) => {
  return (
    <ul className={s.breadcrumbs}>
      <li>
        <Link to={`/${props.path.toLocaleLowerCase()}`}>{props.path}</Link>
      </li>
      <li>{props.name}</li>
    </ul>
  );
};
