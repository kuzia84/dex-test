import { AuthContainer } from "../../components/authContainer/authContainer";
import { SignUpForm } from "./components/signUpForm";
import signUpBg from "../../assets/img/sign-up-bg.svg";

export const SignUp: React.FC = () => {
  return (
    <AuthContainer img={signUpBg}>
      <SignUpForm />
    </AuthContainer>
  );
};
