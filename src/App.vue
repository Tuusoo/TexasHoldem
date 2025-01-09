<script setup lang="ts">
import { onMounted, ref } from "vue";
import WebSocketService from "./ws";
import { v4 as uuid } from "uuid";
import { showFailToast } from "vant";

onMounted(() => {
    (document.getElementById("app") as HTMLElement).style.height =
        document.documentElement.clientHeight + "px";
});

const show = ref(false);

const wsService = WebSocketService.getInstance();
wsService.connect("ws://localhost:3000/ws");
const ws = wsService.getWebSocket();
(ws as WebSocket).onopen = () => {
    show.value = true;
    // 心跳检测
    let pin: string;
    if (localStorage.getItem("userId")) {
        pin = localStorage.getItem("userId") as string;
    } else {
        pin = uuid();
    }
    localStorage.setItem("userId", pin);
    (ws as WebSocket).send("login:" + pin);
    const timer = setInterval(() => {
        (ws as WebSocket).send("ping:" + pin);
        if (ws?.readyState !== 1) {
            showFailToast("似乎连接已断开");
            clearInterval(timer);
            show.value = false;
        }
    }, 5000);
};
</script>

<template>
    <RouterView v-if="show"></RouterView>
</template>

<style lang="less" scoped></style>
