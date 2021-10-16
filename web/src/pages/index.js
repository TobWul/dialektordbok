import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { blockToPlainText, slugify } from "../lib/helpers";
import doubleMetaphone from "talisman/phonetics/double-metaphone";
import { useQueryParam, StringParam } from "use-query-params";
import Input from "../components/Input";

const IndexPage = ({ data }) => {
  const [query, setQuery] = useQueryParam("sok", StringParam);
  const [results, setResults] = useState([]);
  const handleChange = e => {
    setQuery(e.target.value.length === 0 ? undefined : e.target.value);
  };
  useEffect(() => {
    if (query === undefined) return;
    const allWords = data.allSanityWord.edges.map(({ node }) => {
      const value = blockToPlainText(node.word);
      return {
        value,
        metaphone: doubleMetaphone(value),
      };
    });
    setResults(
      allWords
        .map(({ value, metaphone }) => ({
          value,
          metaphone,
          similar: metaphone.some(phonemString =>
            doubleMetaphone(query).includes(phonemString)
          ),
        }))
        .filter(({ similar }) => similar)
    );
  }, [query]);
  const search = e => {
    e.preventDefault();
  };
  return (
    <>
      <div>
        <form onSubmit={search}>
          <Input
            type="search"
            value={query === undefined ? "" : query}
            onChange={handleChange}
          />
        </form>
        <ul>
          {query &&
            results.map(({ value }) => (
              <li key={slugify(value)}>
                <Link to={`/${slugify(value)}`}>{value}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export const query = graphql`
  query {
    allSanityWord {
      edges {
        node {
          word: _rawWord
        }
      }
    }
  }
`;

export default IndexPage;
