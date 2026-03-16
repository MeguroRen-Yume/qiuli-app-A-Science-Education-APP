<template>
  <div class="header">
    <img src="../assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
    <h1>积分和任务列表</h1>
  </div>
  <div class="container">
    <div class="content">
      <div class="points-container">
        <h2>我的积分</h2>
        <p class="points">{{ userPoints }}</p>
      </div>
    </div>

    <div class="tasks-container">
      <h2>积分任务</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <h3>{{ task.name }}</h3>
          <p>{{ task.description }}</p>
          <p class="task-points">{{ task.points }} 积分</p>
          <button @click="completeTask(task)">完成任务</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {GetID, getUsers, AddPoint} from '../api/api';

export default {
  data() {
    return {
      userPoints: 0,
      tasks: [
        { id: 1, name: '每日签到', description: '每天签到一次', points: 10 },
        { id: 2, name: '进行答题', description: '进行答题', points: 50 },
        { id: 3, name: '分享活动', description: '分享活动链接到社交平台', points: 20 },
        { id: 4, name: '填写问卷', description: '完成问卷调查', points: 30 }
      ]
    };
  },
  async created() {
      const token = localStorage.getItem('token');

      if (!token) {
          throw new Error('Token not found in localStorage');
      }

      try {
          const userid = await GetID({ token: token });
          const id = userid.data.userId;
          let data = await getUsers();
          const user = data.data.find(item => item.id === id);
          if (user) {
              // 设置userPoints为找到的用户的point值
              this.userPoints = user.point;
          } else {
              // 如果没有找到用户，处理相应的情况
              this.userPoints = 0; // 或者其他合适的默认值
          }
      } catch (error) {
          console.error('Error occurred:', error);
          // 处理错误情况，比如设置this.userPoints为null
          this.userPoints = 0;
      }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchTasks() {
    },
    async completeTask(task) {
      console.log(`完成任务：${task}`);
      try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          // 发送添加动态的请求
          const response = await AddPoint({
            token: token,
            point: task.points
          });

          // 请求成功后导航到聊天页面
          window.location.reload();

        } catch (error) {
          // 处理错误
          console.error('Error adding post:', error.message);
          // 可以在界面上显示错误信息给用户
        }
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(106,178,254,0.1);
  border: 1px solid rgb(15,73,136,0.5);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr; 
  gap: 20px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 2fr; 
  }
}

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

h1 {
  color:rgb(15, 73, 136);
  font-size: 24px;
  margin: 0;
  text-align: center;
  flex: 1;
}

.points-container {
  text-align: center;
  margin-bottom: 20px;
  background-color: #ffffff; 
  padding: 16px;
  border: 1px solid rgb(56,148,251); 
  border-radius: 8px;
}
.points-container h2{
  color: rgb(42,118,204);
}
.points {
  font-size: 32px;
  color: rgb(42,118,204); 
  margin: 0;
}

.tasks-container {
  background-color: #ffffff; 
  padding: 12px; 
  margin-top: 16px; 
  border: 1px solid rgb(56,148,251);
  border-radius: 8px;
}

.tasks-container h2 {
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 12px; 
  color: rgb(42,118,204);
}

.task-item {
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  color: #666;
  background-color: rgba(106,178,254,0.1);
  border-radius: 8px;
  border: 1px solid rgb(106,178,254);
}


.task-points {
  font-size: 16px; 
  color: #666;
  margin-top: 6px;
}

button {
  padding: 8px 16px;
  background-color: rgb(42,118,204,0.5);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

button:hover,
button:focus {
  background-color: rgb(42,118,204);
}

</style>
