import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

type ContactItem = {};

export class Contacts {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.contacts.checkPermission,
      (response: boolean) => {
        callback(response);
        unmounted();
      }
    );
  }

  getAllContact(callback: (position: ContactItem) => void) {
    const unmounted = this.bridge.sendMessage(
      MESSAGE_KEY.contacts.getContacts,
      (response: ContactItem) => {
        callback(response);
        unmounted();
      }
    );
  }
}
