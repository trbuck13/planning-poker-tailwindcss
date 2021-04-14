import React from "react";
import { ReactComponent as LoginIcon } from "assets/images/login.svg";

const Login = ({ loginMethod, setLoading }) => (
  <div className=" flex flex-col justify-center py-10">
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
