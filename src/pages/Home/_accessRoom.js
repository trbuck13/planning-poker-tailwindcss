import React from "react";
import { Link } from "react-router-dom";
/** components */
import Button from "@material-ui/core/Button";
/** style */
/** svg */
import { ReactComponent as VoteIcon } from "assets/images/voting.svg";
/** icons */
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const AccessRoom = ({ link }) => (
  <div className=" flex flex-col justify-center">
    <div className="text-center">
      <Link to={`${link}`} class="button-lg ">
        go to {`${link}`}
      </Link>
    </div>
  </div>
);

export default AccessRoom;
