import { type HeadConfig } from "vitepress";

export const SITE_HEAD: HeadConfig[] = [
  /**
   * favicon
   * ----------------------------------------------------------------------------------------------------
   */
  [
    "link",
    {
      rel: "shortcut icon",
      href: "/programming-notes/favicon.ico", // base 需要与仓库名一致才能部署到 GitHub Pages
    },
  ],

  /**
   * Google Font
   * ----------------------------------------------------------------------------------------------------
   */
  [
    "link",
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
  ],
  [
    "link",
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
  ],
  [
    "link",
    {
      href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      rel: "stylesheet",
    },
  ],
];
