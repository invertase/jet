const users = [
  {
    caption: 'React Native Firebase',
    image:
      'https://camo.githubusercontent.com/dbea9e8e1413431453c9df6876dedf678c0f8a63/68747470733a2f2f692e696d6775722e636f6d2f65424e4a6c48642e706e67',
    infoLink: 'https://github.com/invertase/react-native-firebase',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Bridge' /* title for your website */,
  tagline:
    'Bring your React Native JS code into Node.js and test it mock-free and native code free.',
  url: 'https://facebook.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'bridge',
  headerLinks: [
    { doc: 'getting-started', label: 'Docs' },
    { doc: 'api', label: 'API' },
    { page: 'help', label: 'Help' },
    { search: true },
  ],
  algolia: {
    apiKey: 'TODO',
    indexName: 'TODO',
  },
  users,
  /* path to images for header/footer */
  headerIcon: 'img/bridge.png',
  footerIcon: 'img/bridge.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#f9a446',
    secondaryColor: '#f9a446',
  },
  /* custom fonts for website */
  /* fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  }, */
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Invertase Limited`,
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/invertase/bridge',
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
};

module.exports = siteConfig;
