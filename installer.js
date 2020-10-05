exports.default = ( jsonConfig, pluginName ) => {
  jsonConfig.plugins = jsonConfig.plugins || {};
  jsonConfig.plugins[ pluginName ] = jsonConfig.plugins[ pluginName ] || {};
  jsonConfig.plugins[ pluginName ].port = jsonConfig.plugins[ pluginName ].port || 2055;

  return jsonConfig;
}