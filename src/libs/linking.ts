import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Linking {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  openSettings() {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.linking.openSettings,
      () => {
        unmounted();
      }
    );
  }

  externalBrowser(url: string) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.linking.externalBrowser,
      () => {
        unmounted();
      },
      url
    );
  }

  inappBrowser(url: string) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.linking.inappBrowser,
      () => {
        unmounted();
      },
      url
    );
  }
}
