import { MESSAGE_KEY } from "./utils/key";

type MessageCallback = (value: any) => void;

export class WebViewBridge {
  private ReactNativeWebView: any;
  private messageHandlers: Map<string, MessageCallback> = new Map();
  private onMessageHandlers: Map<string, (event: Event) => void> = new Map();

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

    const handler = (event: Event) => {
      const message = event as MessageEvent;
      if (typeof message.data !== "string") return;

      try {
        const data = JSON.parse(message.data);
        if (data.key === key) {
          const callback = this.messageHandlers.get(key);
          if (callback) {
            callback(data.value);
          }
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

    return () => {
      this.messageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    };
  }

  public onMessage(key: string, callback: MessageCallback): () => void {
    // 기존 리스너가 있으면 먼저 제거
    const prevHandler = this.onMessageHandlers.get(key);
    if (prevHandler) {
      window.removeEventListener("message", prevHandler);
      document.removeEventListener("message", prevHandler);
      this.onMessageHandlers.delete(key);
    }

    const handler = (event: Event) => {
      const message = event as MessageEvent;
      if (typeof message.data !== "string") return;

      try {
        const data = JSON.parse(message.data);
        if (data.key === key) {
          callback(data.value);
        }
      } catch (e) {
        console.error("WebViewBridge: Invalid message format", e);
      }
    };

    window.addEventListener("message", handler);
    document.addEventListener("message", handler);
    this.onMessageHandlers.set(key, handler);

    return () => {
      this.onMessageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    };
  }
}
