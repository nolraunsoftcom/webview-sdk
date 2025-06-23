import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Notification {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.notification.checkPermission,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }

  getToken(callback: (token: string) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.notification.getToken,
      (response: string) => {
        callback(response);
        unmounted();
      }
    );
  }

  sendLocalNotification(body: { title: string; body: string }) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.notification.sendLocalNotification,
      () => {
        unmounted();
      },
      body
    );
  }
}
