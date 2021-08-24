import React, { useState } from "react";
import { Overline } from "../../components/Typography/Typography";
import doubleMetaphone from "talisman/phonetics/double-metaphone";

const SearchField = ({ searchList }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const changeHandler = e => {
    setQuery(e.target.value);
    setResults([]);
    const initialResults = searchList.map(({ value, metaphone }) => ({
      value,
      metaphone,
      similar: metaphone.some(m => doubleMetaphone(e.target.value).includes(m)),
    }));
    setResults(initialResults.filter(({ similar }) => similar));
  };
  return (
    <>
      <input type="search" value={query} onChange={changeHandler} />
      {doubleMetaphone(query)}
      <Overline>Metaphone:</Overline>
      <ul>
        {results.map(({ value, metaphone }) => (
          <li>
            {value} - {metaphone}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchField;
