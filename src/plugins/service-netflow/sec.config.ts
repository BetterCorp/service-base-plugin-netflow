import { SecConfig } from '@bettercorp/service-base';

export interface MyPluginConfig {
  port: number; // Netflow Server Port: The port to which to host the netflow server on
}

export class Config extends SecConfig<MyPluginConfig> {
  migrate(
    mappedPluginName: string,
    existingConfig: MyPluginConfig
  ): MyPluginConfig {
    return {
      port: existingConfig.port || 2055
    };
  }
}
