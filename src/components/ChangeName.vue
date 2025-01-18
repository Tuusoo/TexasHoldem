<script setup lang="ts">
import {
    Field,
    Button,
    showSuccessToast,
    CellGroup,
    showFailToast,
} from "vant";
import { ref } from "vue";
import api from "../api";

const inputValue = ref("");
const emits = defineEmits(["changeName"]);

const updateName = () => {
    api({
        uri: "updateName",
        id: localStorage.getItem("userId"),
        name: inputValue.value,
    }).then(res => {
        if (res.code === "0") {
            localStorage.setItem("name", inputValue.value);
            showSuccessToast("修改名字成功");
            emits("changeName", inputValue.value);
        } else {
            showFailToast(res.msg);
        }
    });
};
</script>

<template>
    <div class="change-name-container">
        <div class="title">请输入一个字作为头像</div>
        <CellGroup inset>
            <Field
                v-model="inputValue"
                label="名字"
                placeholder="请输入一个字"
                center
                maxlength="1"
            >
                <template #button>
                    <Button size="small" type="primary" @click="updateName"
                        >确认</Button
                    >
                </template>
            </Field>
        </CellGroup>
    </div>
</template>

<style scoped lang="less">
.change-name-container {
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
