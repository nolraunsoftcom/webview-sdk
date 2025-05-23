import { WebViewBridge } from "./bridge";
import { MESSAGE_KEY } from "./key";

export class Notification {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.notification.checkPermission, callback);
  }

  getToken(callback: (token: string) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.notification.getToken, callback);
  }
}
