// 卡片花色
type cardSuit = "spade" | "heart" | "club" | "diamond";

// 扑克的数字
type cardRank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

// 扑克牌
type card = {
    suit: cardSuit;
    rank: cardRank;
};

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
type gameState = "waiting" | "round1" | "round2" | "round3" | "round4" | "settling";

// 日志格式
type log = {
    time: string;
    message: string;
};
