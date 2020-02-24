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
      url: '/gallery/'
    }
  ],

  headerHeight: 100,

  white: '#e6f1ff',
  black: '#000000',

  srConfig: (delay = 200) => {
    return {
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay,
      rotate: { x: 0, y: 0, z: 0 },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      mobile: true,
      reset: false,
      useDelay: 'always',
      viewFactor: 0.25,
      viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    };
  },
};