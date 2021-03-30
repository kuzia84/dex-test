import SignUpForm from "../../Components/SignUpForm/signUpForm";
import signUpBg from "../../img/sign-up-bg.svg";

interface ISignUp {
  userName: string;
  login: string;
  password: string;
}

const SignUp: React.FC = () => {
  const handleSubmitSignUpForm = async (request: ISignUp) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    };
    const response = await fetch(
      "http://dev.trainee.dex-it.ru/api/Auth/SignUp",
      requestOptions
    ).then((response) => {
      return response.json();
    });

    console.log("response: ", response);
  };

  return (
    <div className="login__wrapper">
      <div className="container">
        <div className="login__form">
          <SignUpForm onSubmit={handleSubmitSignUpForm} />
        </div>
        <div className="login__bg">
          <img src={signUpBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
