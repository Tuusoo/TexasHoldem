<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuid } from "uuid";
import { showFailToast } from "vant";
import WebSocketService from "../ws";
import api from "../api";
import useStore from "../store";

const store = useStore();
// 玩家人数
const currentPlayersNum = ref(0);
api({ uri: "currentPlayersNum" }).then(res => {
    currentPlayersNum.value = Number(res.msg);
});

const router = useRouter();
const wsService = WebSocketService.getInstance();
const ws = wsService.getWebSocket();
const timer: Ref<NodeJS.Timeout> = inject("timer") as Ref<NodeJS.Timeout>;
const enterGame = () => {
    // 心跳检测
    let pin: string;
    if (localStorage.getItem("userId")) {
        pin = localStorage.getItem("userId") as string;
    } else {
        pin = uuid();
    }
    localStorage.setItem("userId", pin);
    store.setId(pin);
    wsService.send({ type: "login", data: pin });
    timer.value = setInterval(() => {
        wsService.send({ type: "ping", data: pin });
        if (ws?.readyState !== 1) {
            showFailToast("似乎连接已断开");
            clearInterval(timer.value);
        }
    }, 5000);
    store.addLog("我进入了游戏");
    router.push("/GameTable");
};
</script>

<template>
    <div class="login">
        <div class="head-1">PLAY德州扑克</div>
        <div class="head-2">♠♥♣♦</div>
        <div class="enter-button" @click="enterGame">进 入</div>
        <div class="notice-text">当前人数：{{ currentPlayersNum }}</div>
    </div>
</template>

<style scoped lang="less">
.login {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    .head-1 {
        font-size: 64px;
        font-weight: 500;
        margin-top: 200px;
    }
    .head-2 {
        font-size: 64px;
        font-weight: 500;
    }
    .enter-button {
        width: 300px;
        line-height: 80px;
        font-size: 48px;
        text-align: center;
        border: 4px solid #000000;
        border-radius: 16px;
        margin-top: 200px;
        &:active {
            background-color: #000000;
        }
    }
    .notice-text {
        font-size: 32px;
        margin-top: 200px;
    }
}
</style>
