import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Download {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  file(url: string, callback: (result: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.download.downloadFile,
      (result: boolean) => {
        callback(result);
        unmounted();
      },
      url
    );
  }

  image(url: string, callback: (result: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.download.imageFile,
      (result: boolean) => {
        callback(result);
        unmounted();
      },
      url
    );
  }
}
