<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/index";
import login from "../api/login";

onMounted(() => {
    api({
        uri: "currentPlayersNum",
    }).then(res => {
        console.log(res);
    })
});

const router = useRouter();
const enterGame = () => {
    let pin: string;
    if (localStorage.getItem("userId")) {
        pin = localStorage.getItem("userId") as string;
    } else {
        pin = uuid();
    }
    login({
        userId: pin,
    }).then(res => {
        if (res.code === "0") {
            localStorage.setItem("userId", pin);
            router.push("/GameTable");
        }
    });
};
</script>

<template>
    <div class="login">
        <div class="head-1">PLAY德州扑克</div>
        <div class="head-2">♠♥♣♦</div>
        <div class="enter-button" @click="enterGame">进 入</div>
        <div class="notice-text">当前人数：0</div>
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
