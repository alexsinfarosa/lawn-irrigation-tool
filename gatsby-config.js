module.exports = {
  pathPrefix: process.env.GATSBY_PATH_PREFIX, // it only works if you run gatsby build --prefix-paths
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lawn-irrigation-tool`,
        short_name: `Irrigation Tool`,
        start_url: process.env.GATSBY_PATH_PREFIX,
        background_color: `#556cd6`,
        theme_color: `#556cd6`,
        display: `standalone`,
        icon: `src/images/sprinkler.png`,
        // crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-137506548-1",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
