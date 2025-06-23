import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Share {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  systemShare(options: any, callback: (result: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.share.systemShare,
      (response: any) => {
        callback(response);
        unmounted();
      },
      options
    );
  }

  kakaoShare(options: any, callback: (result: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.share.kakaoShare,
      (response: any) => {
        callback(response);
        unmounted();
      },
      options
    );
  }
}
