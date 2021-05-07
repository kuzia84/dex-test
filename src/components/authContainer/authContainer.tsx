import { IAuthContainerProps } from "../../api/dto/components.g";
import s from "./style.module.css";

export const AuthContainer: React.FC<IAuthContainerProps> = (props) => {
  return (
    <div className={s.login__wrapper}>
      <div className={s.container}>
        <div className={s.login__form}>{props.children}</div>
        <div className={s.login__bg}>
          <img src={props.img} alt="" />
        </div>
      </div>
    </div>
  );
};
