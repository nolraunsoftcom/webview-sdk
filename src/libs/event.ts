import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Event {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  appStateChange(callback: (data: string) => void) {
    const unmounted = this.bridge.onMessage(
      MESSAGE_KEY.event.appStateChange,
      callback
    );

    return unmounted;
  }
}
