const path = require("path")
const { slugify, blockToPlainText } = require("./src/lib/helpers")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  let count = 0
  const { createPage } = actions
  const printPage = path => {
    console.log("  • " + path)
    count++
  }
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
      }
    `
  )

  const wordEdges = (result.data.allSanityWord || {}).edges || []

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const wordTemplate = path.resolve("./src/templates/wordPage/wordPage.js")

  console.log("\n\n--------- Generating pages ---------")

  // Creating contracts
  wordEdges.forEach(({ node: word }) => {
    const path = "/" + slugify(blockToPlainText(word.word))
    printPage(path)
    createPage({
      path,
      component: wordTemplate,
      context: { id: word._id },
    })
  })

  console.log(`\nGenerated ${count} pages\n--------------------------\n\n`)
}
