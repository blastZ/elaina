import { Packr } from "msgpackr";
import { config } from "./config";
import { Packet } from "./interfaces/packet.interface";

export const packer = new Packr(config);

export class Encoder {
  encode(packet: Packet) {
    return [packer.pack(packet)];
  }
}
