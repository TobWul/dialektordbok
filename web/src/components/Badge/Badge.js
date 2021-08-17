import React from "react"
import { Caption } from "../Typography/Typography"
import * as styles from "./Badge.module.scss"

const Badge = ({ children }) => {
  return <Caption className={styles.badge}>{children}</Caption>
}

export default Badge
