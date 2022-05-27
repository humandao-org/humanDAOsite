module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'bungee':['"Bungee"'],
        'play':['"Play"'],
      },      
    },
  },
  plugins: [],
}
