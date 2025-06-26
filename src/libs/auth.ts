import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

export class Auth {
  private kakao: KakaoAuth;
  private naver: NaverAuth;
  private google: GoogleAuth;
  private apple: AppleAuth;

  constructor(bridge: WebViewBridge) {
    this.kakao = new KakaoAuth(bridge);
    this.naver = new NaverAuth(bridge);
    this.google = new GoogleAuth(bridge);
    this.apple = new AppleAuth(bridge);
  }
}

export class KakaoAuth {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  login(callback: (body: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.kakao.login,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }

  logout(callback: (body: boolean) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.kakao.logout,
      (body: boolean) => {
        callback(body);
        unmounted();
      }
    );
  }

  unlink(callback: (body: boolean) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.kakao.unlink,
      (body: boolean) => {
        callback(body);
        unmounted();
      }
    );
  }
}

export class NaverAuth {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  login(callback: (body: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.naver.login,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }

  logout(callback: (body: any) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.naver.logout,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }

  unlink(callback: (body: any) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.naver.unlink,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }
}

export class GoogleAuth {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  login(callback: (body: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.google.login,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }

  logout(callback: (body: any) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.google.logout,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }

  unlink(callback: (body: any) => void = () => null) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.google.unlink,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }
}

export class AppleAuth {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  login(callback: (body: any) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.auth.apple.login,
      (body: any) => {
        callback(body);
        unmounted();
      }
    );
  }
}
