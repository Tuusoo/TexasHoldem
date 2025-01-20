<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";
import WebSocketService from "./ws";
import useStore from "./store";
import { allowMultipleToast, setToastDefaultOptions } from "vant";

onMounted(() => {
    (document.getElementById("app") as HTMLElement).style.height =
        document.documentElement.clientHeight + "px";
});

allowMultipleToast();
setToastDefaultOptions({ forbidClick: true });

// 心跳检测定时器
const timer = ref<NodeJS.Timeout>();
provide("timer", timer);

const show = ref(false);
const wsService = WebSocketService.getInstance();
const hostname = window.location.hostname;
wsService.connect(`ws://${hostname}:3000/ws`);
const ws = wsService.getWebSocket();
(ws as WebSocket).onopen = () => {
    show.value = true;
};

const store = useStore();

watch(
    () => store.wsJSON,
    val => {
        if (val.type === "userList") {
            store.setPlayerList(val.data as playerInfo[]);
        }
    }
);
</script>

<template>
    <RouterView v-if="show"></RouterView>
</template>

<style lang="less" scoped></style>
