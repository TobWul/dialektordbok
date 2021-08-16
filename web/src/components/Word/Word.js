import React from "react"
import BlockContent from "@sanity/block-content-to-react"
import * as styles from "./Word.module.scss"

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}

const Word = ({ word }) => {
  return (
    <div className={styles.word}>
      <BlockContent blocks={word} serializers={serializers} />
    </div>
  )
}

export default Word
