export interface NetflowDataHeader {
  version: number;
  count: number;
  uptime: number;
  seconds: number;
  sequence: number;
  sourceId: number;
}
export interface NetflowDataRInfo {
  address: string;
  family: string;
  port: number;
  size: number;
}
export interface NetflowDataFlowItem {
  in_pkts: number;
  in_bytes: number;
  ipv4_src_addr: string;
  ipv4_dst_addr: string;
  input_snmp: number;
  output_snmp: number;
  last_switched: number;
  first_switched: number;
  l4_src_port: number;
  l4_dst_port: number;
  out_as: number;
  in_as: number;
  bgp_ipv4_next_hop: string;
  src_mask: number;
  dst_mask: number;
  protocol: number;
  tcp_flags: number;
  src_tos: number;
  direction: number;
  fw_status: number;
  flow_sampler_id: number;
}
export interface NetflowData {
  header: NetflowDataHeader;
  rinfo: NetflowDataRInfo;
  packet: Buffer;
  flows: Array<NetflowDataFlowItem>;
}
