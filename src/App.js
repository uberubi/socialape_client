import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import themeObject from "./utils/theme";
import jwtDecode from "jwt-decode";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import axios from "axios";

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = "/login";
  } else {
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={Login}
              />
              <AuthRoute
                exact
                path="/signup"
                component={Signup}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
