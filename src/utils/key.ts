export const MESSAGE_KEY = {
  download: {
    downloadFile: "DOWNLOAD_FILE",
    imageFile: "DOWNLOAD_IMAGE",
  },
  analytics: {
    logEvent: "LOG_EVENT",
  },
  auth: {
    kakao: {
      login: "KAKAO_LOGIN",
      logout: "KAKAO_LOGOUT",
      unlink: "KAKAO_UNLINK",
    },
    naver: {
      login: "NAVER_LOGIN",
      logout: "NAVER_LOGOUT",
      unlink: "NAVER_UNLINK",
    },
    apple: {
      login: "APPLE_LOGIN",
    },
    google: {
      login: "GOOGLE_LOGIN",
      logout: "GOOGLE_LOGOUT",
      unlink: "GOOGLE_UNLINK",
    },
  },
  camera: {
    checkPermission: "CHECK_CAMERA_PERMISSION",
    barcodeScan: "BARCODE_SCAN",
    barcodeScanReceiveMessage: "BARCODE_SCAN_RECEIVE_MESSAGE", // check
  },
  clipboard: {
    getText: "GET_TEXT",
    setText: "SET_TEXT",
  },
  contacts: {
    checkPermission: "CHECK_CONTACTS_PERMISSION",
    getContacts: "GET_CONTACTS",
  },
  device: {
    getInfo: "DEVICE_INFO",
    getIdfaAdid: "GET_IDFA_ADID",
  },
  location: {
    checkPermission: "CHECK_LOCATION_PERMISSION",
    getCurrentPosition: "GET_CURRENT_POSITION",
  },
  haptic: {
    trigger: "TRIGGER_HAPTIC",
  },
  linking: {
    openSettings: "OPEN_SETTINGS",
    externalBrowser: "EXTERNAL_BROWSER",
    inappBrowser: "INAPP_BROWSER",
  },
  notification: {
    checkPermission: "CHECK_NOTIFICATION_PERMISSION",
    getToken: "GET_NOTIFICATION_TOKEN",
    sendLocalNotification: "SEND_LOCAL_NOTIFICATION",
  },
  review: {
    request: "REQUEST_REVIEW",
  },
  share: {
    systemShare: "SYSTEM_SHARE",
    kakaoShare: "KAKAO_SHARE",
  },
  storage: {
    getItem: "STORAGE_GET_ITEM",
    setItem: "STORAGE_SET_ITEM",
    removeItem: "STORAGE_REMOVE_ITEM",
    clear: "STORAGE_CLEAR",
  },
  initialize: {
    initialize: "APP_INITIALIZE",
  },
  event: {
    appStateChange: "APP_STATE_CHANGE",
  },
};
