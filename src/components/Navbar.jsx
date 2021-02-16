import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
      {errorMessage && <div className="alert">{errorMessage}</div>}
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
        <button onClick={handleLogout}>Sign Out</button>
      </nav>
    </>
  );
};
export default NavBar;
