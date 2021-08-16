export default {
  name: "word",
  type: "document",
  title: "Ord",
  fields: [
    {
      name: "word",
      type: "wordBlock",
      title: "Ordet",
      description:
        "Verb: Infinitiv (eks: å lese), Substantiv: Ubestemt entall, Adjektiv: positiv (eks: fin)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "meaning",
      type: "meaningBlock",
      title: "Betydning",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "wordClass",
      type: "reference",
      to: [{ type: "wordClass" }],
      title: "Ordklasse",
    },
    {
      name: "alternateSpelling",
      type: "string",
      title: "Alternative stavemåter",
      description: 'Skill ordene med et komma (",")',
    },
    {
      name: "bokmalOrd",
      type: "reference",
      title: "Bokmålsordet",
      to: [{ type: "bokmalWord" }],
    },
    {
      name: "dialects",
      type: "array",
      title: "Tilhører i dialektene:",
      of: [{ type: "reference", to: [{ type: "dialect" }] }],
    },
  ],
  preview: {
    select: {
      block: "word",
    },
    prepare(value) {
      const block = (value.blocks || value.block || []).find(
        (block) => block._type === "block"
      );
      return {
        title: block
          ? block.children
              .filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "",
      };
    },
  },
};
