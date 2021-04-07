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
  <div>
    <VoteIcon />
    <Link to={`${link}`}>
      <Button variant="contained" color="secondary" size="large" fullWidth>
        go to {`${link}`} <MeetingRoomIcon />
      </Button>
    </Link>
  </div>
);

export default AccessRoom;
