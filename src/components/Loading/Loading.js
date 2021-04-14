import React from "react";
import PropTypes from "prop-types";
/** style */

const Loading = ({ text }) => <div className="font-bold p-6">{text}</div>;

Loading.defaultProps = {
  text: "",
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
