<script setup lang="ts">
import Card from "../components/Card.vue";
import HeadPic from "../components/HeadPic.vue";
import OtherPlayer from "../components/OtherPlayer.vue";
import { Icon } from "vant";
import api from "../api/index";

const heartBeatConnect = () => {
    const pin = localStorage.getItem("userId") as string;
    api({
        uri: "heartBeat",
        parameter: {
            userId: pin,
        },
    }).then(res => {
        console.log(res);
    });
};

heartBeatConnect();
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
                <Icon name="setting-o" color="#000000" size="8vw" />
            </div>
        </div>
        <div class="main-area">
            <OtherPlayer />
        </div>
        <div class="my-detail">
            <HeadPic name="我" />
            <div class="my-chip">我的剩余筹码:1000</div>
        </div>
        <div class="my-area">
            <div class="my-cards">
                <span class="area-name">手牌</span>
                <Card type="heart" number="A" />
                <Card type="heart" number="K" />
            </div>
            <div class="my-options">
                <div class="option-button">check!</div>
                <div class="option-button">下注</div>
                <div class="option-button">弃牌</div>
            </div>
        </div>
    </div>
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
        padding: 20px 0;
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
        height: 160px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        .my-cards {
            display: flex;
            align-items: center;
            border-right: 4px solid #000000;
        }
        .my-options {
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
    }
}
</style>
