import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { ILoginRequest, ISignInInputs } from "../../Interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSignIn, selectSignInError } from "../../store/signInSlice";
import { InputGroup } from "../InputGroup/iInputGroup";
import s from "./style.module.css";

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useForm<ISignInInputs>();
  const signInError = useAppSelector(selectSignInError);
  const history = useHistory();

  const onSubmit = (data: ILoginRequest) => {
    dispatch(fetchSignIn(data));
    if (!signInError) {
      history.push("/teams");
    } else {
      console.log("signInError: ", signInError);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.formTitle}>Sign In</h1>
      <InputGroup
        label="Login"
        inputName="login"
        errorText="Enter login"
        register={register}
        // required
        errors={errors}
      />
      <InputGroup
        type="password"
        label="Password"
        inputName="password"
        errorText="Enter password"
        register={register}
        // required
        errors={errors}
      />
      <button className="btn">Sign In</button>
      <div className={s.signUpLnk}>
        Not a member yet? <Link to="/sign-up">Sign up</Link>
      </div>
    </form>
  );
};
