import * as React from "react";
import SearchField from "../components/SearchField/SearchField";
import { graphql, useStaticQuery } from "gatsby";
import { blockToPlainText } from "../lib/helpers";
import { Body1, Caption } from "../components/Typography/Typography";
import doubleMetaphone from "talisman/phonetics/double-metaphone";

const IndexPage = () => {
  const { allSanityWord } = useStaticQuery(graphql`
    query {
      allSanityWord {
        edges {
          node {
            word: _rawWord
          }
        }
      }
    }
  `);
  const allWords = allSanityWord.edges.map(({ node }) => {
    const value = blockToPlainText(node.word);
    return {
      value,
      metaphone: doubleMetaphone(value),
    };
  });
  return (
    <div>
      <SearchField searchList={allWords} />
      <hr />
      <ul>
        {allWords.map(({ value: word, metaphone }) => (
          <li>
            <Body1>{word}</Body1>
            <Caption>{metaphone}</Caption>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
