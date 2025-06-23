import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Clipboard {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  getText(callback: (text: string) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.clipboard.getText,
      (response: string) => {
        callback(response);
        unmounted();
      }
    );
  }

  setText(text: string, callback: (success: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.clipboard.setText,
      (response: boolean) => {
        callback(response);
        unmounted();
      },
      text
    );
  }
}
