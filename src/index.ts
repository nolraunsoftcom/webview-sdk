import { WebViewBridge } from "./bridge";
import { Environment } from "./environment";
import { Notification } from "./notification";

(function () {
  class AppifySDK {
    private bridge: WebViewBridge = new WebViewBridge();
    private notification: Notification;
    private environment: Environment;

    constructor() {
      this.notification = new Notification(this.bridge);
      this.environment = new Environment(this.bridge);
      this.initialized();
      this.overrideHistory();
    }

    private injectMetaTag() {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(meta);
    }

    private overrideHistory() {
      const wrap = (method: "pushState" | "replaceState") => {
        const original = history[method];
        history[method] = (...args) => {
          const result = original.apply(history, args);
          this.bridge.postMessage({
            key: method,
            value: "navigationStateChange",
          });
          return result;
        };
      };

      wrap("pushState");
      wrap("replaceState");

      window.addEventListener("popstate", () => {
        this.bridge.postMessage({
          key: "popstate",
          value: "navigationStateChange",
        });
      });
    }

    private initialized() {
      window.isInitialized = true;
    }
  }

  window.isWebviewInitialized = true;
  window.isWebview = true;
  window.appify = new AppifySDK();
})();
