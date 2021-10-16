import { graphql, useStaticQuery } from "gatsby";
import React, { useRef } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Icon from "../../components/icons/Icon";
import Input from "../../components/Input";
import { blockToPlainText, stringSimilarity } from "../../lib/helpers";
import * as styles from "./dialectPage.module.scss";
import Helmet from "react-helmet";

const DialectPage = ({
  pageContext: { name, dialectID },
  data: { allSanityWord },
}) => {
  const [userData, setUserData] = useState({});
  const [similarWords, setSimilarWords] = useState([]);
  const [uploadedWords, setUploadedWords] = useState([]);
  const inputRef = useRef(null);

  function handleChange(e) {
    userData[e.target.id] = e.target.value;
    setUserData({ ...userData });
  }
  function onSubmit(e) {
    e.preventDefault();
    const comparedWords = allSanityWord.edges.map(({ node }) => {
      const word = blockToPlainText(node.word);
      const similarity = stringSimilarity(userData.word, word);
      return {
        word,
        similarity,
      };
    });
    const similarWordsFilter = comparedWords.filter(
      ({ similarity }) => similarity > 0.5
    );
    setSimilarWords(similarWordsFilter);
    if (similarWordsFilter.length === 0) uploadWord();
  }
  async function uploadWord() {
    console.log("Uploading word: " + userData.word + "...");
    await fetch("/api/uploadWord", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...userData, dialectID }),
    }).then(res => {
      setUploadedWords([userData.word, ...uploadedWords]);
      setUserData({});
      setSimilarWords([]);
      inputRef?.current?.focus();
      return res.json();
    });
  }
  return (
    <div className="max-w-2xl mx-auto py-16">
      <Helmet bodyAttributes={{ class: "bg-gray-100" }} />
      <p className="text-body-1">Legg inn ord i ordboka for</p>
      <h2 className="text-heading-4">{name}</h2>
      <br />
      <form onSubmit={onSubmit} method="POST" action="/api/form">
        <Input
          type="text"
          id="word"
          value={userData.word || ""}
          onChange={handleChange}
          label="Ord eller uttrykk"
          ref={inputRef}
          required
          description="Bare gjett på stavingen, vi kommer til å standardisere før det går i ordlisten."
        />
        <Input
          type="textarea"
          id="meaning"
          value={userData.meaning || ""}
          onChange={handleChange}
          label="Betydning"
          description="Si gjerne hva det betyr om du kan."
        />
        {similarWords.length > 0 ? (
          <>
            <p className="text-body-1">
              {userData.word} ligner på:{" "}
              {similarWords.map(({ word }) => word + ", ")}
            </p>
            <Button type="button" onClick={uploadWord}>
              Last opp likevel
            </Button>
          </>
        ) : (
          <Button type="submit">Send inn</Button>
        )}
      </form>
      <div className={styles.uploadedWords}>
        <p className="text-body-2">Innsendte ord:</p>
        <ul>
          {uploadedWords.map((word, index) => (
            <li key={`uploaded-word-${index}`}>
              <Icon icon="check" />
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const query = graphql`
  query AllDialectWords($dialectID: String) {
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

export default DialectPage;
