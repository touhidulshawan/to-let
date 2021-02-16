import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    setErrorMessage("");
    try {
      await signOut();
      history.push("/signIn");
    } catch {
      setErrorMessage("Failed to sign out");
    }
  };
  return (
    <>
      {errorMessage && (
        <div className="bg-red-100 text-red-700 py-2 px-5 my-3 w-ful">
          {errorMessage}
        </div>
      )}
      <nav className="bg-gray-50 shadow-md py-4 px-3 flex justify-end items-center lg:top-0 lg:left-0 lg:absolute lg:w-full lg:mb-5">
        <ul className="lg:mx-3">
          <li>
            <button
              className="cursor-pointer text-pink-600"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default NavBar;
