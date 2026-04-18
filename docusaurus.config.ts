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
          type: 'doc',
          docId: '課題マップ/概要',
          position: 'left',
          label: '課題から探す',
        },
        {
          type: 'doc',
          docId: '変革マップ/概要',
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
          title: '課題から探す',
          items: [
            { label: 'A. 意思決定・戦略', to: '/docs/課題マップ/A_意思決定・戦略' },
            { label: 'B. 人・組織文化', to: '/docs/課題マップ/B_人・組織文化' },
            { label: 'C. 実行力・オペレーション', to: '/docs/課題マップ/C_実行力・オペレーション' },
            { label: 'D. 知見・情報', to: '/docs/課題マップ/D_知見・情報' },
            { label: 'E. 成長・外部連携', to: '/docs/課題マップ/E_成長・外部連携' },
            { label: 'F. 資金・財務', to: '/docs/課題マップ/F_資金・財務' },
          ],
        },
        {
          title: '変革手段',
          items: [
            { label: '知見・意思決定の変革', to: '/docs/変革マップ/知見・意思決定の変革/概要' },
            { label: '人・能力の変革', to: '/docs/変革マップ/人・能力の変革/概要' },
            { label: '体制・人材の変革', to: '/docs/変革マップ/体制・人材の変革/概要' },
            { label: '実行・プロセスの変革', to: '/docs/変革マップ/実行・プロセスの変革/概要' },
            { label: '販路・外部資本の変革', to: '/docs/変革マップ/販路・外部資本の変革/概要' },
            { label: '資金・財務の変革', to: '/docs/変革マップ/資金・財務の変革/概要' },
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
