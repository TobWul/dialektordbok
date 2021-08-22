import React, { forwardRef } from "react";
import { Body2, Caption } from "../Typography/Typography";
import * as styles from "./Input.module.scss";

const Input = forwardRef(
  ({ id, name, onChange, value, label, type, description, ...props }) => {
    const inputProps = {
      id,
      name,
      onChange,
      value,
      className: styles.input,
      placeholder: label,
      ...props,
    };
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={name}>
          <Body2>{label}</Body2>
        </label>
        {type === "textarea" ? (
          <textarea {...inputProps}></textarea>
        ) : (
          <input {...inputProps} />
        )}
        <Caption className={styles.description}>{description}</Caption>
      </div>
    );
  }
);

export default Input;
