import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Body1, Heading4 } from "../../components/Typography/Typography";
import SEO from "../../components/SEO";
import * as styles from "./sentencePage.module.scss";
import { blockToPlainText } from "../../lib/helpers";

const SentencePage = ({
  data: {
    sanitySentence: { text, meaning, dialects, words },
  },
}) => {
  console.log(words);
  return (
    <div>
      <Helmet
        bodyAttributes={{
          class: styles.sentenceBody,
        }}
      />
      <SEO
        title={text}
        description={meaning}
        meta={{
          property: "keywords",
          content: words.map(({ word }) => blockToPlainText(word)).join(", "),
        }}
      />
      <div className={styles.sentenceTop}>
        <div className={styles.innerWrapper}>
          <Heading4>&ldquo;{text}&rdquo;</Heading4>
          <Body1>{meaning}</Body1>
        </div>
      </div>
      <div className={styles.relevantContent}>
        <div className={styles.innerWrapper}>
          <Body1 bold>Uttrykk:</Body1>
          {words.map(({ word }) => (
            <Body1>{blockToPlainText(word)}</Body1>
          ))}
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query Sentence($id: String) {
    sanitySentence(_id: { eq: $id }) {
      text
      meaning
      words {
        word: _rawWord
      }
      dialects {
        name
      }
    }
  }
`;

export default SentencePage;
