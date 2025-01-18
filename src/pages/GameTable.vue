<script setup lang="ts">
import Card from "../components/Card.vue";
import HeadPic from "../components/HeadPic.vue";
import OtherPlayer from "../components/OtherPlayer.vue";
import { Icon, Popup, showFailToast } from "vant";
import ChangeName from "../components/ChangeName.vue";
import { ref, watch } from "vue";
import api from "../api";
import useStore from "../store";
import WebSocketService from "../ws";
import Log from "../components/Log.vue";

const store = useStore();
const wsService = WebSocketService.getInstance();

watch(
    () => store.wsJSON,
    val => {
        if (val.type === "gameStart") {
            store.addLog("所有玩家准备完成，游戏开始");
        }
        if (val.type === "setDealer") {
            store.setDealer(val.data.id);
            store.addLog("这局庄家是" + val.data.name);
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
// 当前自己的状态
const myState = ref<"prepare" | "ready" | "inGame" | "fold" | "allIn">(
    "prepare"
);
// 准备
const handlePrepare = () => {
    wsService.send({ type: "ready", data: store.id });
    store.addLog("我准备了");
};
watch(
    () => store.myData?.ready,
    val => {
        if (val === true) {
            myState.value = "ready";
        }
    },
    { immediate: true }
);
// 开局
</script>

<template>
    <div class="container">
        <div class="head-area">
            <div class="common-cards">
                <span class="area-name">公牌</span>
                <Card type="spade" number="A" />
                <Card type="club" number="8" />
                <Card type="heart" number="10" />
                <Card type="heart" number="J" />
                <Card type="heart" number="Q" />
            </div>
            <div class="settings">
                <Icon
                    name="chat-o"
                    color="#000000"
                    size="8vw"
                    @click="showLog"
                />
            </div>
        </div>
        <div class="main-area">
            <div class="left-hand-players">
                <OtherPlayer
                    v-for="i in store.leftHandPlayers"
                    :key="i.id"
                    :data="i"
                />
            </div>
            <div class="right-hand-players">
                <OtherPlayer
                    v-for="i in store.rightHandPlayers"
                    :key="i.id"
                    :data="i"
                />
            </div>
        </div>
        <div class="my-detail">
            <HeadPic :name="myName" @click="openChangeName" />
            <div class="my-chip">我的剩余筹码:1000</div>
        </div>
        <div class="my-area">
            <div class="my-options" v-if="myState === 'prepare'">
                <div class="option-button" @click="handlePrepare">准备</div>
            </div>
            <div class="notice" v-if="myState === 'ready'">已准备！</div>
            <template v-if="myState === 'inGame'">
                <div class="my-cards">
                    <span class="area-name">手牌</span>
                    <Card type="heart" number="A" />
                    <Card type="heart" number="K" />
                </div>
                <div class="my-options">
                    <div class="option-button">check!</div>
                    <div class="option-button">下注</div>
                    <div class="option-button">放弃</div>
                </div>
            </template>
            <div class="notice" v-if="myState === 'fold'">已弃牌！</div>
            <div class="notice" v-if="myState === 'allIn'">All in！</div>
        </div>
    </div>
    <Popup
        position="bottom"
        v-model:show="isShowChangeName"
        :close-on-click-overlay="false"
    >
        <ChangeName @changeName="onNameChange" />
    </Popup>
    <Popup position="top" v-model:show="isShowLog">
        <Log />
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
        }
        .settings {
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
