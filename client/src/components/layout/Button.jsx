import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        className={`${props.className}`}
        // style={{ color: `${props.color}` }}
      >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
