import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../Checkbox";
import Input from "../Input";
import s from "./style.module.css";

interface IForm {
  onSubmit: (props: {
    userName: string;
    login: string;
    password: string;
  }) => void;
}

const SignUpForm: React.FC<IForm> = (props) => {
  const [login, setLogin] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ userName, login, password });
    setUserName("");
    setLogin("");
    setPassword("");
    setPassword2("");
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <h1 className={s.formTitle}>Sign Up</h1>
      <Input
        label="Name"
        name="name"
        value={userName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUserName(event.target.value)
        }
      />
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
      <Input
        label="Enter your password again"
        name="password2"
        type="password"
        value={password2}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword2(event.target.value)
        }
      />
      <Checkbox name="agreement" label="I accept the agreement" />
      <button className="btn">Sign Up</button>
      <div className={s.signUpLnk}>
        Already a member? <Link to="/sign-in">Sign in</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
