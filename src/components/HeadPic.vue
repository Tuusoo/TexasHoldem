<script setup lang="ts">
import crown from "../assets/crown.svg";
defineProps<{
    name: string;
    isDealer: boolean;
}>();
</script>

<template>
    <span class="head-pic">{{ name }}<img class="crown" v-if="isDealer" :src="crown" /></span>
</template>

<style scoped lang="less">
.head-pic {
    position: relative;
    width: 80px;
    height: 80px;
    border: 4px solid #f0f0f0;
    border-radius: 50%;
    color: #ffffff;
    margin: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
    .crown {
        position: absolute;
        width: 40px;
        height: 40px;
        left: 50%;
        top: -30px;
        transform: translateX(-50%);
    }
}
</style>
