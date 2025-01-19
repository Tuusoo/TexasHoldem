<script setup lang="ts">
import spade from "../assets/spade.svg";
import heart from "../assets/heart.svg";
import club from "../assets/club.svg";
import diamond from "../assets/diamond.svg";

defineProps<{
    type: cardSuit;
    number: cardRank;
}>();

const getCardColor = (type: cardSuit) => {
    switch (type) {
        case "spade":
        case "club":
            return "#2c2c2c";
        case "heart":
        case "diamond":
            return "#d81e06";
    }
};
const getCardIcon = (type: cardSuit) => {
    switch (type) {
        case "spade":
            return spade;
        case "club":
            return club;
        case "heart":
            return heart;
        case "diamond":
            return diamond;
    }
};
</script>

<template>
    <div class="poker-card">
        <div class="front" :style="{ borderColor: getCardColor(type) }">
            <span :style="{ color: getCardColor(type) }">{{ number }}</span>
            <img :src="getCardIcon(type)" />
        </div>
        <div class="back"></div>
    </div>
</template>

<style scoped lang="less">
.poker-card {
    width: 100px;
    height: 140px;
    position: relative;
    margin-right: 10px;
    transform-style: preserve-3d;
    animation: flip 1s ease-in-out;
    @keyframes flip {
        0% {
            transform: rotateY(-180deg);
        }
        100% {
            transform: rotateY(0deg);
        }
    }
    .front {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100px;
        height: 140px;
        box-sizing: border-box;
        border: 4px solid #000000;
        background-color: #f0f0f0;
        border-radius: 12px;
        padding: 8px;
        transform: rotateY(0deg);
        span {
            font-size: 28px;
            font-weight: 600;
        }
        img {
            width: 50px;
            height: 50px;
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
        }
    }
    .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 140px;
        box-sizing: border-box;
        border: 4px solid #f0f0f0;
        background-color: rgb(4, 124, 214);
        border-radius: 12px;
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
}
</style>
