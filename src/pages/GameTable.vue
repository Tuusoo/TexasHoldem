<script setup lang="ts">
import Card from "../components/Card.vue";
import HeadPic from "../components/HeadPic.vue";
</script>

<template>
    <div class="container">
        <div class="head-area">
            <span class="area-name">公牌</span>
            <Card type="spade" number="A" />
            <Card type="club" number="8" />
            <Card type="heart" number="10" />
            <Card type="heart" number="J" />
            <Card type="heart" number="Q" />
        </div>
        <div class="main-area"></div>
        <HeadPic />
        <div class="my-area">
            <div class="my-cards">
                <span class="area-name">手牌</span>
                <Card type="heart" number="A" />
                <Card type="heart" number="K" />
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
        padding-left: 10px;
        border-bottom: 4px solid #000000;
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
    }
    .my-area {
        height: 160px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-top: 4px solid #000000;
        .my-cards {
            display: flex;
            align-items: center;
            border-right: 4px solid #000000;
        }
    }
}
</style>
