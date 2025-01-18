<script setup lang="ts">
import HeadPic from "./HeadPic.vue";
import { watch } from "vue";
import useStore from "../store";
import { Icon } from "vant";

const store = useStore();

const props = defineProps<{
    data: playerInfo;
}>();

watch(
    () => props.data.ready,
    val => {
        if (val === true) {
            store.addLog(`玩家“${props.data.name}”准备了`);
        }
    }
);
</script>

<template>
    <div class="other-player">
        <HeadPic :name="data.name" />
        <Icon name="success" v-if="data.ready" color="#07c160" size="8vw" />
    </div>
</template>

<style scoped lang="less">
.other-player {
    display: flex;
    align-items: center;
    height: 174px;
}
</style>
