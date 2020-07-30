import React , { useState } from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";
function LoginTab() {
const {register,watch, errors,handleSubmit}=useForm();
let history = useHistory();
const [loginFail,setLoginFail] = useState(false);
console.log("login tab");
const onSubmit = (data,e) => {
    axios
      .post('/auth/login', data)
      .then(response => {
        if (response.data.authenticate) {
                history.push(`/home/${response.data.displayName}`);
        } 
        else {
          setLoginFail(true);
        }
    })
      .catch(err => {
        console.error(err);
      });
      e.preventDefault();
      e.target.reset();    
    
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email" name="username" ref={register}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" className="form-control" name="password" ref={register} required/>
        </div>
        <button type="submit" className="btn btn-dark">
          Login
        </button>
        {loginFail && <p>Failed to login, please try again</p>}
      </form>
    </div>
  );
}

export default LoginTab;
