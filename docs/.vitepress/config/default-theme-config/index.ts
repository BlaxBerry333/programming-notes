import { DefaultTheme } from "vitepress";

import { DEFAULT_THEME_NAVBAR } from "./default-theme-navbar";
import { DEFAULT_THEME_SIDEBAR } from "./default-theme-sidebar";

export const DEFAULT_THEME_CONFIG: DefaultTheme.Config = {
  siteTitle: "BlaxBerry's 编程学习笔记",
  logo: "/favicon.ico",
  footer: {
    message: "",
    copyright: `Copyright © 2023-${new Date().getFullYear()} BlaxBerry`,
  },

  nav: DEFAULT_THEME_NAVBAR,

  sidebar: DEFAULT_THEME_SIDEBAR,

  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/BlaxBerry333/programming-notes",
    },
  ],
};
