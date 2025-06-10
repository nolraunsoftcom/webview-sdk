import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Storage {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }
}
