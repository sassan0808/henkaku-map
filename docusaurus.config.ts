import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '変革手段の地図',
  tagline: '組織変革の手段を体系化した知識ベース',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sassan0808.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/henkaku-map/',

  // GitHub pages deployment config.
  organizationName: 'sassan0808',
  projectName: 'henkaku-map',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/sassan0808/henkaku-map/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '変革手段の地図',
      logo: {
        alt: '変革手段の地図',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '変革手段を探す',
        },
        {
          href: 'https://github.com/sassan0808/henkaku-map',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '変革手段',
          items: [
            { label: '変革とは', to: '/docs/変革/概要' },
            { label: 'ツール導入', to: '/docs/ツール導入/概要' },
            { label: '社内研修', to: '/docs/研修/社内研修' },
            { label: '人材登用', to: '/docs/人材登用/概要' },
            { label: '外部パートナー', to: '/docs/外部パートナー/概要' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} 変革手段の地図`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
