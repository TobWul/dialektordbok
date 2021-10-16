import React from "react"
import BlockContent from "@sanity/block-content-to-react"

const serializers = {
  types: {
    internalWordLink: props => {
      console.log(props)
      return null
    },
  },
}

const Meaning = ({ meaning }) => {
  return <BlockContent blocks={meaning} serializers={serializers} />
}

export default Meaning
