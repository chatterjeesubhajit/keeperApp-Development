import React from "react";
import Header from "./Header";
import classNames from "classnames";

function Login()
{
    const containerClasses = classNames('container','mt-5');
    const cardClasses = classNames('card','social-block');
    const btnClasses = classNames('btn','btn-block','btn-social','btn-facebook');
    const fbIconClasses= classNames('fab', 'fa-facebook');


    return (
        <div>
        <Header />
        <div className={containerClasses}>
            <h1>Login</h1>
            <div className="row">
                <div className="col-sm-4">
                    <div className={cardClasses}>
                        <div className="card-body">
                            <a className={btnClasses} href="http://localhost:5000/auth/facebook" role="button">
                            <i className={fbIconClasses}></i>
                            Sign In with Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}

export default Login;
