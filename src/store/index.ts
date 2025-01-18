import { defineStore } from "pinia";
import dayjs from "dayjs";
import { getLeftRightPlayers } from "../utils";

const useStore = defineStore("store", {
    state: () => ({
        wsJSON: {} as wsMessage, // 收到的ws消息
        playerList: [] as playerInfo[],
        id: "", // 当前玩家id
        gameState: "preparing" as gameState,
        logList: [] as log[],
        dealer: "",
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
            this.logList.push({
                time: dayjs().format("HH:mm:ss"),
                message: msg,
            });
        },
        setDealer(dealer: string) {
            this.dealer = dealer;
        },
    },
    getters: {
        otherPlayers: state =>
            state.playerList.filter(item => item.id !== state.id),
        leftHandPlayers: state =>
            getLeftRightPlayers(state.playerList, state.id)[0],
        rightHandPlayers: state =>
            getLeftRightPlayers(state.playerList, state.id)[1],
        myData: state => state.playerList.find(item => item.id === state.id),
    },
});

export default useStore;
