const presets = [
  ["@babel/preset-env", { // Pass a config object to the preset
    debug: true, // Output the targets/plugins used when compiling
  }],
];

const plugins = [];

// Export a config object.
module.exports = { presets, plugins };
