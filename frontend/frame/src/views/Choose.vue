<template>
  <div class="choicesBox">
    <h1>欢迎使用‘究理’</h1>
    <van-field
      style="margin-top: 15%;"
      v-model="identity"
      is-link
      readonly
      label="身份"
      placeholder="请选择您的身份"
      @click="showIdentityPicker = true"
    />
    <van-popup v-model:show="showIdentityPicker" round position="bottom">
      <van-picker
        :columns="identityColumns"
        @cancel="showIdentityPicker = false"
        @confirm="onConfirmIdentity"
      />
    </van-popup>

    <van-field v-if="isStudent"
      v-model="fieldValue1"
      is-link
      readonly
      label="年级"
      placeholder="请选择你所在的年级"
      @click="showPicker1 = true"
    />
    <van-popup v-if="isStudent" v-model:show="showPicker1" round position="bottom">
      <van-picker
        :columns="columns1"
        @cancel="showPicker1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>

    <div style="margin:10%">
      <van-button plain block type="primary" native-type="submit" @click="onSubmit">确定</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postIdentity } from '../api/api';

const router = useRouter(); // 使用 useRouter 组合式API

const identityColumns = [
  { text: '学生', value: '学生' },
  { text: '老师', value: '老师' },
];

const columns1 = [
  { text: '一年级', value: '一年级' },
  { text: '二年级', value: '二年级' },
      { text: '三年级', value: '三年级' },
      { text: '四年级', value: '四年级' },
      { text: '五年级', value: '五年级' },
      { text: '六年级', value: '六年级' },
      { text: '初一', value: '初一' },
      { text: '初二', value: '初二' },
      { text: '初三', value: '初三' },
      { text: '高一', value: '高一' },
      { text: '高二', value: '高二' },
      { text: '高三', value: '高三' },
];

const identity = ref('');
const showIdentityPicker = ref(false);
const fieldValue1 = ref('');
const showPicker1 = ref(false);
const isStudent = ref(false); // 标记是否为学生身份

const onConfirmIdentity = ({ selectedOptions }) => {
  showIdentityPicker.value = false;
  identity.value = selectedOptions[0].value;
  isStudent.value = selectedOptions[0].value === '学生';
};

const onConfirm1 = ({ selectedOptions }) => {
  showPicker1.value = false;
  fieldValue1.value = selectedOptions[0].text;
};


const onSubmit = async () => {
  try {
    const token = localStorage.getItem('token');

    if (isStudent.value) {
       await postIdentity({
        identity: fieldValue1.value,
        token: token
      });
    } else {
      await postIdentity({
        identity: identity.value,
        token: token
      });
    }

    navigateToHome(); // 调用导航方法
  } catch (error) {
    console.error('选择身份过程中发生错误:', error);
  }
};
  
const navigateToHome = () => {
  // 使用 router.push 导航到 /home 路由
  router.push('/');
};

</script>

<style scoped>
.choicesBox {
  margin-top: 15%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>