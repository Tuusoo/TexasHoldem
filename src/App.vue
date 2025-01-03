<script setup lang="ts">
import { onMounted, ref } from "vue";
import WebSocketService from "./ws";

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
};
</script>

<template>
    <RouterView v-if="show"></RouterView>
</template>

<style lang="less" scoped></style>
