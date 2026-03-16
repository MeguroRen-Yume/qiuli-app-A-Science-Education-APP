<template>
  <div class="post-form-container">
    <h2>发表动态</h2>
    <div class="post-form">
      <form @submit.prevent="addPost">
        <textarea v-model="content" placeholder="请输入动态内容"></textarea>
        <div class="publish-actions">
          <button class="submit" type="submit">发布</button>
          <button class="cancel" type="button" @click="$router.push('/chat')">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { addPost } from '../api/api';

export default {
  data() {
    return {
      content: ''
    };
  },
  methods: {
    async addPost() {
      if (this.content.trim()) {
        try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');
          
          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          // 发送添加动态的请求
          const response = await addPost({
            token: token,
            content: this.content
          });

          // 请求成功后导航到聊天页面
          this.$router.push('/chat');

        } catch (error) {
          // 处理错误
          console.error('Error adding post:', error.message);
          // 可以在界面上显示错误信息给用户
        }
      }
    },
  }
};
</script>


<style scoped>
.post-form-container {
  padding: 10px; 
  box-sizing: border-box; 
}

h2 {
  font-size: 26px;
  color: rgb(15,73,136);
  text-align: center;
  margin-top:40px;
}

.post-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: rgba(106, 178, 254, 0.2);
  border: 1px solid rgba(106, 178, 254, 0.5);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

textarea {
  width: 100%;
  height: 350px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  text-align: left;
}

.publish-actions {
  position: absolute;
  bottom: -40px; 
  right: 15px;
  display: flex;
  gap: 10px;
}

.cancel {
  background-color: rgb(106,178,254);
  color: white;
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit {
  background-color: rgb(56,148,251);
  color: white;
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit:hover {
  background-color: rgb(42,118,204);
}

.cancel:hover {
  background-color: rgb(56,148,251);
}
</style>