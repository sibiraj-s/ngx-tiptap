import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // @todo: After v3 tailwindcss update tailwind config resolves path from root
    './projects/demo/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
