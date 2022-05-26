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
