import React, { useState, useEffect,useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import axios from "axios";
import history from "../history";
import {NotesContext} from "./NotesRepo";
import {LoginContext} from "./LoginContext";

function Home({ match }) {
  if (window.location.hash === "#_=_") {
    history.replaceState
      ? history.replaceState(null, null, window.location.href.split("#")[0])
      : (window.location.hash = "");
  }
  const {notes, setNotes} = useContext(NotesContext);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  console.log("home page");
  const { params: { userName } = {} } = match;
  useEffect(() => {
    axios
      .get("/auth/login/success", { withCredentials: true })
      .then((response) => {
        response.data.notes.length > 0
          ? setNotes(response.data.notes)
          : setNotes([]);
        setLoggedIn({username:userName,status:response.data.success});
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
    <Header />
      {loggedIn &&<Notes/>}
      <Footer />
    </div>
  );
}

export default Home;
