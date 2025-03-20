declare global {
  interface Window {
    isWebviewInitialized: boolean;
    isWebview: boolean;
    ReactNativeWebView: any;
    postMessage: (message: string | object) => void;
    nolraun: {
      getPushToken: (callback: (token: string) => void) => void;
    };
  }
}

export {};
