import { WebViewBridge } from "../bridge";
import { MESSAGE_KEY } from "../utils/key";

type ContactItem = {};

export class Contact {
  private bridge: WebViewBridge;

  constructor(bridge: WebViewBridge) {
    this.bridge = bridge;
  }

  checkPermission(callback: (permission: boolean) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.contacts.checkPermission, callback);
  }

  getAllContact(callback: (position: ContactItem) => void) {
    this.bridge.sendMessage(MESSAGE_KEY.contacts.getContacts, callback);
  }
}
