export default {
  name: "sentence",
  type: "document",
  title: "Setning / Uttrykk",
  fields: [
    {
      name: "text",
      type: "text",
      title: "Teksten",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "meaning",
      type: "text",
      title: "Betydning",
      description:
        "Oversatt til bokmål, eller hva uttrykket betyr (hvis metaforisk)",
    },
    {
      name: "words",
      type: "array",
      title: "Ord i setningen / uttrykket",
      of: [{ type: "reference", to: [{ type: "word" }] }],
    },
    {
      name: "dialects",
      type: "array",
      title: "Tilhører i dialektene:",
      of: [{ type: "reference", to: [{ type: "dialect" }] }],
    },
  ],
};
