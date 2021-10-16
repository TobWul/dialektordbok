import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { word } from "./Word.module.scss";

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const Word = ({ word }) => {
  return (
    <div className={word}>
      <BlockContent blocks={word} serializers={serializers} />
    </div>
  );
};

export default Word;
