import s from "./style.module.css";

interface IUser {
  userName: string;
  userImg: string;
}
export const User: React.FC<IUser> = ({ userName, userImg }) => {
  return (
    <div className={s.user}>
      <div className={s.userName}>{userName}</div>
      <img className={s.userImg} src={userImg} alt={userName} />
    </div>
  );
};
