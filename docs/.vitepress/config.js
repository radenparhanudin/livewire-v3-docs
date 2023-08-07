import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Livewire V3 Docs",
  description: "Documentation for Livewire V3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: '/quickstart' },
    ],

    sidebar: [
      {
        text: 'GETTING STARTED',
        items: [
          { text: 'Quickstart', link: '/quickstart' },
          { text: 'Installation', link: '/installation' },
          { text: 'Upgrade Guide', link: '/upgrading' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
