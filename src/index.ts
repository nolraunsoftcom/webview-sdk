import { WebViewBridge } from "./bridge";
import { Contact } from "./libs/contact";
import { Device } from "./libs/device";
import { Environment } from "./libs/environment";
import { Haptic } from "./libs/haptic";
import { InAppPurchase } from "./libs/inappPurchase";
import { Share } from "./libs/share";
import { Storage } from "./libs/storage";
import { Notification } from "./libs/notification";
import { Biometrics } from "./libs/biometrics";
import { AppReview } from "./libs/appReview";
import { Clipboard } from "./libs/clipboard";
import { SocialLogin } from "./libs/socialLogin";
import { SocialShare } from "./libs/socialShare";
import { Location } from "./libs/location";
import { Linking } from "./libs/linking";
import { Barcode } from "./libs/barcode";
import { Design } from "./libs/design";
import { Download } from "./libs/download";

(function () {
  class AppifySDK {
    private static instance: AppifySDK;
    private bridge: WebViewBridge = new WebViewBridge();
    private isInitialized: boolean = false;

    private notification: Notification;
    private location: Location;
    private linking: Linking;
    private environment: Environment;
    private contact: Contact;
    private device: Device;
    private share: Share;
    private storage: Storage;
    private haptic: Haptic;
    private inAppPurchase: InAppPurchase;
    private biometrics: Biometrics;
    private appReview: AppReview;
    private clipboard: Clipboard;
    private socialLogin: SocialLogin;
    private socialShare: SocialShare;
    private barcode: Barcode;
    private design: Design;
    private download: Download;
    private constructor() {
      this.initialize();
      this.overrideHistory();

      this.design = new Design(this.bridge);
      this.notification = new Notification(this.bridge);
      this.location = new Location(this.bridge);
      this.linking = new Linking(this.bridge);
      this.environment = new Environment(this.bridge);
      this.contact = new Contact(this.bridge);
      this.device = new Device(this.bridge);
      this.share = new Share(this.bridge);
      this.storage = new Storage(this.bridge);
      this.haptic = new Haptic(this.bridge);
      this.inAppPurchase = new InAppPurchase(this.bridge);
      this.biometrics = new Biometrics(this.bridge);
      this.appReview = new AppReview(this.bridge);
      this.clipboard = new Clipboard(this.bridge);
      this.socialLogin = new SocialLogin(this.bridge);
      this.socialShare = new SocialShare(this.bridge);
      this.barcode = new Barcode(this.bridge);
      this.download = new Download(this.bridge);
    }

    public static getInstance(): AppifySDK {
      if (!AppifySDK.instance) {
        AppifySDK.instance = new AppifySDK();
      }
      return AppifySDK.instance;
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

    private initialize(data?: {
      statusbar: {
        backgroundColor: string;
        textColor: "dark" | "light";
      };
      safearea: {
        edges: ("top" | "bottom" | "left" | "right")[];
      };
    }) {
      this.isInitialized = true;
      if (!this.environment.isApp) return;
    }
  }

  window.isWebviewInitialized = true;
  window.isWebview = true;
  window.appify = AppifySDK.getInstance();
})();
