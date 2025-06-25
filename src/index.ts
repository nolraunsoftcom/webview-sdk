import { WebViewBridge } from "./bridge";
import { Contacts } from "./libs/contacts";
import { Device } from "./libs/device";
import { Environment } from "./libs/environment";
import { Haptic } from "./libs/haptic";
import { InAppPurchase } from "./libs/inappPurchase";
import { Share } from "./libs/share";
import { Storage } from "./libs/storage";
import { Notification } from "./libs/notification";
import { Biometrics } from "./libs/biometrics";
import { AppReview } from "./libs/review";
import { Clipboard } from "./libs/clipboard";
import { Auth } from "./libs/auth";
import { Location } from "./libs/location";
import { Linking } from "./libs/linking";
import { Download } from "./libs/download";
import { Camera } from "./libs/camera";
import { Analytics } from "./libs/analytics";
import { MESSAGE_KEY } from "./utils/key";

(function () {
  class AppifySDK {
    private static instance: AppifySDK;
    private bridge: WebViewBridge = new WebViewBridge();
    private isInitialized: boolean = false;
    private analytics: Analytics;
    private notification: Notification;
    private location: Location;
    private linking: Linking;
    private environment: Environment;
    private device: Device;
    private share: Share;
    private storage: Storage;
    private haptic: Haptic;
    private inAppPurchase: InAppPurchase;
    private biometrics: Biometrics;
    private appReview: AppReview;
    private clipboard: Clipboard;
    private auth: Auth;
    private download: Download;
    private camera: Camera;
    private contacts: Contacts;
    constructor() {
      this.analytics = new Analytics(this.bridge);
      this.notification = new Notification(this.bridge);
      this.location = new Location(this.bridge);
      this.linking = new Linking(this.bridge);
      this.environment = new Environment(this.bridge);
      this.device = new Device(this.bridge);
      this.share = new Share(this.bridge);
      this.storage = new Storage(this.bridge);
      this.haptic = new Haptic(this.bridge);
      this.inAppPurchase = new InAppPurchase(this.bridge);
      this.biometrics = new Biometrics(this.bridge);
      this.appReview = new AppReview(this.bridge);
      this.clipboard = new Clipboard(this.bridge);
      this.auth = new Auth(this.bridge);
      this.download = new Download(this.bridge);
      this.camera = new Camera(this.bridge);
      this.contacts = new Contacts(this.bridge);

      this.overrideHistory();
      this.isInitialized = true;
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

    public initialize(data?: {
      bounces?: boolean;
      hideScrollbar?: boolean;
      enableRefresh?: boolean;
      statusBar?: {
        barStyle: "dark-content" | "light-content";
        backgroundColor: string;
      };
      safeArea?: {
        edge: ("top" | "bottom" | "left" | "right")[];
      };
    }) {
      const unmounted = this.bridge.sendMessage(
        MESSAGE_KEY.initialize.initialize,
        () => {
          unmounted();
        },
        data
      );
    }
  }

  window.isWebviewInitialized = true;
  window.isWebview = true;
  window.appify = new AppifySDK();
})();
