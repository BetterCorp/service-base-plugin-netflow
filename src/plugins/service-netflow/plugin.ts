const NetFlowCollector = require("@bettercorp/node-netflowv9");
import { ServiceCallable, ServicesBase } from "@bettercorp/service-base";
import {
  NetflowData,
  NetflowDataFlowItem,
  NetflowDataHeader,
  NetflowDataRInfo,
} from "./interfaces";
import { MyPluginConfig } from "./sec.config";

// On Emit events
export interface NetflowOnEvents extends ServiceCallable {
  data(
    src: NetflowDataRInfo,
    header: NetflowDataHeader,
    flows: Array<NetflowDataFlowItem>
  ): Promise<void>;
  template(
    src: NetflowDataRInfo,
    header: NetflowDataHeader,
    flows: Array<NetflowDataFlowItem>
  ): Promise<void>;
}

export class Service extends ServicesBase<
  ServiceCallable,
  NetflowOnEvents,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  private NetflowCollector: any;
  async init() {
    const self = this;
    self.NetflowCollector = new NetFlowCollector({
      port: (await self.getPluginConfig()).port,
    });
    self.NetflowCollector.on("data", async (flow: NetflowData) => {
      self.log.info("Received log from: {address}", {
        address: flow.rinfo.address,
      });
      await self.emitEvent("data", flow.rinfo, flow.header, flow.flows);
    });
    self.NetflowCollector.on("template", async (flow: NetflowData) => {
      self.log.info("Received template from: {address}", {
        address: flow.rinfo.address,
      });
      self.emitEvent("template", flow.rinfo, flow.header, flow.flows);
    });
    self.log.info("NetFlow listening on port: {port}", {
      port: (await self.getPluginConfig()).port,
    });
  }
}
