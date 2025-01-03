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
