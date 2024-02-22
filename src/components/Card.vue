<script setup lang="ts">
import spade from "../assets/spade.svg";
import heart from "../assets/heart.svg";
import club from "../assets/club.svg";
import diamond from "../assets/diamond.svg";

defineProps<{
    type: cardType;
    number: cardNum;
}>();

const getCardColor = (type: cardType) => {
    switch (type) {
        case "spade":
        case "club":
            return "#2c2c2c";
        case "heart":
        case "diamond":
            return "#d81e06";
    }
};
const getCardIcon = (type: cardType) => {
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
    <div class="poker-card" :style="{borderColor: getCardColor(type)}">
        <span :style="{color: getCardColor(type)}">{{ number }}</span>
        <img :src="getCardIcon(type)" />
    </div>
</template>

<style scoped lang="less">
.poker-card {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 140px;
    box-sizing: border-box;
    border: 4px solid #000000;
    background-color: #f0f0f0;
    border-radius: 12px;
    padding: 8px;
    margin-right: 10px;
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
</style>
