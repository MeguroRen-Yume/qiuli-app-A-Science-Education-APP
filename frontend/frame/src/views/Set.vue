<template>
  <div>
  <div class="header">
    <img src="@/assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
    <h1>设置</h1>
  </div>
  <div class="settings-page">
    <div class="settings-container">
      <div v-if="showAccountManagement" class="settings-section">
        <h2>账号管理</h2>
        <div class="settings-actions">
          <button class="green-button" @click="showChangePasswordModal = true">修改密码</button>
          <button class="green-button" @click="logout">退出账号</button>
        </div>
      </div>
      <div v-if="showPersonalization" class="settings-section">
        <h2>个性化设置</h2>
        <div class="settings-actions">
          <label>选择颜色主题：</label>
          <select v-model="selectedTheme" @change="applyTheme" class="theme-select">
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
          </select>
        </div>
      </div>
    </div>
    <!-- 模态框内容 -->
    <div v-if="showChangePasswordModal" class="modal-overlay" @click.self="showChangePasswordModal = false">
      <div class="modal-content">
        <h2>修改密码</h2>
        <form @submit.prevent="submitChangePassword">
          <div class="form-group">
            <label for="currentPassword">手机号</label>
            <input type="password" id="currentPassword" v-model="currentPassword" required>
          </div>
          <div class="form-group">
            <label for="newPassword">新密码</label>
            <input type="password" id="newPassword" v-model="newPassword" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">确认新密码</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required>
          </div>
          <div class="form-actions">
            <button type="submit" class="green-button">提交</button>
            <button type="button" class="green-button" @click="showChangePasswordModal = false">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { changeKey,checkKey,user,GetID } from '../api/api'; 
export default {
  data() {
    return {
      showAccountManagement: true,
      showPersonalization: true,
      selectedTheme: 'light', // 默认选择浅色主题
      showChangePasswordModal: false,
      savedPassword:'',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  // created() {
  //   this.fetchUserData();
  // },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      console.log('处理退出登录逻辑');
      this.$router.push("/login");
    },
    applyTheme() {
      console.log('应用主题:', this.selectedTheme);
      // 根据选定的主题应用样式或调用相关方法
    },
    changePassword() {
      this.showChangePasswordModal = true;
    },

    // async fetchUserData() {
    //   try {
    //   const usersData = await user();
    //   const token = localStorage.getItem('token');
    //       // 确保 token 存在再发送请求
    //   if (!token) {
    //     throw new Error('Token not found in localStorage');
    //   }
    //   const userid= await GetID({
    //     token: token,
    //   });
    //   const id= userid.data.userId
    //   const filteredData = usersData.filter(item => parseInt(item.id) === id);
    //   this.savedPassword=filteredData[0].password
    //   console.log(this.savedPassword)
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
    // },

    async submitChangePassword(){
        // this.fetchUserData();
        if (this.newPassword !== this.confirmPassword) {
          alert('新密码和确认新密码不一致');
          return;
        }
        // if (this.savedPassword !== this.currentPassword) {
        //   alert('原密码输入错误');
        //   return;
        // }
        try{
          const token = localStorage.getItem('token');

          this.showChangePasswordModal = false;
          
          this.CheckKey();
          const response = await changeKey({
            token: token,
            current_password: this.currentPassword,
            new_password: this.newPassword
          });

          console.log(response.status);
          if (response.status === 200) {
            alert('密码已成功更新');
          } else {
            alert(response.message || '密码更新失败');
          }
          // 关闭模态框
          this.showChangePasswordModal = false;

        }catch (error) {
        console.error(error);
        alert('发生错误，请稍后再试');
      }
    },

    async CheckKey(){

        try{
          const token = localStorage.getItem('token');
   
          const response = await checkKey({
            token: token,
            current_password: this.currentPassword,
            new_password: this.newPassword
          });

        }catch (error) {
        console.error(error);
        alert('验证原密码发生错误，请稍后再试');
      }
    }

  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 10px;
  position: relative; 
}

.back-button {
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: absolute;
  left: 20px; 
  top:15px;
}

.header h1 {
  font-size: 24px;
  color: rgb(15, 73, 136); 
}

.settings-page { 
  max-width: 600px; 
  margin: 0 auto;
  padding: 20px; 
  background-color: rgba(106, 178, 254, 0.3); 
  border: 1px solid rgb(106, 178, 254);
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
}

.settings-container {
  padding: 20px;
  background-color: #ffffff; 
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(27, 61, 33, 0.1);
  max-width: 600px;
  width: 100%;
}

.settings-section {
  margin-bottom: 20px;
  text-align: center;
}

.settings-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: rgb(42, 118, 204); 
}

.settings-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.green-button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background-color: rgba(56, 148, 251, 0.8); 
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin: 0 10px;
}

.green-button:hover,
.green-button:focus {
  background-color: rgb(42, 118, 204); 
}

label {
  font-weight: bold;
  font-size: 16px;
  color: rgb(42, 118, 204);
}

.theme-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid rgb(56, 148, 251); 
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}
.modal-content h2{
  color:rgb(15, 73, 136);
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>