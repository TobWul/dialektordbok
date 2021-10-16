import React from "react";
import iconLibrary from "./iconlibrary";

function whichIcon(icon) {
  if (Object.getOwnPropertyNames(iconLibrary).includes(icon)) {
    return iconLibrary[icon];
  }
}

function Icon({ icon, fill, size, color, viewBox, className }) {
  const iconStyle = {
    width: size,
    height: size,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox || "0 0 24 24"}
      fill={fill ? color : "none"}
      style={iconStyle}
      className={className}
      {...iconStyle}
    >
      {whichIcon(icon)}
    </svg>
  );
}

Icon.defaultProps = {
  size: "24px",
  fill: "currentColor",
};

export default Icon;
