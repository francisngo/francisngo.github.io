const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.siteAuthor,
    siteUrl: config.siteUrl,
    getform_url: config.siteGetFormURL,
  },
  
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsJson.name`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
          fonts: [
            `Montserrat ital`,
            `sans-serif\:300`, `300i`, `400`, `400i`, `500`, `600`, `700`, `900`
        ],
        fonts: [
          `Mulish`,
          `sans-serif\:300`, `400`, `500`, `600`, `700`
        ],
        display: 'swap',
      },
    },
  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'FrancisNgo',
        short_name: 'FrancisNgo',
        start_url: '/',
        background_color: config.black,
        theme_color: config.white,
        display: 'minimal-ui',
        icon: 'src/assets/images/logo/logo.png',
      },
    },

    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
  },

  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1920
          },
        },
      ],
    },
  },

  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sass`,
  `gatsby-transformer-json`,
  ],
};
