const NetFlowCollector = require('@bettercorp/node-netflowv9');
import { IPlugin, PluginFeature } from '@bettercorp/service-base/lib/ILib';
import { NetflowData } from './NetflowData';
import { NetflowTemplate } from './NetflowTemplate';

export class Plugin implements IPlugin {
  private NetflowCollector: any;

  init (features: PluginFeature): Promise<void> {
    const self = this;
    return new Promise((resolve) => {
      self.NetflowCollector = new NetFlowCollector({ port: features.getPluginConfig().port });
      self.NetflowCollector.on('data', function (flow: any) {
        features.log.info(`Received log from: ${flow.rinfo.address}`);
        features.emitEvent<NetflowData>(null, 'data', {
          src: flow.rinfo,
          header: flow.header,
          flows: flow.flows
        });
      });
      self.NetflowCollector.on('template', function (flow: any) {
        features.log.info(`Received template from: ${flow.rinfo.address}`);
        features.emitEvent<NetflowTemplate>(null, 'template', {
          src: flow.rinfo,
          header: flow.header,
          flows: flow.flows
        });
      });
      features.log.info(' - - NetFlow listening on port: ' + features.getPluginConfig().port);
      resolve();
    });
  }
}