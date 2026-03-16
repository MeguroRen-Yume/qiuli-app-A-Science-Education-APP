<template>
  <div class="group-form-container">
    <div class="group-form">
      <h2>创建新群组</h2>
      <form @submit.prevent="createGroup">
        <label for="groupName">群组名称:</label>
        <input type="text" id="groupName" v-model="groupName" required>
        <div class="button-group">
          <button type="submit" class="create-button">创建群组</button>
          <button type="button" class="cancel-button" @click="$router.push('/chat')">取消</button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createGroup } from '../api/api';

export default {
  data() {
    return {
      groupName: '',
      errorMessage: ''
    };
  },
  methods: {
    async createGroup() {
      if (this.groupName.trim()) {
        try {
          const token = localStorage.getItem('token');

          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          // 发送请求到后端
          const response = await createGroup({
            token: token,
            group_name: this.groupName
          });

          // 请求成功后的处理
          console.log('Group created successfully:', response.data);
          this.$router.push('/chat');
          // 清空表单和错误信息
          this.groupName = '';
          this.errorMessage = '';

        } catch (error) {
          // 处理错误
          console.error('Error creating group:', error.message);
          this.errorMessage = '创建群组失败，请重试。';
        }
      } else {
        this.errorMessage = '群组名称不能为空。';
      }
    }
  }
};
</script>

<style scoped>
.group-form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  min-height: 100vh;
  padding: 20px; 
  box-sizing: border-box; 
  margin-top: 20px; 
}

.group-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(106,178,254,0.2);
  border: 1px solid rgb(106,178,254,0.5);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.group-form h2 {  
  font-size: 24px;
  text-align: center;
  margin-bottom: 0px;
  color: rgb(15,73,136);
}

.group-form form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.group-form label {
  margin-bottom: 10px;
  font-size: 18px;
  color: rgb(56,148,251);
}

.group-form input[type="text"] {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.create-button {
  padding: 10px;
  font-size: 16px;
  background-color: rgb(56,148,251);
  color: white;
  border: none;
  cursor: pointer;
  flex: 1;
  margin-right: 10px;
}

.create-button:hover {
  background-color: rgb(42,118,204);
}

.cancel-button {
  padding: 10px;
  font-size: 16px;
  background-color: rgb(106,178,254);
  color: white;
  border: none;
  cursor: pointer;
  flex: 1;
}

.cancel-button:hover {
  background-color: rgb(56,148,251);
}

.error-message {
  margin-top: 10px;
  color: #bd6a64;
  font-size: 14px;
}
</style>