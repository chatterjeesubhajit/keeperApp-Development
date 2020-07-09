import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import classNames from "classnames";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
function Header(props) {
  const logoutClasses = classNames('btn','btn-lg');

  return (
    <header>
   { props.loggedIn && (<a className={logoutClasses} href="http://localhost:5000/auth/logout" role="button" title="Logout" onClick={()=>{props.changeStatus()}} > <ExitToAppTwoToneIcon style={{fill:"white"}}/> </a>)}
     
        {props.loggedIn && (
      <h1>
        <HighlightIcon /> Keeper - Welcome {props.userName}
      </h1>) ||  
      <h1>
        <HighlightIcon /> Keeper
      </h1>}
      
    </header>
  );
}

export default Header;
