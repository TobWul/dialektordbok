import React, { forwardRef } from "react";
import Icon from "./icons/Icon";

const Input = forwardRef(
  ({
    id,
    name,
    onChange,
    value,
    label,
    type,
    description,
    white,
    ...props
  }) => {
    const inputProps = {
      id,
      name,
      onChange,
      value,
      placeholder: label,
      ...props,
    };
    const backgroundColor = " " + white ? "bg-white" : "bg-gray-100";
    const inputClasses =
      "w-full py-3 px-3 font-serif text-base rounded resize-y placeholder-gray-500 focus:outline-none" +
      backgroundColor;

    return (
      <div className="w-full mb-4">
        <label htmlFor={name} className="text-body-2">
          {label}
        </label>
        <div className="rounded flex items center relative">
          {type === "search" && (
            <Icon
              className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none ml-3"
              icon="search"
            />
          )}
          {type === "textarea" ? (
            <textarea
              className={inputClasses + " min-h-8"}
              {...inputProps}
            ></textarea>
          ) : (
            <input
              className={inputClasses + (type === "search" ? " pl-10" : "")}
              {...inputProps}
            />
          )}
        </div>
        <p className="text-caption text-gray-600 mt-1">{description}</p>
      </div>
    );
  }
);

export default Input;
