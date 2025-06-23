import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

interface Position {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export class Location {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.location.checkPermission,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }

  getCurrentPosition(callback: (position: Position) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.location.getCurrentPosition,
      (response: Position) => {
        callback(response);
        unmounted();
      }
    );
  }
}
