import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import s from "./style.module.css";

interface IForm {
  onSubmit: (props: { login: string; password: string }) => void;
}

const SignInForm: React.FC<IForm> = (props) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ login, password });
    setLogin("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <h1 className={s.formTitle}>Sign In</h1>
      <Input
        label="Login"
        name="login"
        value={login}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setLogin(event.target.value)
        }
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
      <button className="btn">Sign In</button>
      <div className={s.signUpLnk}>
        Not a member yet? <Link to="/sign-up">Sign up</Link>
      </div>
    </form>
  );
};

export default SignInForm;
