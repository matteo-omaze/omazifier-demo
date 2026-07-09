module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Downlevel private class fields/methods so this toolchain's hermesc can compile
    // React Native's internal DOMRect classes (which use `#private` syntax).
    plugins: [
      "@babel/plugin-transform-private-methods",
      "@babel/plugin-transform-private-property-in-object",
      "@babel/plugin-transform-class-properties",
    ],
  };
};
