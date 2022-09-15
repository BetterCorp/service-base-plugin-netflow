import {
  ServiceCallable,
  ServicesBase,
  ServicesClient,
} from "@bettercorp/service-base";
import {
  NetflowDataFlowItem,
  NetflowDataHeader,
} from "../../plugins/service-netflow/interfaces";
import { NetflowDataRInfo } from "../../plugins/service-netflow/interfaces";
import { NetflowOnEvents } from "../../plugins/service-netflow/plugin";
import { MyPluginConfig } from "../../plugins/service-netflow/sec.config";

export class NetflowClient extends ServicesClient<
  ServiceCallable,
  NetflowOnEvents,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  public readonly _pluginName: string = "service-netflow";
  constructor(self: ServicesBase) {
    super(self);
  }

  async onData(listener: {
    (
      src: NetflowDataRInfo,
      header: NetflowDataHeader,
      flows: Array<NetflowDataFlowItem>
    ): Promise<void>;
  }) {
    await this._plugin.onEvent("data", listener);
  }

  async onTemplate(listener: {
    (
      src: NetflowDataRInfo,
      header: NetflowDataHeader,
      flows: Array<NetflowDataFlowItem>
    ): Promise<void>;
  }) {
    await this._plugin.onEvent("template", listener);
  }
}
