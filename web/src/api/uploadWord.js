import fetch from "node-fetch";
const { makeId } = require("../lib/helpers");

const generateNewWordStructure = (word, meaning, dialectID) => ({
  _type: "word",
  word: [
    {
      _key: makeId(12),
      _type: "block",
      children: [
        {
          _key: makeId(12),
          _type: "span",
          marks: [],
          text: word,
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  meaning: [
    {
      _key: makeId(12),
      _type: "block",
      children: [
        {
          _key: makeId(12),
          _type: "span",
          marks: [],
          text: meaning,
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  dialects: [
    {
      _key: makeId(12),
      _ref: dialectID,
      _type: "reference",
    },
  ],
});

const generateNewSentenceStructure = (sentence, meaning, dialectID) => ({
  _type: "sentence",
  text: sentence,
  meaning,
  dialects: [
    {
      _key: makeId(12),
      _ref: dialectID,
      _type: "reference",
    },
  ],
});

export default async function postNewWordHandler(req, res) {
  const url = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.SANITY_PROJECT_DATASET}`;
  const isSentenceNotWord =
    (req.body.word.match(new RegExp(" ", "g")) || []).length > 1;
  const mutations = [
    {
      create: isSentenceNotWord
        ? generateNewSentenceStructure(
            req.body.word,
            req.body.meaning,
            req.body.dialectID
          )
        : generateNewWordStructure(
            req.body.word,
            req.body.meaning,
            req.body.dialectID
          ),
    },
  ];
  try {
    const result = fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
