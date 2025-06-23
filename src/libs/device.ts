import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Device {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  getInfo(callback: (info: {}) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.device.getInfo,
      (response: {}) => {
        callback(response);
        unmounted();
      }
    );
  }

  getIdfaAdid(callback: (id: string | null) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.device.getIdfaAdid,
      (response: string) => {
        callback(response);
        unmounted();
      }
    );
  }
}
