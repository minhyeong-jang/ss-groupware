const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

module.exports = function (api) {
  api.cache(() => !isDevelopment);

  return {
    presets: ["next/babel"],
    plugins: [
      // @see https://styled-components.com/docs/tooling
      [
        "styled-components",
        {
          ssr: false,
          pure: !isDevelopment,
          displayName: isDevelopment,
          minify: !isDevelopment,
          transpileTemplateLiterals: !isDevelopment,
        },
      ],
    ],
  };
};
