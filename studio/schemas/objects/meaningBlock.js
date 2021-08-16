export default {
  name: "meaningBlock",
  type: "array",
  title: "Betydning",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
    },
    {
      type: "internalWordLink",
    },
  ],
};
