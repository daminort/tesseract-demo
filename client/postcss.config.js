module.exports = {
  plugins: [
    require('postcss-import'),
    // require('postcss-nested'),
    require('tailwindcss'),
    [
      "postcss-preset-env",
      {
        stage: 3,
        features: {
          "nesting-rules": true,
        },
      },
    ],
    require('autoprefixer'),
  ]
}
