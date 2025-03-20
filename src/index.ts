(function () {
  if (window.isWebviewInitialized) return false;

  var RNWebView = window.ReactNativeWebView;
  if (!RNWebView) return false;

  var meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  document.getElementsByTagName("head")[0].appendChild(meta);

  var safePostMessage = (message: string | object) => {
    try {
      RNWebView.postMessage(
        typeof message === "string" ? message : JSON.stringify(message)
      );
    } catch (err) {
      console.warn("Failed to post message:", err);
    }
  };

  var wrapHistoryMethod = (methodName: keyof History) => {
    var original = history[methodName];
    return function wrapped(this: Window, ...args: any[]) {
      var result = original.apply(this, args);
      safePostMessage({ key: methodName, value: "navigationStateChange" });
      return result;
    };
  };
  history.pushState = wrapHistoryMethod("pushState");
  history.replaceState = wrapHistoryMethod("replaceState");
  window.addEventListener("popstate", () => {
    safePostMessage({ key: "popstate", value: "navigationStateChange" });
  });

  window.postMessage = safePostMessage;

  const messageHandlers = new Map<string, (value: any) => void>();
  const messageHandler = (
    key: string,
    callback: (value: any) => void,
    payload?: any
  ) => {
    if (messageHandlers.has(key)) {
      console.warn(`A request with key "${key}" is already in progress.`);
      return;
    }

    const handler = (event: Event) => {
      const messageEvent = event as MessageEvent;
      if (typeof messageEvent.data !== "string") return;

      try {
        const data = JSON.parse(messageEvent.data);
        if (data.key === key) {
          const callbackFn = messageHandlers.get(key);
          if (callbackFn) {
            callbackFn(data.value);
            messageHandlers.delete(key);
          }

          // 이벤트 리스너 제거
          window.removeEventListener("message", handler);
          document.removeEventListener("message", handler);
        }
      } catch (e) {
        console.error("Invalid message format", e);
      }
    };

    messageHandlers.set(key, callback);
    window.addEventListener("message", handler);
    document.addEventListener("message", handler);
    setTimeout(() => {
      window.postMessage({ key, payload });
    }, 0);

    // 5초 후 타임아웃 처리 (응답이 없으면 자동 정리)
    const timeout = setTimeout(() => {
      if (messageHandlers.has(key)) messageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      messageHandlers.delete(key);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);
    };
  };

  window.nolraun.getPushToken = (callback) =>
    messageHandler("GET_PUSH_TOKEN", callback);

  window.isWebview = true;
  window.isWebviewInitialized = true;
  return true;
})();
