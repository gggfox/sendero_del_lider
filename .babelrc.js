module.exports = {
    presets: [
      
    ],
    plugins: [
      'babel-plugin-react-compiler',
      [
        "@stylexjs/babel-plugin",
        {
          dev: process.env.NODE_ENV === "development",
          test: process.env.NODE_ENV === "test",
          runtimeInjection: false,
          treeshakeCompensation: true,
          unstable_moduleResolution: {
            type: "commonJS",
          },
        },
      ],
    ],
  };