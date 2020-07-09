import React from "react";
import { Router,Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login  from "./components/LoginPage";
import history from "./history";

function App() {
  return (
    <Router history={history}>
    {/* <Switch > */}
      <Route path="/" exact component={Login} />
      <Route path="/home/:userName" exact component={Home} />
    {/* </Switch> */}
    </Router>
  );
}

export default App;
