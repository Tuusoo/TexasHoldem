// 卡片花色
type cardType = "spade" | "heart" | "club" | "diamond";

// 扑克的数字
type cardNum =
    | "A"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";

// 请求返回报文
type response = {
    code: "0" | "1";
    msg: string;
};

// ws消息格式
type wsMessage = {
    type: string; // 消息类型
    data: any; // 消息数据
};

// 玩家信息
type playerInfo = {
    id: string;
    name: string;
    ready: boolean;
    chips: number;
    currentBet: number;
    isFold: boolean;
    isAllIn: boolean;
};

// 游戏状态
type gameState = "prepare" | "inGame" | "settling";

// 日志格式
type log = {
    time: string;
    message: string;
};
