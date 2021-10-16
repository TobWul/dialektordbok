import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import Badge from "../../components/Badge";
import Meaning from "../../components/Meaning";
import Word from "../../components/Word/Word";
import { blockToPlainText } from "../../lib/helpers";
import SEO from "../../seo";

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
          class: "bg-gray-100",
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
      <div className="bg-white px-page">
        <div className="mx-auto max-w-page pt-24 pb-16">
          <h1 className="text-heading-3">
            <Word word={word} />
          </h1>
          <Meaning meaning={meaning} />
          {wordClass && (
            <div className="mt-12">
              <Badge>{wordClass?.name}</Badge>
            </div>
          )}
        </div>
      </div>
      <div className="py-8 px-page">
        <div className="mx-auto max-w-page">
          {sentences.length > 0 && <p className="text-body-1 bold">Uttrykk:</p>}
          {sentences.map(({ node: sentence }) => (
            <p>{sentence.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

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
`;

export default WordPage;
