import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Device {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  getInfo(callback: (info: {}) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.device.getInfo, callback);
  }
}
