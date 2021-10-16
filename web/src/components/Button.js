import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      className="bg-gray-900 text-white rounded py-2 px-4 pointer transition-colors hover:bg-gray-800 active:bg-gray-900"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
