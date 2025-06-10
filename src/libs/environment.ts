import { WebViewBridge } from "../bridge";

export class Environment {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  /**
   * @returns true if the user is on an app
   */
  get isApp() {
    return window.navigator.userAgent.includes("Appify");
  }

  /**
   * @returns true if the user is on an iOS app
   */
  get isIOS() {
    return /iPhone|iPad|iPod/.test(window.navigator.userAgent);
  }

  /**
   * @returns true if the user is on an Android app
   */
  get isAndroid() {
    return /Android|android/.test(window.navigator.userAgent);
  }
}
