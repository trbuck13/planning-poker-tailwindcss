import React from "react";
import ReactDOM from "react-dom";

/** firebase */
import firebase from "firebase/app";
import credentials from "./credentials";
/** routes */
import Routes from "./routes/Routes";
import "./index.css";

/** provider */
import { SessionProvider } from "providers/Session";

/** start */
firebase.initializeApp(credentials);

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <Routes />
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
