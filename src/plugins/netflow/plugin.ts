const NetFlowCollector = require('@bettercorp/node-netflowv9');
import { PluginFeature } from '@bettercorp/service-base/lib/ILib';

module.exports.init = (features: PluginFeature) => {
  new NetFlowCollector({ port: features.config.plugins.netflow.port }).on('data', function (flow: any) {
    features.log.info(`Received log from: ${flow.rinfo.address}`)
    features.emitEvent('netflow-data', {
      src: flow.rinfo,
      header: flow.header,
      flows: flow.flows
    });
  }).on('template', function (flow: any) {
    features.log.info(`Received template from: ${flow.rinfo.address}`)
    features.emitEvent('netflow-template', {
      src: flow.rinfo,
      header: flow.header,
      flows: flow.flows
    });
  });
  features.log.info(' - - NetFlow listening on port: ' + features.config.plugins.netflow.port);
};