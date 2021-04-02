import { SignInForm } from "../../Components/SignInForm/signInForm";
import signInBg from "../../img/sign-in-bg.svg";

export const SignIn: React.FC = () => {
  return (
    <div className="login__wrapper">
      <div className="container">
        <div className="login__form">
          <SignInForm />
        </div>
        <div className="login__bg">
          <img src={signInBg} alt="" />
        </div>
      </div>
    </div>
  );
};
