import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Clipboard {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  getText(callback: (text: string) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.clipboard.getText, callback);
  }

  setText(text: string, callback: (success: boolean) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.clipboard.setText, callback, text);
  }
}
