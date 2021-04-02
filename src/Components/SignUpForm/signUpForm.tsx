import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  ISignUpInputs,
  ISignUpRequest,
  ISignUpData,
} from "../../Interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSignUpError } from "../../store/signUpSlice";
import { fetchSignUp } from "../../store/signUpSlice";
import { Checkbox } from "../Checkbox/checkbox";
import { InputGroup } from "../InputGroup/iInputGroup";
import s from "./style.module.css";

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useForm<ISignUpInputs>();
  const signUpError = useAppSelector(selectSignUpError);
  const history = useHistory();

  const onSubmit = (data: ISignUpData) => {
    if (data.password === data.checkPassword) {
      const signUpRequest: ISignUpRequest = {
        userName: data.userName,
        login: data.login,
        password: data.password,
      };

      dispatch(fetchSignUp(signUpRequest));
      if (!signUpError) {
        history.push("/teams");
      } else {
        console.log("signUpError: ", signUpError);
      }
    } else {
      alert("Пароли не совпадают");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.formTitle}>Sign Up</h1>
      <InputGroup
        label="Name"
        inputName="userName"
        errorText="Enter name"
        register={register}
        required
        errors={errors}
      />
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
      <InputGroup
        type="password"
        label="Enter your password again"
        inputName="checkPassword"
        errorText="Enter password"
        register={register}
        required
        errors={errors}
      />
      <Checkbox
        inputName="agreement"
        label="I accept the agreement"
        errorText="Accept the agriment"
        register={register}
        required
        errors={errors}
      />
      <button className="btn">Sign Up</button>
      <div className={s.signUpLnk}>
        Already a member? <Link to="/sign-in">Sign in</Link>
      </div>
    </form>
  );
};
