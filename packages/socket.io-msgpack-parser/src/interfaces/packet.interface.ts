import { PacketType } from "../enums/packet-type.enum";

export interface Packet {
  type: PacketType;
  nsp: string;
  data?: any;
  id?: number;
  attachments?: number;
}
