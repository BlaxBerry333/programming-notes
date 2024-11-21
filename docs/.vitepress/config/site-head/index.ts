import { type HeadConfig } from "vitepress";

export const SITE_HEAD: HeadConfig[] = [
  /**
   * favicon
   * ----------------------------------------------------------------------------------------------------
   */
  [
    "link",
    {
      rel: "icon",
      href: "/favicon.ico",
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
