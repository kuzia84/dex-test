import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { ILoginRequest, ISignInInputs } from "../../../api/dto/autorization.g";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import { selectSignInResult } from "../../../modules/autorization/authSelect";
import { fetchSignIn } from "../../../modules/autorization/authThunk";
import { signUpLnk, teamsLnk } from "../../routes";
import { InputGroup } from "../../../components/inputGroup/iInputGroup";
import s from "./style.module.css";
import { Button } from "../../../components/button/button";

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useForm<ISignInInputs>();
  const singInResult = useAppSelector(selectSignInResult);
  const history = useHistory();
  const onSubmit = (data: ILoginRequest) => {
    dispatch(fetchSignIn(data));
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      // console.log("signIn");
      history.push(teamsLnk);
    } else {
      console.log(singInResult);
    }
  }, [token, singInResult, history]);

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
      <Button>Sign In</Button>
      <div className={s.signUpLnk}>
        Not a member yet? <Link to={signUpLnk}>Sign up</Link>
      </div>
    </form>
  );
};
