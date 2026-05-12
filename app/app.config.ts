export default defineAppConfig({
  global: {
    picture: {
      dark: "/mattrbdr2.webp",
      light: "/mattrbdr2.webp",
      alt: "Mattéo",
    },
    meetingLink: "https://cal.com/matteorbdr/discovery-meeting",
    email: "matteo@rbdr.fr",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Construit avec ♥ par Mattéo`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-instagram",
        to: "https://go.nuxt.com/discord",
        target: "_blank",
        "aria-label": "Nuxt on Discord",
      },
      {
        icon: "i-simple-icons-x",
        to: "https://go.nuxt.com/x",
        target: "_blank",
        "aria-label": "Nuxt on X",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/nuxt/ui",
        target: "_blank",
        "aria-label": "Nuxt UI on GitHub",
      },
      {
        icon: "i-simple-icons-slack",
        to: "https://github.com/nuxt/ui",
        target: "_blank",
        "aria-label": "Nuxt UI on GitHub",
      },
    ],
  },
});
