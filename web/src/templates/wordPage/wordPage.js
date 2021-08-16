import { graphql } from "gatsby"
import React from "react"
import Badge from "../../components/Badge/Badge"
import Meaning from "../../components/Meaning/Meaning"
import Word from "../../components/Word/Word"
import { Heading3 } from "../../components/Typography/Typography"
import * as styles from "./wordPage.module.scss"
import { Helmet } from "react-helmet"
import SEO from "../../components/SEO"
import { blockToPlainText } from "../../lib/helpers"

const WordPage = ({
  data: {
    sanityWord: { word, meaning, wordClass, alternateSpelling, dialects },
    allSanitySentence: { edges: sentences },
  },
}) => {
  return (
    <div>
      <Helmet
        bodyAttributes={{
          class: styles.wordBody,
        }}
      />
      <SEO
        title={blockToPlainText(word)}
        description={blockToPlainText(meaning)}
        meta={
          alternateSpelling
            ? [
                {
                  property: "keywords",
                  content: alternateSpelling,
                },
              ]
            : []
        }
      />
      <Heading3>
        <Word word={word} />
      </Heading3>
      <div>
        <Badge>{wordClass?.name}</Badge>
      </div>
      <Meaning meaning={meaning} />
      <div className={styles.relevantContent}>
        {sentences.map(({ node: sentence }) => (
          <p>{sentence.text}</p>
        ))}
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
      alternateSpelling
      dialects {
        name
      }
    }
    allSanitySentence(filter: { words: { elemMatch: { _id: { eq: $id } } } }) {
      edges {
        node {
          text
        }
      }
    }
  }
`

export default WordPage
