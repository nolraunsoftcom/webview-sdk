import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Camera {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.camera.checkPermission,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }

  barcodeScan() {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.camera.barcodeScan,
      () => {
        unmounted();
      }
    );
  }

  barcodeScanEventListener(callback: (result: string) => void) {
    const unmounted = this.bridge.onMessage(
      MESSAGE_KEY.camera.barcodeScanReceiveMessage,
      callback
    );

    return unmounted;
  }
}
