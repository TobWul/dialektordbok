export default {
  name: "bokmalWord",
  type: "document",
  title: "Bokmålsord",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Ordet",
      validation: (Rule) => Rule.required(),
    },
  ],
};
