const plugin1 = require('flowbite/plugin');
const plugin2 = require('daisyui');

module.exports = {
  content: ["./src/**/*.{html,js}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [ plugin1, plugin2,],
}
