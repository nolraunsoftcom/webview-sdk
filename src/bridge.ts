import { MESSAGE_KEY } from "./utils/key";

type MessageCallback = (value: any) => void;

function getTimeout(key: string) {
  if (key === MESSAGE_KEY.haptic.trigger) {
    return 50;
  }
  return 1000;
}

export class WebViewBridge {
  private ReactNativeWebView: any;
  private messageHandlers: Map<string, MessageCallback> = new Map();

  constructor() {
    this.ReactNativeWebView = window.ReactNativeWebView;
    if (!this.ReactNativeWebView) {
      console.warn("WebViewBridge: ReactNativeWebView not available.");
    }
  }

  public postMessage(message: string | object) {
    try {
      const payload =
        typeof message === "string" ? message : JSON.stringify(message);
      this.ReactNativeWebView?.postMessage(payload);
    } catch (err) {
      console.warn("WebViewBridge: Failed to post message:", err);
    }
  }

  public sendMessage(
    key: string,
    callback: MessageCallback,
    payload?: any
  ): () => void {
    if (this.messageHandlers.has(key)) {
      console.warn("WebViewBridge: Duplicate key:", key);
      return () => {};
    }

    if (!this.ReactNativeWebView) {
      console.warn("WebViewBridge: bridge not available.");
      return () => {};
    }

    const handler = (event: Event) => {
      const message = event as MessageEvent;
      if (typeof message.data !== "string") return;

      try {
        const data = JSON.parse(message.data);
        if (data.key === key) {
          this.messageHandlers.get(key)?.(data.value);
          this.messageHandlers.delete(key);
          window.removeEventListener("message", handler);
          document.removeEventListener("message", handler);
        }
      } catch (e) {
        console.error("WebViewBridge: Invalid message format", e);
      }
    };

    this.messageHandlers.set(key, callback);
    window.addEventListener("message", handler);
    document.addEventListener("message", handler);

    setTimeout(() => {
      this.postMessage({ key, value: payload });
    }, 0);

    const timeout = setTimeout(() => {
      this.messageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    }, getTimeout(key));

    return () => {
      clearTimeout(timeout);
      this.messageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    };
  }
}
