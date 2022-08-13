/* config-overrides.js */
let vendorName = "vendor";
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.optimization.splitChunks.name = vendorName;
  return config;
};
