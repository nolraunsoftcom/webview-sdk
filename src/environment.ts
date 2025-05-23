import { WebViewBridge } from "./bridge";

export class Environment {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  get version() {
    return "1.0.0";
  }

  /**
   * @returns true if the user is on a web browser
   */
  get isWeb() {
    return !window.navigator.userAgent.includes("Appify");
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
    return this.isApp && window.navigator.userAgent.includes("OS:ios");
  }

  /**
   * @returns true if the user is on an Android app
   */
  get isAndroid() {
    return this.isApp && window.navigator.userAgent.includes("OS:android");
  }
}
