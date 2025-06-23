import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Haptic {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  trigger(type: string) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.haptic.trigger,
      () => {
        unmounted();
      },
      type
    );
  }
}
