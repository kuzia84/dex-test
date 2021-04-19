import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { ILoginRequest, ISignInInputs } from "../../api/dto/autorization.g";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import {
  selectSignInIsLoading,
  selectSignInResult,
} from "../../modules/autorization/athSelect";
import { fetchSignIn } from "../../modules/autorization/authThunk";
import { InputGroup } from "../inputGroup/iInputGroup";
import s from "./style.module.css";

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useForm<ISignInInputs>();
  const signInIsLoading = useAppSelector(selectSignInIsLoading);
  const singInResult = useAppSelector(selectSignInResult);
  const history = useHistory();

  const onSubmit = (data: ILoginRequest) => {
    dispatch(fetchSignIn(data));
  };
  useEffect(() => {
    if (signInIsLoading === false && singInResult.token) {
      console.log("signIn");
      history.push("/teams");
    } else {
      console.log(singInResult);
    }
  }, [signInIsLoading, singInResult.token]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.formTitle}>Sign In</h1>
      <InputGroup
        label="Login"
        inputName="login"
        errorText="Enter login"
        register={register}
        required
        errors={errors}
      />
      <InputGroup
        type="password"
        label="Password"
        inputName="password"
        errorText="Enter password"
        register={register}
        required
        errors={errors}
      />
      <button className="btn">Sign In</button>
      <div className={s.signUpLnk}>
        Not a member yet? <Link to="/sign-up">Sign up</Link>
      </div>
    </form>
  );
};
