module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|gray)-(100|200|300|400|500)/,
    },
    {
      pattern: /^(block|inline(-block)?|flex|grid|hidden)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /order-(\d+|first|last)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /items-(start|center|end)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /justify-(between|around|evenly)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern:  /rounded(-[b|t|r|l])?-.*/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /max-w-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /text-(sm|md|xl|left|right|center|justify)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /text-(white|black|gray)/,
    },
    {
      pattern: /text-(white|black|gray)-(100|200|300|400|500)/
    },
    {
      pattern: /m(x|y|t|b|r|l)?-\d+/,
      variants: ['2xl', 'xl', 'sm', 'lg', 'md'],
    },
    {
      pattern: /text-\d+xl/,
      variants: ['xl', 'sm', 'lg', 'md'],
    },
    {
      pattern: /gap-\d+/,
      variants: ['xl', 'sm', 'lg', 'md'],
    },
    {
      pattern: /[w|h]-.+/,
      variants: ['xl', 'sm', 'lg', 'md'],
    },
    {
      pattern: /p([x|y|b|t|l|r])?-\d+/,
      variants: ['xl', 'sm', 'lg', 'md'],
    },
    { 
      pattern: /grid-cols-.+/,
      variants: ['xl', 'lg', 'md', 'sm'],
    },
    { 
      pattern: /col-span-.+/,
      variants: ['xl', 'lg', 'md', 'sm'],
    },
    { 
      pattern: /space-[x|y]-.+/,
      variants: ['xl', 'lg', 'md', 'sm'],
    },
    { 
      pattern: /gap-.+/,
      variants: ['xl', 'lg', 'md', 'sm'],
    },
    { 
      pattern: /(in)?visible/,
      variants: ['xl', 'lg', 'md', 'sm'],
    },
    {
      pattern: /bg-opacity-\d+/,
      variants: ['xl', 'lg', 'md', 'sm'],
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
