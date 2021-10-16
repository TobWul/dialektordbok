import React from "react";

const Card = props => {
  return (
    <div {...props} className={`bg-white p-4 rounded mb-4 ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
