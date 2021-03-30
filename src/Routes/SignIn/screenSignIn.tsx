import SignInForm from "../../Components/SignInForm/signInForm";
import signInBg from "../../img/sign-in-bg.svg";

interface ISignIn {
  login: string;
  password: string;
}

const SignIn: React.FC = () => {
  const handleSubmitLoginForm = async (request: ISignIn) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    };
    const response = await fetch(
      "http://dev.trainee.dex-it.ru/api/Auth/SignIn",
      requestOptions
    ).then((response) => {
      return response.json();
    });

    console.log("response: ", response);
    localStorage.setItem("token", response.token);
  };
  return (
    <div className="login__wrapper">
      <div className="container">
        <div className="login__form">
          <SignInForm onSubmit={handleSubmitLoginForm} />
        </div>
        <div className="login__bg">
          <img src={signInBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
