const tailwindConfig = new URL('./tailwind.config.ts', import.meta.url).pathname;

export default {
  plugins: {
    tailwindcss: {
      config: tailwindConfig,
    },
    autoprefixer: {},
  },
}
