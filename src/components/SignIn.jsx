import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import LoginHeader from "./LoginHeader";

const SignIn = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    await signIn();
    history.push("/");
  };

  return (
    <div className="w-screen h-screen grid justify-center content-center">
      <div className="bg-gray-100 h-screen p-4 flex flex-col justify-items-center items-center md:w-4/12 md:m-auto md:shadow-md md:rounded-md  md:h-full md:border-4 md:border-gray-700">
        <LoginHeader />
        <button
          className="mt-6 mb-3 bg-blue-500 py-4 text-blue-50 rounded px-8 w-full md:mb-6 uppercase tracking-wide text-center flex justify-center items-center"
          onClick={handleSignIn}
        >
          {/* <img src={GoogleLogo} alt="google" className="w-6 h-6 mr-3 " />
           */}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            className="svg-inline--fa fa-google fa-w-16 w-6 h-6 mr-3 fill-current text-blue-100"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};
export default SignIn;
