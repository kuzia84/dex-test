import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  ISignUpInputs,
  ISignUpRequest,
  ISignUpData,
} from "../../../api/dto/autorization.g";
import { useAppDispatch, useAppSelector } from "../../../core/redux/hooks";
import {
  selectSignUpError,
  selectSignUpResult,
} from "../../../modules/autorization/authSelect";
import { fetchSignUp } from "../../../modules/autorization/authThunk";
import { signInLnk, teamsLnk } from "../../routes";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { InputGroup } from "../../../components/inputGroup/iInputGroup";
import s from "./style.module.css";
import { Button } from "../../../components/button/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInputs>();
  const singUpResult = useAppSelector(selectSignUpResult);
  const signUpErrors = useAppSelector(selectSignUpError);
  const history = useHistory();

  const onSubmit = (data: ISignUpData) => {
    if (data.password === data.checkPassword) {
      const signUpRequest: ISignUpRequest = {
        userName: data.userName,
        login: data.login,
        password: data.password,
      };
      dispatch(fetchSignUp(signUpRequest));
    } else {
      toast.error("Passwords are not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      toast.success(`Wellcome ${singUpResult.name}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push(teamsLnk);
    }
    if (signUpErrors) {
      toast.error("Registration error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [token, singUpResult, history, signUpErrors]);

  return (
    <>
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
        <Button>Sign Up</Button>
        <div className={s.signUpLnk}>
          Already a member? <Link to={signInLnk}>Sign in</Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
