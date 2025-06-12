import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Camera {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.camera.checkPermission, callback);
  }

  barcodeScan() {
    this.bridge.sendMessage(MESSAGE_KEY.camera.barcodeScan, () => {});
  }

  barcodeScanReceiveMessage({ cb }: { cb: (result: string) => void }) {
    this.bridge.onMessage(MESSAGE_KEY.camera.barcodeScanReceiveMessage, cb);
  }
}
