export default {
  name: "internalWordLink",
  type: "object",
  title: "Ord-kobling",
  fields: [
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: [{ type: "word" }],
    },
  ],
};
