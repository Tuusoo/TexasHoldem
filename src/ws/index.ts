import useStore from "../store";

class WebSocketService {
    private static instance: WebSocketService;
    private ws: WebSocket | null = null;
    private url: string = "";

    // 单例模式，确保全局只有一个实例
    private constructor() {}

    /**
     * 获取 WebSocketService 的唯一实例
     */
    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    /**
     * 初始化 WebSocket 连接
     * @param url WebSocket 服务器地址
     */
    public connect(url: string): WebSocket {
        if (
            this.ws &&
            (this.ws.readyState === WebSocket.OPEN ||
                this.ws.readyState === WebSocket.CONNECTING)
        ) {
            console.warn("WebSocket is already connected or connecting.");
            return this.ws;
        }

        this.url = url;
        this.ws = new WebSocket(url);

        this.ws.onmessage = (event: MessageEvent) => {
            const store = useStore();
            const { type } = JSON.parse(event.data);
            if (type === "pong") return;
            store.setWs(JSON.parse(event.data));
        };

        this.ws.onclose = (event: CloseEvent) => {
            console.log("WebSocket closed:", event.reason);
            this.ws = null; // 清除实例
        };

        this.ws.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
        };

        return this.ws;
    }

    /**
     * 发送消息
     * @param message 要发送的消息
     */
    public send(message: object): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open");
        }
    }

    /**
     * 关闭 WebSocket 连接
     */
    public close(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * 获取当前 WebSocket 实例
     */
    public getWebSocket(): WebSocket | null {
        return this.ws;
    }
}

export default WebSocketService;
