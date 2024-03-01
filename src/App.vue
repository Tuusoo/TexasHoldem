<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
    (document.getElementById("app") as HTMLElement).style.height =
        document.documentElement.clientHeight + "px";
});

onMounted(() => {
    let ws = new WebSocket("ws://localhost:3000/login");
    const pin = new Date().getTime();
    sessionStorage.setItem("userId", pin.toString());
    ws.onopen = () => {
        ws.send(`user:${pin}`);
    };
    // setInterval(() => {
    //     ws.send(`heartBeat:${pin}`);
    // }, 2000);
    ws.onmessage = e => {
        if (e.data.indexOf("heartBeat:") > -1) {
            ws.send(`online:${pin}:${new Date().getTime()}`);
        }
    };
});
</script>

<template>
    <RouterView></RouterView>
</template>

<style lang="less" scoped></style>
