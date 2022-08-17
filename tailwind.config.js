const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'md:gap-8',
    {
      pattern: /bg-(red|green|blue)-(100|200|300)/,
    },
    {
      pattern: /max-w-.+/,
    },
    {
      pattern: /text-[left|right|center|justify]/,
    },
    {
      pattern: /p-\d+/,
      variants: ['sm', 'lg', 'md'],
    },
    {
      pattern: /w-.+/,
    },
    {
      pattern: /py-\d+/,
      variants: ['sm', 'lg', 'md'],
    },
    {
      pattern: /pt-\d+/,
      variants: ['sm', 'lg', 'md'],
    },
    {
      pattern: /pb-\d+/,
      variants: ['sm', 'lg', 'md'],
    },
    {
      pattern: /grid-cols-.+/,
      variants: ['lg', 'md'],
    },
    {
      pattern: /gap-.+/,
      variants: ['lg', 'md'],
    },
  ],
  theme: {
    extend: {
      // [COLORS]
      colors: {
        primary: '#DD5B88',
        secondary: '#9C27B0',
        'cool-gray-900': '#111827',
        dark: '#0f0f0f',
        accent: {
          purple: '#806AD2',
        },
        moonbirdf: '#1c1e63',
        moonbirdt: '#174b80',
        moonbirdg: '#d7f0d3',
        moonbirdb: '#1b457f',
        moonbirde: '#24327e',
        moonbirdbox: '#c4dfbf',
        bffm: '#fec74f',
        bffv: '#e768a7',
        bffb: '#fec74f',

        // [FOR SOCIAL ICONS]
        social: {
          facebook: '#3b5998',
          twitter: '#55acee',
          pinterest: '#bd081c',
          linkedin: '#0077b5',
          whatsapp: '#43d854',
          youtube: '#cd201f',
          instagram: '#e95950',
          discord: '#5865F2',
        },
      },

      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'bungee': ['"Bungee"'],
        'play': ['"Play"'],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Inter', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans],
        primary: ['Gilroy', ...defaultTheme.fontFamily.sans],
        secondary: ['Roboto', ...defaultTheme.fontFamily.sans],
      },

      // [WIDTHS]
      maxWidth: {
        content: '1300px',
      },

      // [BACKGROUNDS]
      backgroundImage: {
        card: "url('/assets/images/balance-info.png')",
        heroimg: "url('https://res.cloudinary.com/daljbo1q0/image/upload/v1659684071/hdao%20art%20contest/banner_upside_qchpfp.png')",
      },

      // [FONT SIZES]
      fontSize: {
        '3.5xl': '32px',
      },

      boxShadow: {
        sm: '4px 6px 4px rgba(0, 0, 0, 0.1)',
        circle: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        box: '4px 2px 4px rgba(0, 0, 0, 0.1)',
        clip: '4px 2px 4px rgba(0, 0, 0, 0.1)',
        'inner-sm': 'inset -2px -2px 5px rgba(0, 0, 0, 0.1)',
      },

      letterSpacing: {
        'default': '0.54px',
      },
    },
  },
  plugins: [],
};
