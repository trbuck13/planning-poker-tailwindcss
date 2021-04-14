import React, { useState, useEffect, memo, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SessionContext } from "providers/Session";
import Navbar from "components/Navbar/Navbar";
import Board from "./_Board";
import Loading from "components/Loading/Loading";
import firebase from "firebase/app";
import "firebase/firestore";

const Room = () => {
  const { user, loginMethod } = useContext(SessionContext);
  const [state, setState] = useState({
    loading: true,
    isValidRoom: false,
    roomPayload: {},
  });
  const db = firebase.firestore();
  const { roomID } = useParams();

  useEffect(() => {
    if (!user?.displayName) {
      setState({
        ...state,
        loading: false,
      });
    }

    /** check if room is valid */
    if (user?.displayName) {
      db.collection("rooms")
        .doc(roomID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("< GET ROOM > ", doc.data());
            setState({
              ...state,
              loading: false,
              isValidRoom: true,
              roomPayload: doc.data(),
            });
          } else {
            setState({ ...state, loading: false });
          }
        })
        .catch((e) => {
          console.warn("< GET ROOM : ERROR > ", e);
          setState({ ...state, loading: false });
        });
    }
  }, [user]);

  return (
    <div>
      <Navbar />

      <div>
        {state.loading ? (
          <Loading text="Loading..." />
        ) : (
          <>
            {!user?.displayName && (
              <>
                <div className="text-lg mb-4">
                  Please, you need to create/make login to access that room!
                </div>
                <button className="button-lg" onClick={() => loginMethod()}>Login google</button>
              </>
            )}

            {user?.displayName && !state.isValidRoom && (
              <Link to="/" className="button">
                  Invalid Room
              </Link>
            )}

            {user?.displayName && state.isValidRoom && (
              <Board user={user} roomName={roomID} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Room);
