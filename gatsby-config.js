module.exports = {
  pathPrefix: "/lawn-irrigation-tool-v2",
  siteMetadata: {
    title: `Lawn Irrigation Tool`,
    description: `Lawn irrigation tool`,
    author: `Alex Sinfarosa - @alexsinfarosa`,
  },
  plugins: [
    "gatsby-plugin-top-layout",
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lawn-irrigation-tool`,
        short_name: `LawnIrriTool`,
        // start_url: `/lawn-irrigation-tool-v2`,
        start_url: `/`,
        background_color: `#556cd6`,
        theme_color: `#556cd6`,
        display: `standalone`,
        icon: `src/images/sprinkler.png`,
        // crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
