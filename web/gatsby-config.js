require("dotenv").config()

const environment = process.env.NODE_ENV || "development"

const options = {
  name: "Dialektordbok",
  description: `Nettbasert ordbok for dialekter i Norge`,
  siteUrl: "https://dialektordbok.gatsbyjs.io/",
  author: "tobias@umble.no",
}

module.exports = {
  siteMetadata: {
    title: options.name,
    description: options.description,
    author: options.author,
    siteUrl: options.siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: options.name,
        short_name: options.name,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_PROJECT_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: environment === "development",
        overlayDrafts: environment === "development",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: options.siteUrl,
        sitemap: options.siteUrl + "/sitemap.xml",
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: options.siteUrl,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
