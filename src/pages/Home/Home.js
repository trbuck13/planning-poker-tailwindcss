import React, { useState, useEffect, useContext, memo } from "react";
/** style */
/** providers */
import { SessionContext } from "providers/Session";
/** components */
import Navbar from "components/Navbar/Navbar";
import Loading from "components/Loading/Loading";

import Login from "./_login";
import CreateRoom from "./_createRoom";
import AccessRoom from "./_accessRoom";
/** firebase */
import firebase from "firebase/app";
import "firebase/firestore";

const Home = () => {
  const { user, loginMethod } = useContext(SessionContext);

  const [form, setForm] = useState("");
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  const db = firebase.firestore();

  useEffect(() => {
    /** check available rooms */
    if (user.displayName) {
      db.collection("rooms")
        .where("roomOwner", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const roomDoc = doc.data();
            if (doc.exists) {
              setRooms((rooms) => [...rooms, roomDoc]);
            } else {
              console.log("< VERIFY ROOM > ", doc.data());

              setLoading(false);
            }
            setLoading(false);
          });
        })
        .catch((e) => console.warn("< GET ROOM : ERROR > ", e));
    } else {
      setLoading(false);
    }
  }, [user]);

  const createRoom = async () => {
    db.collection("users")
      .doc(user.uid)
      // .doc(`${form}-${btoa(user.uid)}`)
      .set({
        roomOwner: user.uid,
        roomName: form,
        createDate: new Date(),
        url: `/room/${form}`,
      })
      .then((response) => {
        console.log("< CREATE ROOM : DONE > ", response);

        // setState({
        //   ...state,
        //   rooms: {
        //     roomOwner: user.uid,
        //     roomName: form,
        //     url: `/room/${form}`,
        //   },
        // });

        db.collection("rooms")
          .doc(String(form))
          .set({
            membersOnline: [],
            votes: {},
            tasks: [],
            showVotes: false,
            roomOwner: user.uid,
            roomName: form,
            url: `/room/${form}`,
          });
      })
      .catch((e) => console.warn("< CREATE ROOM : ERROR > ", e));
  };

  return (
    <div className="">
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {loading ? (
          <Loading text="Loading..." />
        ) : (
          <>
            {!user?.displayName && (
              <Login
                loginMethod={() => loginMethod()}
                setLoading={setLoading}
              />
            )}

            {/** create room */}
            {/* {user?.displayName && !state.createdRoom && ( */}
            <CreateRoom
              createRoom={() => createRoom()}
              changeState={(value) => setForm(value)}
            />
            {/* // )} */}

            {/** access room */}
            {user?.displayName &&
              rooms.map((room) => <AccessRoom link={room.url} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Home);
