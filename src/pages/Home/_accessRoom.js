import React from "react";
import { Link } from "react-router-dom";
/** components */
import Button from "@material-ui/core/Button";
/** style */
/** svg */
import { ReactComponent as VoteIcon } from "assets/images/voting.svg";
/** icons */
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const AccessRoom = ({ room }) => (
  <li class="py-4 pl-4 pr-2">
    <div class="flex items-center space-x-4">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {room.roomName}
        </p>
        <p class="text-sm text-gray-500 truncate">
          Stories: {room.tasks.length}
        </p>
      </div>
      <div>
        <Link
          to={`${room.url}`}
          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
        >
          Join
        </Link>
      </div>
    </div>
  </li>
);

export default AccessRoom;
