import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
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
          <h1 className="text-heading-4">&ldquo;{text}&rdquo;</h1>
          <p className="text-body-1">{meaning}</p>
        </div>
      </div>
      <div className={styles.relevantContent}>
        <div className={styles.innerWrapper}>
          <p className="text-body-1 bold">Uttrykk:</p>
          {words.map(({ word }) => (
            <p className="text-body-1">{blockToPlainText(word)}</p>
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
