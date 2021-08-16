import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Badge from "../../components/Badge/Badge"
import Meaning from "../../components/Meaning/Meaning"
import Word from "../../components/Word/Word"

const WordPage = ({
  data: {
    sanityWord: { word, meaning, wordClass, dialects },
  },
}) => {
  return (
    <div>
      <Word word={word} />
      <Meaning meaning={meaning} />
      <div>
        <Badge>{wordClass.name}</Badge>
      </div>
    </div>
  )
}

export const query = graphql`
  query Word($id: String) {
    sanityWord(_id: { eq: $id }) {
      word: _rawWord
      meaning: _rawMeaning
      wordClass {
        name
        shortDescription
      }
      dialects {
        name
      }
    }
  }
`

export default WordPage
