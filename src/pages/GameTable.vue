<script setup lang="ts">
import Card from "../components/Card.vue";
import FakeCard from "../components/FakeCard.vue";
import HeadPic from "../components/HeadPic.vue";
import OtherPlayer from "../components/OtherPlayer.vue";
import { Icon, Popup, showConfirmDialog, showFailToast, showToast } from "vant";
import ChangeName from "../components/ChangeName.vue";
import { ref, watch } from "vue";
import api from "../api";
import useStore from "../store";
import WebSocketService from "../ws";
import Log from "../components/Log.vue";
import BetPop from "../components/BetPop.vue";

const store = useStore();
const wsService = WebSocketService.getInstance();

watch(
    () => store.wsJSON,
    val => {
        if (val.type === "gameStatus") {
            store.setGameState(val.data);
            store.setCurrentBiggestBet(0);
        }
        if (val.type === "gameStart") {
            store.addLog("所有玩家准备完成，游戏开始");
        }
        if (val.type === "setDealer") {
            store.setDealer(val.data.id);
            store.addLog(`这局庄家是"${val.data.name}"`);
        }
        if (val.type === "dealCard") {
            store.setMyCards(val.data);
        }
        if (val.type === "bet") {
            if (val.data.bet > store.currentBiggestBet) {
                store.setCurrentBiggestBet(val.data.bet);
            }
            showToast(`玩家"${val.data.name}"下注了${val.data.bet}筹码`);
            store.addLog(`玩家"${val.data.name}"下注了${val.data.bet}筹码`);
        }
        if (val.type === "currentPlayer") {
            store.setCurrentPlayer(val.data);
            store.addLog(`轮到"${store.currentPlayerData?.name}"操作`);
        }
        if (val.type === "fold") {
            showToast(`玩家"${val.data.name}"弃牌了`);
            store.addLog(`玩家"${val.data.name}"弃牌了`);
        }
        if (val.type === "needAddBet") {
            showConfirmDialog({
                message: "是否补齐筹码，不补齐则弃牌",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
            })
                .then(() => {
                    wsService.send({ type: "addBet", data: store.id });
                })
                .catch(() => {
                    wsService.send({ type: "noAddBet", data: store.id });
                });
        }
        if (val.type === "check") {
            showToast(`玩家"${val.data.name}"check了`);
            store.addLog(`玩家"${val.data.name}"check了`);
        }
        if (val.type === "communityCards") {
            store.setCommonCards(val.data);
        }
    }
);

// 玩家名字的逻辑，从localStorage获取，如果没有则新建
const myName = ref("");
const isShowChangeName = ref(false);
if (localStorage.getItem("name")) {
    api({
        uri: "updateName",
        id: store.id || localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
    }).then(res => {
        if (res.code === "0") {
            myName.value = localStorage.getItem("name") as string;
        } else {
            showFailToast(res.msg);
            isShowChangeName.value = true;
        }
    });
} else {
    isShowChangeName.value = true;
}
const openChangeName = () => {
    isShowChangeName.value = true;
};
const onNameChange = (value: string) => {
    isShowChangeName.value = false;
    myName.value = value;
};
// 日志列表显示控制
const isShowLog = ref(false);
const showLog = () => {
    isShowLog.value = true;
};
// 准备
const handlePrepare = () => {
    wsService.send({ type: "ready", data: store.id });
    store.addLog("我准备了");
};
// 下注
const isShowBetPopup = ref(false);
const showBetPopup = () => {
    isShowBetPopup.value = true;
};
const bet = (value: string) => {
    wsService.send({ type: "bet", data: { id: store.id, bet: Number(value) } });
    isShowBetPopup.value = false;
};
// 放弃
const fold = () => {
    showConfirmDialog({
        message: "确认放弃吗",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    })
        .then(() => {
            wsService.send({ type: "fold", data: store.id });
        })
        .catch(() => {});
};
// check
const check = () => {
    if (store.currentBiggestBet !== 0) {
        showFailToast("已经有人下注了，不能check");
        return;
    }
    showConfirmDialog({
        message: "确认check吗",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    })
        .then(() => {
            wsService.send({ type: "check", data: store.id });
        })
        .catch(() => {});
};
</script>

<template>
    <div class="container">
        <div class="head-area">
            <div class="common-cards">
                <span class="area-name">公牌</span>
                <template v-if="store.gameState === 'round1'">
                    <FakeCard v-for="i in 3" :key="i" />
                </template>
                <template v-else>
                    <Card
                        v-for="i in store.commonCards"
                        :key="i.suit + i.rank"
                        :type="i.suit"
                        :number="i.rank"
                    />
                </template>
            </div>
            <div class="open-log">
                <Icon name="chat-o" color="#000000" size="8vw" @click="showLog" />
            </div>
        </div>
        <div class="main-area">
            <div class="left-hand-players">
                <OtherPlayer v-for="i in store.leftHandPlayers" :key="i.id" :data="i" />
            </div>
            <div class="right-hand-players">
                <OtherPlayer v-for="i in store.rightHandPlayers" :key="i.id" :data="i" />
            </div>
        </div>
        <div class="my-detail">
            <HeadPic
                :name="myName"
                :is-dealer="store.id === store.dealer"
                @click="openChangeName"
            />
            <div class="my-chip">我的剩余筹码:{{ store.myData?.chips }}</div>
        </div>
        <div class="my-area">
            <div class="my-options" v-if="store.gameState === 'waiting' && !store.myData?.ready">
                <div class="option-button" @click="handlePrepare">准备</div>
            </div>
            <div class="notice" v-if="store.gameState === 'waiting' && store.myData?.ready">
                已准备！
            </div>
            <template
                v-if="
                    store.gameState === 'round1' ||
                    store.gameState === 'round2' ||
                    store.gameState === 'round3' ||
                    store.gameState === 'round4'
                "
            >
                <div class="my-cards">
                    <span class="area-name">手牌</span>
                    <Card
                        v-for="i in store.myCards"
                        :key="i.suit + i.rank"
                        :type="i.suit"
                        :number="i.rank"
                    />
                </div>
                <div class="my-options" v-show="store.currentPlayer === store.id">
                    <div class="option-button" v-if="store.gameState !== 'round1'" @click="check">
                        check!
                    </div>
                    <div class="option-button" @click="showBetPopup">下注</div>
                    <div class="option-button" @click="fold">放弃</div>
                </div>
            </template>
            <div class="notice" v-if="store.myData?.isFold">已弃牌！</div>
            <div class="notice" v-if="store.myData?.isAllIn">All in！</div>
        </div>
    </div>
    <Popup position="bottom" v-model:show="isShowChangeName" :close-on-click-overlay="false">
        <ChangeName @changeName="onNameChange" />
    </Popup>
    <Popup position="top" v-model:show="isShowLog">
        <Log />
    </Popup>
    <Popup position="bottom" v-model:show="isShowBetPopup">
        <BetPop @bet="bet" />
    </Popup>
</template>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    user-select: none;
    display: flex;
    flex-direction: column;
    .head-area {
        height: 160px;
        display: flex;
        align-items: center;
        border-bottom: 4px solid #000000;
        .common-cards {
            display: flex;
            align-items: center;
            padding-left: 10px;
            border-right: 4px solid #000000;
            width: 600px;
        }
        .open-log {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .area-name {
        width: 48px;
        font-size: 48px;
        color: #000000;
        font-weight: 500;
        margin-right: 10px;
    }
    .main-area {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        overflow-y: scroll;
        .left-hand-players,
        .right-hand-players {
            display: flex;
            flex-direction: column;
        }
    }
    .my-detail {
        display: flex;
        align-items: baseline;
        border-top: 4px solid #000000;
        .my-chip {
            font-size: 32px;
            color: #000000;
        }
    }
    .my-area {
        display: flex;
        align-items: center;
        padding-left: 10px;
        .my-cards {
            height: 160px;
            width: 280px;
            display: flex;
            align-items: center;
            border-right: 4px solid #000000;
        }
        .my-options {
            height: 160px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .option-button {
                width: 120px;
                line-height: 80px;
                font-size: 32px;
                color: #000000;
                text-align: center;
                border: 4px solid #000000;
                border-radius: 8px;
                &:active {
                    background-color: #000000;
                }
            }
        }
        .notice {
            height: 160px;
            width: 100%;
            text-align: center;
            line-height: 160px;
            font-size: 32px;
            color: #000000;
        }
    }
}
</style>
