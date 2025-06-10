import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Linking {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  openSettings() {
    this.bridge.sendMessage(MESSAGE_KEY.linking.openSettings, () => null);
  }

  externalBrowser(url: string) {
    this.bridge.sendMessage(
      MESSAGE_KEY.linking.externalBrowser,
      () => null,
      url
    );
  }

  inappBrowser(url: string) {
    this.bridge.sendMessage(MESSAGE_KEY.linking.inappBrowser, () => null, url);
  }
}
