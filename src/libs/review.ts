import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class AppReview {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  request(callback: (result: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.review.request,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }
}
