const path = require("path");
const { slugify, blockToPlainText } = require("./src/lib/helpers");

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  let count = 0;
  const { createPage } = actions;
  const printPage = path => {
    console.log("  • " + path);
    count++;
  };
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      query {
        allSanityWord {
          edges {
            node {
              _id
              word: _rawWord
            }
          }
          totalCount
        }
        allSanityDialect {
          edges {
            node {
              _id
              name
            }
          }
        }
        allSanitySentence {
          edges {
            node {
              _id
              text
            }
          }
        }
      }
    `
  );

  const wordEdges = (result.data.allSanityWord || {}).edges || [];
  const dialectEdges = (result.data.allSanityDialect || {}).edges || [];
  const sentenceEdges = (result.data.allSanitySentence || {}).edges || [];

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each markdown file.
  const wordTemplate = path.resolve("./src/templates/wordPage/wordPage.js");
  const sentenceTemplate = path.resolve(
    "./src/templates/sentencePage/sentencePage.js"
  );
  const dialectTemplate = path.resolve(
    "./src/templates/dialectPage/dialectPage.js"
  );

  console.log("\n\n--------- Generating pages ---------");

  console.log("\nWords:");
  wordEdges.forEach(({ node: word }) => {
    const path = "/" + slugify(blockToPlainText(word.word));
    printPage(path);
    createPage({
      path,
      component: wordTemplate,
      context: { id: word._id },
    });
  });
  console.log("\nSentences:");
  sentenceEdges.forEach(({ node: sentence }) => {
    const path = "/" + slugify(sentence.text);
    printPage(path);
    createPage({
      path,
      component: sentenceTemplate,
      context: { id: sentence._id },
    });
  });
  console.log("\nDialects:");
  dialectEdges.forEach(({ node: dialect }) => {
    const path = "/" + slugify(dialect.name);
    printPage(path);
    createPage({
      path,
      component: dialectTemplate,
      context: { dialectID: dialect._id, name: dialect.name },
    });
  });

  console.log(`\nGenerated ${count} pages\n--------------------------\n\n`);
};
