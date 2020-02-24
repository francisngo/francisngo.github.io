module.exports = {
  siteTitle: 'Francis Ngo | Software Engineer',
  siteDescription:
    'Francis Ngo is a software engineer based in Los Angeles, CA who specializes in developing high-quality websites and applications.',
  siteKeywords:
    'Francis Ngo, Francis, Ngo, francisngo, software engineer, front-end engineer, web developer, javascript, west coast',
  siteUrl: 'http://francisngo.me',
  siteLanguage: 'en_US',

  name: 'Francis Ngo',
  location: 'Los Angeles, CA',
  email: 'francis.t.ngo@gmail.com',

  socialMedia: [
    {
      name: 'Github',
      url: 'https://www.github.com/francisngo',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/francisngo',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/wheresfrancis',
    },
  ],

  nav: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Gallery',
      url: '/gallery/',
    },
  ],

  headerHeight: 100,

  white: '#e6f1ff',
  black: '#000000',

  srConfig: (delay = 200) => {
    return {
      /*
       * specifies what direction elements come from when revealed
       */
      origin: 'bottom',
      /*
       * contols how far elements move when revealed
       */
      distance: '20px',
      /*
       * controls how long animations take to complete
       */
      duration: 500,
      /*
       * time before reveal animation begins
       */
      delay,
      /*
       * specifies the rotation elements have prior to being revealed
       */
      rotate: { x: 0, y: 0, z: 0 },
      /*
       * specifies the opacity prior to being revealed
       */
      opacity: 0,
      /*
       * specifies the size of elements prior to being revealed
       */
      scale: 1,
      /*
       * controls how animations transition between their start and end values
       */
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      /*
       * enables/disables animations on mobile browsers
       */
      mobile: true,
      /*
       * enables/disables elements returning to their initialized postion when they leave the viewport
       */
      reset: false,
      /*
       * specifies when values assigned to options.delay are used
       */
      useDelay: 'always',
      /*
       * specifies what portion of an element must be within the viewport for it be considered visible
       */
      viewFactor: 0.25,
      /*
       * expands/contracts the active boundaries of the viewport when calculating element visibility
       */
      viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    };
  },
};
