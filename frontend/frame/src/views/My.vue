<template>
  <div class="page-wrapper">
    <div style="width: 100%;">
      <!-- 头部信息 -->
      <div class="head">
        <img :src="avatarUrl" class="round-image">
        <div class="user-info">
          <p class="username">{{ username }}</p>
          <p class="signature">{{ signature }}</p>
        </div>
        <img src="../assets/img/bj.png" class="image" @click="openEditModal">

        <!-- 编辑模态框 -->
        <div class="edit-modal" v-if="showEditModal">
          <div class="modal-content">
            <h2>编辑信息</h2>
            <label>头像:</label>
            <!-- 显示当前头像 -->
            <img :src="editAvatarUrl" class="round-image" @click="handleAvatarUpload">
            <!-- 上传新头像 -->
            <input type="file" style="display: none;" ref="avatarInput" @change="handleFileUpload">
            <label>用户名:</label>
            <input type="text" v-model="editUsername">
            <label>个性签名:</label>
            <input type="text" v-model="editSignature">
            <div>
              <button @click="saveChanges()">保存</button>
              <button @click="cancelEdit">取消</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="page-container">
        <div class="content">
          <p class="title" style="margin-left: 10px">我的功能</p>
        </div>
        <div class="image-container">
          <div class="image-item">
            <router-link :to="{ path: '/integral' }">
              <img src="../assets/img/jf.png" class="round-image1">
            </router-link>
            <div class="image-caption">积分显示</div>
          </div>
          <div class="image-item">
            <router-link :to="{ path: '/study' }">
              <img src="../assets/img/xuexi.png" class="round-image1">
            </router-link>
            <div class="image-caption">学习情况</div>
          </div>
          <div class="image-item">
            <router-link :to="{ path: '/error' }">
              <img src="../assets/img/ctj.png" class="round-image1">
            </router-link>
            <div class="image-caption">错题集</div>
          </div>
          <div class="image-item">
            <router-link :to="{ path: '/dynamics' }">
              <img src="../assets/img/dt.png" class="round-image1">
            </router-link>
            <div class="image-caption">个人动态</div>
          </div>
        </div>
      </div>

      <!-- 更多功能区域 -->
      <div class="page-container">
        <div class="content">
          <p class="title" style="margin-left: 10px">更多功能</p>
        </div>
        <div class="image-container1">
          <router-link :to="{ path: '/thumbs' }">
            <div class="image-item-left-align">
              <img src="../assets/img/dzjl.png" class="round-image2">
              <div class="image-caption-right">点赞记录</div>
              <img src="../assets/img/arrow-right.png" class="image1">
            </div>
          </router-link>
          <hr>
          <router-link :to="{ path: '/browse' }">
            <div class="image-item-left-align">
              <img src="../assets/img/lljl.png" class="round-image2">
              <div class="image-caption-right">浏览记录</div>
              <img src="../assets/img/arrow-right.png" class="image1">
            </div>
          </router-link>
          <hr>
          <router-link :to="{ path: '/set' }">
            <div class="image-item-left-align">
              <img src="../assets/img/sz.png" class="round-image2">
              <div class="image-caption-right">设置</div>
              <img src="../assets/img/arrow-right.png" class="image1">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { addtext,user,GetID } from '../api/api';

export default {
  name: 'MyPage',
  data() {
    return {
      avatarUrl: '',
      username: '',
      signature: '',
      group: '',
      showEditModal: false,
      editUsername: '',
      editSignature: '',
      editAvatarUrl: '',
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
      const usersData = await user();
      const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const userid= await GetID({
        token: token,
      });
      const id= userid.data.userId
      const filteredData = usersData.filter(item => parseInt(item.id) === id);
      this.avatarUrl=filteredData[0].avatar
      this.editAvatarUrl=filteredData[0].avatar
      this.username=filteredData[0].username
      this.editUsername=filteredData[0].username
      this.signature=filteredData[0].text
      this.editSignature=filteredData[0].text
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    },
    openEditModal() { // 显示用户信息
      this.showEditModal = true;
    },
    async saveChanges() {
      console.log('Save button clicked');
      if (this.editUsername.trim()||this.editSignature.trim()) {
        try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');
          
          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          const response = await addtext({
            token: token,
            username: this.editUsername,
            text: this.editSignature
          });

          window.location.reload();

        } catch (error) {
          // 处理错误
          console.error('Error adding comment:', error.message);
          // 可以在界面上显示错误信息给用户
        }
      }
    },
    cancelEdit() {
      this.showEditModal = false;
    },
    handleAvatarUpload() {
      this.$refs.avatarInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editAvatarUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  height: 100vh; /* 让元素高度占满整个视口 */
  padding: 5%;
  background-color: #ffffff; /* 背景色 */
}

.head {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.user-info {
  margin-left: 10px;
  display: inline-block;
}

.username {
  font-size: 20px;
  font-weight: bold;
  color: rgb(15, 73, 136);
  margin-bottom: 5px;
}

.signature {
  font-size: 14px;
  color: rgb(15, 73, 136);
  word-wrap: break-word; 
  word-break: break-all; 
}

.round-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image {
  z-index: 99;
  width: 20px;
  height: 20px;
}

.page-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 5px; 
  background-color: rgba(106, 178, 254, 0.3);
  border: 1px solid rgba(106, 178, 254, 0.5);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.content {
  overflow: hidden;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgba(15, 73, 136, 0.6);
}

.image-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.round-image1 {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-item {
  text-align: center;
  width: 25%;
}

.image-caption {
  font-size: 14px;
  color: rgb(69, 70, 71);
  margin-top: 5px;
}

.image-item-left-align {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.image-container1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.round-image2 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-caption-right {
  font-size: 14px;
  color: rgb(69, 70, 71);
}

.image1 {
  width: 30px;
  height: 30px;
  margin-left: auto;
}

hr {
  border: none;
  border-top: 1px solid rgba(106, 178, 254, 0);
  margin: 10px 0;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(64, 89, 118, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.modal-content h2 {
  color: rgb(15, 73, 136);
  font-size: 20px;
  margin-bottom: 10px;
}

.modal-content label {
  color: rgb(69, 70, 71);
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid rgb(69, 70, 71);
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-content button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgb(56, 148, 251);
  color: #fff;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: rgb(42, 118, 204);
}

.radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-group label {
  margin-right: 20px;
  display: inline-flex;
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}
</style>