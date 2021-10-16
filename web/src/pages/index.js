import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { blockToPlainText, slugify, sortAlphabetically } from "../lib/helpers";
import doubleMetaphone from "talisman/phonetics/double-metaphone";
import { useQueryParam, StringParam } from "use-query-params";
import Input from "../components/Input";
import { ALPHABET } from "../lib/constants";
import Helmet from "react-helmet";
import WordCard from "../components/WordCard";

const IndexPage = ({ data: { allSanityWord, allSanitySentence } }) => {
  const allWords = allSanityWord.edges.map(({ node }) => ({
    word: blockToPlainText(node.word),
    meaning: node.meaning,
    sentence: allSanitySentence.edges.filter(s =>
      s.node.words.some(w => w._id === node._id)
    )[0]?.node.text,
  }));
  const [query, setQuery] = useQueryParam("sok", StringParam);
  const [results, setResults] = useState([]);
  const handleChange = e => {
    setQuery(e.target.value.length === 0 ? undefined : e.target.value);
  };
  useEffect(() => {
    if (query === undefined) return;
    setResults([]);
    setResults(
      allWords
        .map(node => {
          const metaphone = doubleMetaphone(node.word);
          return {
            ...node,
            metaphone,
            similar: metaphone.some(phonemString =>
              doubleMetaphone(query).includes(phonemString)
            ),
          };
        })
        .filter(({ similar }) => similar)
    );
  }, [query]);
  const search = e => {
    e.preventDefault();
  };
  const alphabeticalDictionary = ALPHABET.map(letter => ({
    letter,
    words: allWords
      .filter(({ word }) => word.toLowerCase().startsWith(letter))
      .sort(sortAlphabetically),
  }));
  return (
    <div className="max-w-page mx-auto">
      <Helmet bodyAttributes={{ class: "bg-gray-100" }} />
      <form onSubmit={search} className="mt-12">
        <Input
          type="search"
          value={query === undefined ? "" : query}
          onChange={handleChange}
          placeholder="Søk opp et ord eller uttrykk"
          white
        />
      </form>
      {query && results.length > 0
        ? results.map(({ word }) => (
            <li key={slugify(word)}>
              <Link to={`/${slugify(word)}`}>{word}</Link>
            </li>
          ))
        : alphabeticalDictionary
            .filter(({ words }) => words.length > 0)
            .map(({ letter, words }) => (
              <div>
                <p className="text-body-1 font-bold">
                  {letter.toUpperCase() + letter}
                </p>
                {words.map(word => (
                  <WordCard {...word} />
                ))}
              </div>
            ))}
    </div>
  );
};

export const query = graphql`
  query {
    allSanitySentence {
      edges {
        node {
          text
          words {
            _id
          }
        }
      }
    }
    allSanityWord {
      edges {
        node {
          _id
          word: _rawWord
          meaning: _rawMeaning
        }
      }
    }
  }
`;

export default IndexPage;
