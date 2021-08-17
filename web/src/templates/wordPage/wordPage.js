import { graphql } from "gatsby"
import React from "react"
import Badge from "../../components/Badge/Badge"
import Meaning from "../../components/Meaning/Meaning"
import Word from "../../components/Word/Word"
import { Body1, Heading3 } from "../../components/Typography/Typography"
import * as styles from "./wordPage.module.scss"
import { Helmet } from "react-helmet"
import { blockToPlainText } from "../../lib/helpers"
import SEO from "../../seo"

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
      <div className={styles.wordInfo}>
        <div className={styles.innerWrapper}>
          <Heading3>
            <Word word={word} />
          </Heading3>
          <Meaning meaning={meaning} />
          <div className={styles.wordClasses}>
            <Badge>{wordClass?.name}</Badge>
          </div>
        </div>
      </div>
      <div className={styles.relevantContent}>
        <div className={styles.innerWrapper}>
          <Body1 bold>Uttrykk:</Body1>
          {sentences.map(({ node: sentence }) => (
            <p>{sentence.text}</p>
          ))}
        </div>
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
