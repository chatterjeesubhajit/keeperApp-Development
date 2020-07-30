import React,{useContext} from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import classNames from "classnames";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import {LoginContext} from "./LoginContext";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

function Header() {
  // let history = useHistory();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  // console.log(loggedIn);
  const headerAnchors = classNames('btn','btn-lg');
  const navBranClass = classNames("navbar","navbar-expand-lg","navbar-dark");
  const homeRoute="/home/"+loggedIn.username;
  const headerPadding={
    paddingLeft:"10rem"
  };

  return (
    <header>  
   {loggedIn.status ? <div>
    <ul>
    <li style={{paddingRight:"1rem",paddingTop:"0.5rem"}}><HighlightIcon style={{fill:"white",size:"12rem"}}/>
    </li>
    <li>
    <h1> Keeper - Welcome {loggedIn.username}</h1>
    </li>    
    <li style={headerPadding}><a className={headerAnchors} role="button" title="Home" href={homeRoute}> <HomeIcon style={{fill:"white"}}/> </a></li>
    <li><a className={headerAnchors} href="/auth/logout" role="button" title="Logout" onClick={()=>{setLoggedIn({username:'',status:false})}}> <ExitToAppTwoToneIcon style={{fill:"white"}}/></a></li>
    </ul>
    
   
   </div> :
   <div>
   <ul>
    <li><HighlightIcon />
    </li>
    <li>
    <h1> Keeper - Welcome</h1>
    </li>
    </ul>
    </div>
    }
   
    </header>
  );
}

export default Header;
