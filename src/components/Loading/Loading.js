import React from "react";
import PropTypes from "prop-types";
/** style */

const Loading = ({ text, color, size }) => (
  <div>
    {text}
    <div size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

Loading.defaultProps = {
  text: "",
  color: "primary",
  size: {
    h: "50px",
    w: "50px",
  },
};

Loading.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.shape({
    h: PropTypes.string,
    w: PropTypes.string,
  }),
};

export default Loading;
