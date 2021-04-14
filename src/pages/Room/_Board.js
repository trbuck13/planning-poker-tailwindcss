import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
/** style */
/** components */
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TaskNames from "./_TaskNames";
/** icons */
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import DoneIcon from "@material-ui/icons/Done";
/** firebase */
import firebase from "firebase/app";
import "firebase/firestore";

const debounce = (callback, delay) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, delay);
  };
};

const Board = ({ user, roomName }) => {
  const db = firebase.firestore();
  const [state, setState] = useState({
    votes: {},
    options: ["0", 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"],
    showVotes: false,
    roomOwner: false,
    membersOnline: [],
    tasks: [],
    taskName: "",
  });

  useEffect(() => {
    window.addEventListener("beforeunload", listenerCloseWindow);

    const unsubscribe = db
      .collection("rooms")
      .doc(String(roomName))
      .onSnapshot((doc) => {
        if (doc.exists) {
          const allData = doc.data();
          setState({
            ...state,
            ...allData,
          });
        }
      });

    /** add user */
    addMember();

    return () => {
      /** remove player from room */
      unsubscribe();
      removeMember();
      // window.removeEventListener('beforeunload', listenerCloseWindow)
    };
  }, []);

  const listenerCloseWindow = useCallback((e) => {
    removeMember();
    e.preventDefault();
    e.returnValue = "";
  }, []);

  const addMember = () => {
    db.collection("rooms")
      .doc(String(roomName))
      .update({
        lastAccess: new Date(),
        membersOnline: firebase.firestore.FieldValue.arrayUnion({
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          uid: user.uid,
        }),
      })
      .then(() => {
        console.log("< add member : done >");
      });
  };

  const removeMember = () => {
    db.collection("rooms")
      .doc(String(roomName))
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { membersOnline, votes } = doc.data();
          // console.log('< remove values > ',membersOnline, votes)
          delete votes[user.uid];

          db.collection("rooms")
            .doc(String(roomName))
            .update({
              membersOnline: membersOnline.filter(
                (item) => item.uid !== user.uid
              ),
              showVotes: false,
              votes: { ...votes },
            })
            .then(() => {
              console.log("< remove member : done >");
            });
        }
      });
  };

  const updateTaskName = useCallback(
    debounce((value) => {
      db.collection("rooms")
        .doc(String(roomName))
        .set(
          {
            taskName: value,
          },
          { merge: true }
        )
        .then(() => {
          console.log("< update showVotes : done >");
        });
    }, 1000)
  );

  return (
    <div className="flex bg-gray-100 min-h-screen ">
      <div className="-mt-12 flex w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/** sidebar */}
        <div className="w-1/4">
          <TaskNames tasks={state.tasks} />
        </div>
        <div className="w-3/4 pl-6">
          <div class="bg-white  mb-6 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div>
                Online Members: <b>{state.membersOnline.length}</b>
              </div>
              <div>
                <div className=" ">
                  {state.options.map((item, idx) => (
                    <button
                      type="button"
                      class={`${
                        state.votes[user.uid] === item
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-gray-700"
                      } last:rounded-r-md first:rounded-l-md relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium  focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                      key={idx}
                      // variant={
                      //   state.votes[user.uid] === item ? "contained" : "outlined"
                      // }
                      onClick={() => {
                        db.collection("rooms")
                          .doc(String(roomName))
                          .set(
                            {
                              votes: {
                                [user.uid]: item,
                              },
                            },
                            { merge: true }
                          )
                          .then(() => {
                            console.log("< update vote : done >");
                          });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            {state.membersOnline.length > 0 &&
              state.membersOnline
                .map((item, idx) => (
                  <div key={idx} className="animated fadeIn">
                    <Card>
                      <div>
                        <img
                          src={item.photo}
                          alt="user image"
                          title={`${item.name}`}
                        />
                      </div>

                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          {item.name}
                        </Typography>
                        {state.roomOwner === item.uid && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Owner <EmojiEventsIcon />
                          </Typography>
                        )}
                        {state.votes[item.uid] && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Voted <DoneIcon />
                          </Typography>
                        )}

                        {user.uid === item.uid &&
                          state.roomOwner === user.uid &&
                          !state.showVotes && (
                            <div>
                              <TextField
                                label="Task Name"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateTaskName(e.target.value)}
                              />

                              <Button
                                size="medium"
                                color="secondary"
                                variant="contained"
                                fullWidth
                                disabled={
                                  state.membersOnline.length ===
                                  Object.keys(state.votes).length
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (state.taskName !== "") {
                                    db.collection("rooms")
                                      .doc(String(roomName))
                                      .update({
                                        tasks: firebase.firestore.FieldValue.arrayUnion(
                                          {
                                            name: String(state.taskName),
                                            average:
                                              Object.keys(state.votes).reduce(
                                                (acc, cur) =>
                                                  (acc =
                                                    acc +
                                                    (state.votes[cur] !== "?"
                                                      ? state.votes[cur]
                                                      : 0)),
                                                0
                                              ) /
                                              Object.keys(state.votes).length,
                                            date: new Date(),
                                          }
                                        ),
                                      });
                                  }

                                  db.collection("rooms")
                                    .doc(String(roomName))
                                    .set(
                                      {
                                        showVotes: true,
                                        taskName: "",
                                      },
                                      { merge: true }
                                    )
                                    .then(() => {
                                      console.log(
                                        "< update showVotes : done >"
                                      );
                                    });
                                }}
                              >
                                Reveal Votes
                              </Button>
                            </div>
                          )}

                        {user.uid === item.uid &&
                          state.roomOwner === user.uid &&
                          state.showVotes && (
                            <div>
                              <Button
                                size="medium"
                                color="secondary"
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                  db.collection("rooms")
                                    .doc(String(roomName))
                                    .set(
                                      {
                                        showVotes: false,
                                        taskName: "",
                                        votes: {},
                                      },
                                      { merge: true }
                                    )
                                    .then(() => {
                                      console.log(
                                        "< update showVotes : done >"
                                      );
                                    });
                                }}
                              >
                                Reset Votes
                              </Button>
                            </div>
                          )}
                      </CardContent>
                      {state.showVotes && (
                        <CardActions>
                          <Button
                            size="large"
                            color="primary"
                            variant="outlined"
                            fullWidth
                          >
                            {state.votes[item.uid]}
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  </div>
                ))
                .reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  user: PropTypes.object,
  roomName: PropTypes.string,
};

export default Board;
