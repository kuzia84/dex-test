import { AuthContainer } from "../../components/authContainer/authContainer";
import { SignInForm } from "./components/signInForm";
import signInBg from "../../assets/img/sign-in-bg.svg";

export const SignIn: React.FC = () => {
  return (
    <AuthContainer img={signInBg}>
      <SignInForm />
    </AuthContainer>
  );
};
