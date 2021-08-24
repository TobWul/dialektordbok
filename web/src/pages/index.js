import * as React from "react";
import SearchField from "../components/SearchField/SearchField";
import { graphql, Link, useStaticQuery } from "gatsby";
import { blockToPlainText, slugify } from "../lib/helpers";
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
            <Link to={slugify(word)}>
              <Body1>{word}</Body1>
              <Caption>{metaphone}</Caption>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
