import React, { useState, useCallback } from "react";
/** components */
import TextField from "@material-ui/core/TextField";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

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

const CreateRoom = ({ createRoom, changeState }) => {
  const [urlName, setUrlName] = useState("");

  const handleKeys = (e) => {
    const keyActions = {
      13: () => {
        // enter
        createRoom();
        e.preventDefault();
      },
    };
    const callKeyActions = keyActions[e.keyCode];
    if (typeof callKeyActions === "function") callKeyActions();
  };

  const verifyRoomName = useCallback(
    debounce((value) => {
      if (value.length <= 0) {
        setUrlName("");
        return null;
      }
      if (value.length > 30) return null;
      const finalUrl = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      setUrlName(finalUrl);
      changeState(finalUrl);
    }, 400)
  );

  return (
    <div class="w-1/3 bg-gray-200 overflow-hidden rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <form autoComplete="off" onKeyDown={handleKeys}>
          <div>
            <div className="mb-4">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Create Room
              </label>
              <div class="mt-1">
                <input
                  onChange={(e) => verifyRoomName(e.target.value)}
                  type="text"
                  name="email"
                  id="email"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="My Room"
                />
              </div>
            </div>
            <button
              className="button w-full justify-center"
              onClick={() => createRoom()}
            >
              Create Room <MeetingRoomIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
