<script setup lang="ts">
defineProps<{
    name: string;
}>();
</script>

<template>
    <span class="head-pic">{{ name }}</span>
</template>

<style scoped lang="less">
.head-pic {
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
    background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
}
</style>
