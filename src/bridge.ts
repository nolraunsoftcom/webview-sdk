type MessageCallback = (value: any) => void;

interface QueuedRequest {
  callback: MessageCallback;
  payload?: any;
  timeout: number;
  cleanup: () => void;
}

export class WebViewBridge {
  private ReactNativeWebView: any;
  private messageHandlers: Map<string, MessageCallback> = new Map();
  private onMessageHandlers: Map<string, (event: Event) => void> = new Map();
  private requestCounter: number = 0;
  private requestQueues: Map<string, QueuedRequest[]> = new Map();
  private activeRequests: Set<string> = new Set();

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

  private processNextRequest(key: string) {
    const queue = this.requestQueues.get(key);
    if (!queue || queue.length === 0) {
      this.activeRequests.delete(key);
      return;
    }

    const nextRequest = queue.shift()!;
    this.executeRequest(key, nextRequest);
  }

  private executeRequest(key: string, request: QueuedRequest) {
    const uniqueKey = `${key}_${Date.now()}_${++this.requestCounter}`;
    let isCompleted = false;
    let timeoutId: number | null = null;

    const cleanup = () => {
      if (isCompleted) return;
      isCompleted = true;

      this.messageHandlers.delete(uniqueKey);
      window.removeEventListener("message", handler);
      document.removeEventListener("message", handler);

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // 큐에서 다음 요청 처리
      this.processNextRequest(key);
    };

    const handler = (event: Event) => {
      if (isCompleted) return;

      const message = event as MessageEvent;
      if (typeof message.data !== "string") return;

      try {
        const data = JSON.parse(message.data);
        // 원본 key로 응답이 오면 처리 (네이티브 앱은 원본 key로 응답)
        if (data.key === key) {
          request.callback(data.value);
          cleanup();
        }
      } catch (e) {
        console.error("WebViewBridge: Invalid message format", e);
      }
    };

    // Timeout 설정
    timeoutId = window.setTimeout(() => {
      console.warn(
        `WebViewBridge: Request ${key} timed out after ${request.timeout}ms`
      );
      cleanup();
    }, request.timeout);

    this.messageHandlers.set(uniqueKey, request.callback);
    window.addEventListener("message", handler);
    document.addEventListener("message", handler);

    setTimeout(() => {
      // 네이티브 앱에는 원본 key로 전송
      this.postMessage({ key, value: request.payload });
    }, 0);

    // cleanup 함수를 요청 객체에 저장
    request.cleanup = cleanup;
  }

  public sendMessage(
    key: string,
    callback: MessageCallback,
    payload?: any,
    timeout: number = 30000
  ): () => void {
    const queuedRequest: QueuedRequest = {
      callback,
      payload,
      timeout,
      cleanup: () => {}, // 초기값, executeRequest에서 실제 cleanup 함수로 대체됨
    };

    // 큐 초기화 (필요한 경우)
    if (!this.requestQueues.has(key)) {
      this.requestQueues.set(key, []);
    }

    const queue = this.requestQueues.get(key)!;

    // 현재 해당 key로 진행 중인 요청이 있는지 확인
    if (this.activeRequests.has(key)) {
      // 큐에 추가
      queue.push(queuedRequest);
      console.log(
        `WebViewBridge: Request ${key} queued. Queue length: ${queue.length}`
      );

      // 큐에서 제거하는 cleanup 함수 반환
      return () => {
        const index = queue.indexOf(queuedRequest);
        if (index > -1) {
          queue.splice(index, 1);
          console.log(
            `WebViewBridge: Request ${key} removed from queue. Queue length: ${queue.length}`
          );
        }
      };
    } else {
      // 바로 실행
      this.activeRequests.add(key);
      this.executeRequest(key, queuedRequest);

      // 실제 cleanup 함수 반환
      return () => {
        queuedRequest.cleanup();
      };
    }
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

  // 큐 상태 확인을 위한 디버그 메서드
  public getQueueStatus(): Record<string, number> {
    const status: Record<string, number> = {};
    this.requestQueues.forEach((queue, key) => {
      status[key] = queue.length;
    });
    return status;
  }

  // 현재 활성 요청 확인
  public getActiveRequests(): string[] {
    return Array.from(this.activeRequests);
  }

  // 특정 key의 큐 초기화
  public clearQueue(key: string) {
    const queue = this.requestQueues.get(key);
    if (queue) {
      queue.length = 0;
    }
    this.activeRequests.delete(key);
  }

  // 모든 큐 초기화
  public clearAllQueues() {
    this.requestQueues.clear();
    this.activeRequests.clear();
  }
}
