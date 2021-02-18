import Home from "./containers/Home";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signIn" component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
export default App;
