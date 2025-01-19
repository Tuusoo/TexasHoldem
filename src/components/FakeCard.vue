<script setup lang="ts"></script>

<template>
    <div class="poker-card">
        <div class="back"></div>
    </div>
</template>

<style scoped lang="less">
.poker-card {
    width: 100px;
    height: 140px;
    position: relative;
    margin-right: 10px;
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
    }
}
</style>
