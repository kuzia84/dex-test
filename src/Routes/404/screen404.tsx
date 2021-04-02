import { ReactComponent as Image404 } from "../../img/404.svg";
import s from "./style.module.css";

export const PageNotFound: React.FC = () => {
  return (
    <div className={s.page404}>
      <Image404 className={s.image} />
      <h3 className={s.title}>Page not found</h3>
      <p className={s.text}>Sorry, we can’t find what you’re looking for</p>
    </div>
  );
};
