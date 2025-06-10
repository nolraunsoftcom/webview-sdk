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
    this.bridge.sendMessage(MESSAGE_KEY.location.checkPermission, callback);
  }

  getCurrentPosition(callback: (position: Position) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.location.getCurrentPosition, callback);
  }
}
