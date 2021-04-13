import React from "react";
/** components */
import Button from "@material-ui/core/Button";
/** icons */
import EmailIcon from "@material-ui/icons/Email";
/** style */
/** svg */
import { ReactComponent as LoginIcon } from "assets/images/login.svg";

const Login = ({ loginMethod, setLoading }) => (
  <div className=" flex flex-col justify-center">
    <LoginIcon className="w-full h-auto my-6 mx-auto max-w-xs" />
    <div className="text-center">
      <button
        className="button-lg "
        onClick={() => {
          setLoading(true);
          loginMethod();
        }}
      >
        login with google
      </button>
    </div>
  </div>
);

export default Login;
