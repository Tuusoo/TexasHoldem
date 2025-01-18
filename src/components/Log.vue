<script setup lang="ts">
import useStore from "../store";

const store = useStore();
</script>

<template>
    <div class="log-container">
        <div class="log" v-for="i in store.logList">
            <span class="time">{{ i.time }}</span
            >{{ i.message }}
        </div>
    </div>
</template>

<style scoped lang="less">
.log-container {
    height: 500px;
    background-color: #eff2f5;
    padding: 32px;
    overflow-x: scroll;
    .log {
        font-size: 32px;
        margin-bottom: 16px;
        .time {
            color: blue;
            margin-right: 16px;
        }
    }
}
</style>
