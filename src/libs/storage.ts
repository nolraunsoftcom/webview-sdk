import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Storage {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  getItem(key: string, callback: (value: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.storage.getItem,
      (response: any) => {
        callback(response);
        unmounted();
      },
      key
    );
  }
  setItem(key: string, value: any, callback: (success: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.storage.setItem,
      (response: boolean) => {
        callback(response);
        unmounted();
      },
      {
        key,
        value,
      }
    );
  }
  removeItem(key: string, callback: (success: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.storage.removeItem,
      (response: boolean) => {
        callback(response);
        unmounted();
      },
      key
    );
  }
  clear(callback: (success: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.storage.clear,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }
}
