import React from "react"
import * as styles from "./Badge.module.scss"

const Badge = ({ children }) => {
  return <div className={styles.badge}>{children}</div>
}

export default Badge
