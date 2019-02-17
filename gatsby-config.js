module.exports = {
  pathPrefix: "/irrigation-tool-v2",
  siteMetadata: {
    title: `Irrigation Tool`,
    description: `Irrigation Tool`,
    author: `@alexsinfarosa`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Irrigation Tool`,
        short_name: `IrriTool`,
        start_url: `/`,
        // This is used on splash screen when app is launched
        background_color: `#663399`,
        // Web app theme color
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
