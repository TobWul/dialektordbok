export default {
  name: "wordClass",
  type: "document",
  title: "Ordklasse",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Navn på ordklassen",
    },
    {
      name: "shortDescription",
      type: "string",
      title: "Kort beskrivelse",
    },
    {
      name: "description",
      type: "blockContent",
      title: "Beskrivelse",
    },
  ],
};
