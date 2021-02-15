import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { signOut, currentUser } = useAuth();

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
    <div>
      {errorMessage && <div className="alert">{errorMessage}</div>}
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
        <button onClick={handleLogout}>Sign Out</button>
      </nav>
      <div>
        <h2>Profile</h2>
        <strong>Email: </strong> {currentUser.email}
      </div>
    </div>
  );
};
export default Home;
