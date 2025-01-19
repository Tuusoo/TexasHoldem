<script setup lang="ts">
import { Field, Button, CellGroup, showFailToast, showConfirmDialog } from "vant";
import { ref } from "vue";
import useStore from "../store";

const emits = defineEmits(["bet"]);
const inputValue = ref("");
const store = useStore();
const confirm = () => {
    if (inputValue.value === "") {
        showFailToast("请输入筹码数");
        return;
    }
    if (Number(inputValue.value) % 10 !== 0) {
        showFailToast("请输入10的倍数");
        return;
    }
    if (Number(inputValue.value) < store.currentBiggestBet) {
        showFailToast("必须大于等于已经下注的最大的筹码");
        return;
    }
    if (Number(inputValue.value) > (store.myData?.chips as number)) {
        showFailToast("筹码不足");
        return;
    }
    showConfirmDialog({
        message: `确认下注${inputValue.value}吗`,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    })
        .then(() => {
            emits("bet", inputValue.value);
            inputValue.value = "";
        })
        .catch(() => {});
};
</script>

<template>
    <div class="bet-pop">
        <div class="title">输入下注筹码数</div>
        <CellGroup inset>
            <Field
                v-model="inputValue"
                label="筹码数"
                placeholder="请输入10的倍数"
                center
                type="number"
            >
                <template #button>
                    <Button size="small" type="primary" @click="confirm">确认</Button>
                </template>
            </Field>
        </CellGroup>
    </div>
</template>

<style scoped lang="less">
.bet-pop {
    width: 100%;
    padding-bottom: 100px;
    background-color: #eff2f5;
    .title {
        text-align: center;
        font-size: 32px;
        padding: 20px 0;
    }
}
</style>
