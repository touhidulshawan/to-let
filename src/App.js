import Home from "./containers/Home";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Chat from "./components/chat/Chat";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <Route exact path="/signIn" component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
export default App;
