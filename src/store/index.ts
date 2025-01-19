import { defineStore } from "pinia";
import dayjs from "dayjs";
import { getLeftRightPlayers } from "../utils";

const useStore = defineStore("store", {
    state: () => ({
        wsJSON: {} as wsMessage, // 收到的ws消息
        playerList: [] as playerInfo[],
        id: "", // 当前玩家id
        gameState: "waiting" as gameState, // 游戏状态
        logList: [] as log[], // 日志列表
        dealer: "", // 庄家id
        currentPlayer: "", // 当前操作玩家id
        myCards: [] as card[], // 我的手牌
        commonCards: [] as card[], // 公共牌
        currentBiggestBet: 0, // 当前最大下注额
    }),
    actions: {
        setWs(wsJSON: wsMessage) {
            this.wsJSON = wsJSON;
        },
        setPlayerList(playerList: playerInfo[]) {
            this.playerList = playerList;
        },
        setId(id: string) {
            this.id = id;
        },
        setGameState(gameState: gameState) {
            this.gameState = gameState;
        },
        addLog(msg: string) {
            this.logList.unshift({
                time: dayjs().format("HH:mm:ss"),
                message: msg,
            });
        },
        setDealer(dealer: string) {
            this.dealer = dealer;
        },
        setCurrentPlayer(id: string) {
            this.currentPlayer = id;
        },
        setMyCards(cards: card[]) {
            this.myCards = cards;
        },
        setCommonCards(cards: card[]) {
            this.commonCards = cards;
        },
        setCurrentBiggestBet(bet: number) {
            this.currentBiggestBet = bet;
        },
    },
    getters: {
        otherPlayers: state => state.playerList.filter(item => item.id !== state.id),
        leftHandPlayers: state => getLeftRightPlayers(state.playerList, state.id)[0],
        rightHandPlayers: state => getLeftRightPlayers(state.playerList, state.id)[1],
        myData: state => state.playerList.find(item => item.id === state.id),
        currentPlayerData: state => state.playerList.find(item => item.id === state.currentPlayer),
    },
});

export default useStore;
