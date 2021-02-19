import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import GoogleIcon from "./icons/GoogleIcon";

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
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};
export default SignIn;
