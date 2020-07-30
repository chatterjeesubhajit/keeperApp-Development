import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/Notes.css';
import {LogInProvider} from "./components/LoginContext";
import {NotesProvider} from "./components/NotesRepo";

ReactDOM.render( <LogInProvider><NotesProvider>< App / ></NotesProvider></LogInProvider> , document.getElementById("root"));