import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import axios from "axios";
import history from "../history";


function Home({match}) {
  if (window.location.hash === "#_=_"){
    history.replaceState 
        ? history.replaceState(null, null, window.location.href.split("#")[0])
        : window.location.hash = "";
}
  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const {params:{userName}={}}= match ;
  useEffect(()=>{
    console.log("effect call");
    axios.get('http://localhost:5000/auth/login/success',{withCredentials: true})
    .then(response => {
      console.log(response);
      response.data.notes.length>0?setNotes(response.data.notes):setNotes([]);
      setLoggedIn(response.data.success);
    })
    .catch((error) => {
      console.log(error);
    })
  ;

  },[]);

  const changeLoginStatus=() =>{
    setLoggedIn(false);
  }


  return (
    <div>
      <Header loggedIn={loggedIn} userName={userName} changeStatus={changeLoginStatus}/>
      {loggedIn && <Notes notes={notes}/>}
      <Footer />
    </div>
  );
}

export default Home;
