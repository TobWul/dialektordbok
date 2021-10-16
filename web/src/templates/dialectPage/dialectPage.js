import { graphql, Link } from "gatsby";
import React from "react";
import { slugify, sortAlphabetically } from "../../lib/helpers";
import { blockToPlainText } from "../../lib/helpers";
import { ALPHABET } from "../../lib/constants";

const DialectDictionary = ({
  pageContext: { name },
  data: { allSanityWord },
}) => {
  const alphabeticalDictionary = ALPHABET.map(letter => ({
    letter,
    words: allSanityWord.edges
      .map(({ node }) => blockToPlainText(node.word))
      .filter(word => word.toLowerCase().startsWith(letter))
      .sort(sortAlphabetically),
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-heading-3">{name}</h1>
      {alphabeticalDictionary
        .filter(({ words }) => words.length > 0)
        .map(({ letter, words }) => (
          <div>
            <h2 className="text-heading-4">{letter.toUpperCase() + letter}</h2>
            {words.map(word => (
              <Link to={`/${slugify(word)}`}>
                <li>{word}</li>
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

export const query = graphql`
  query AllDialectWordsAlphabet($dialectID: String) {
    allSanityWord(
      filter: { dialects: { elemMatch: { _id: { eq: $dialectID } } } }
    ) {
      edges {
        node {
          word: _rawWord
        }
      }
    }
  }
`;

export default DialectDictionary;
