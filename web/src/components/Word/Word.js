import React from "react"
import BlockContent from "@sanity/block-content-to-react"

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
  return <BlockContent blocks={word} serializers={serializers} />
}

export default Word
