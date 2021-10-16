import React from "react";
// import * as styles from "./Badge.module.scss"
// .badge {
//   color: var(--color-gray-600);
//   background-color: var(--color-gray-200);
//   border-radius: 100px;
//   padding: 2px 8px;
//   display: inline-flex;
// }

const Badge = ({ children }) => {
  return (
    <p className="text-gray-600 bg-gray-200 rounded-full py-1 px-2 inline-flex">
      {children}
    </p>
  );
};

export default Badge;
