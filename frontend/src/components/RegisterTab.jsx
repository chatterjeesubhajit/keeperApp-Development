import React , { useState } from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";
function Register() {
const {register,watch, errors,handleSubmit}=useForm();
let history = useHistory();
const [nameTaken,setNameTaken] = useState(false);
console.log("register");
const onSubmit = (data,e) => {
    axios
      .post('/auth/register', data)
      .then(response => {
        if (response.data.status) {
            console.log('successful signup')
                history.push(`/home/${data.firstname}${data.lastname}`);
        } else {
            setNameTaken(true);
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
          <input type="text" className="form-control" placeholder="First Name" name="firstname" ref={register} required/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Last Name" name="lastname" ref={register} required/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email" name="username" ref={register}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" className="form-control" name="password" ref={register({pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})} required/>
          {errors.password && <p>Minimum eight characters, at least one letter and one number</p>}
        </div>
        <div className="form-group">
        <input type="password" className="form-control" name="cnfPassword" ref={register({validate: (value) => value === watch('password')})} placeholder="Confirm Password" required/>        
        {errors.cnfPassword && <p>Passwords don't match</p>}
        </div>
        <button type="submit" className="btn btn-dark">
          Register
        </button>
        {nameTaken && <p> Sorry, email id already exists!</p>}
      </form>
    </div>
  );
}

export default Register;
