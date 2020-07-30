import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp  from "./components/SignUp";
import ZoomView from "./components/ZoomView";
import history from "./history";
import {NotesProvider} from "./components/NotesRepo";
function App() {
  return (
    
    <Router>
      <Route path="/" exact component={SignUp} />
      <Route path="/home/:userName" exact component={Home} />
      <Route path="/notes/:title" exact component={ZoomView} />
    </Router>
  );
}

export default App;
