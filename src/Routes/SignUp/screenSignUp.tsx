import { SignUpForm } from "../../Components/SignUpForm/signUpForm";
import signUpBg from "../../img/sign-up-bg.svg";

export const SignUp: React.FC = () => {
  return (
    <div className="login__wrapper">
      <div className="container">
        <div className="login__form">
          <SignUpForm />
        </div>
        <div className="login__bg">
          <img src={signUpBg} alt="" />
        </div>
      </div>
    </div>
  );
};
