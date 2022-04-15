import { EventEmitter as Emitter } from "events";
import { Unpackr } from "msgpackr";
import { config } from "./config";
import { PacketType } from "./enums/packet-type.enum";

export const unpacker = new Unpackr(config);

export class Decoder extends Emitter {
  add(chunk: any) {
    const packet = unpacker.unpack(chunk);

    if (this.isPacketValid(packet)) {
      this.emit("decoded", packet);
    } else {
      throw new Error("invalid format");
    }
  }

  isPacketValid({ type, data, nsp, id }: any) {
    const isNamespaceValid = typeof nsp === "string";
    const isAckIdValid = id === undefined || Number.isInteger(id);

    if (!isNamespaceValid || !isAckIdValid) {
      return false;
    }

    switch (type) {
      case PacketType.CONNECT:
        return data === undefined || typeof data === "object";
      case PacketType.DISCONNECT:
        return data === undefined;
      case PacketType.EVENT:
        return Array.isArray(data) && data.length > 0;
      case PacketType.ACK:
        return Array.isArray(data);
      case PacketType.CONNECT_ERROR:
        return typeof data === "object";
      default:
        return false;
    }
  }

  destroy() {}
}
