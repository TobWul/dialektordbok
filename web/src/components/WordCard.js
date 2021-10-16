import React from "react";
import { blockToPlainText, slugify } from "../lib/helpers";
import Card from "./Card";
import { Link } from "gatsby";

const WordCard = ({ word, meaning, sentence }) => {
  return (
    <Link to={slugify(word)}>
      <Card>
        <h3 className="text-lg font-bold">{word}</h3>
        <p>{blockToPlainText(meaning)}</p>
        <p className="text-gray-600 italic">{sentence}</p>
      </Card>
    </Link>
  );
};

export default WordCard;
