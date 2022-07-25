import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import "./App.css";
import { useStateValue } from "./contexts/StateContextProvider";
import { actionTypes } from "./contexts/StateReducers";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";
import Widgets from "./components/Widgets/Widgets";
import Profile from "./components/Profile/Profile";
import ProfileFollow from "./components/ProfileFollow/ProfileFollow";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      user: JSON.parse(localStorage.getItem("twitter_user")),
    });
  }, []);

  return (
    <div className="app">
      {user ? (
        <Router>
          <div className="app__mainContent">
            <Sidebar />
            <Route path="/" exact component={Feed} />
            <Route path="/profile/:username">
              <div className="app__main">
                <Switch>
                  <Route path="/profile/:username" exact component={Profile} />
                  <Route
                    path="/profile/:username/followinfo"
                    render={() => <ProfileFollow />}
                  />
                </Switch>
              </div>
            </Route>{" "}
            <Widgets />
          </div>{" "}
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
