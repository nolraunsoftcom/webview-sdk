declare global {
  interface Window {
    isWebviewInitialized: boolean;
    isWebview: boolean;
    isInitialized: boolean;
    ReactNativeWebView: any;
    postMessage: (message: string | object) => void;
    appify: {};
  }
}

export {};
