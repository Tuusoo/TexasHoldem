<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
    (document.getElementById("app") as HTMLElement).style.height =
        document.documentElement.clientHeight + "px";
});
</script>

<template>
    <RouterView></RouterView>
</template>

<style lang="less" scoped></style>
