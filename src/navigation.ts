import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'Games', href: getPermalink('/games') },
    { text: 'News', href: getPermalink('/news') },
    { text: 'About', href: getPermalink('/about') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Games', href: getPermalink('/games') },
        { text: 'News', href: getPermalink('/news') },
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Contact Us', href: getPermalink('/contact') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    Pinoy Bet Games &copy;2026 · All rights reserved.
  `,
};
