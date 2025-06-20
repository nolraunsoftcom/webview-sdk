import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Analytics {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  logEvent(eventName: string, params: Record<string, any>) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.analytics.logEvent,
      () => {
        unmounted();
      },
      {
        eventName,
        params,
      }
    );
  }
}
