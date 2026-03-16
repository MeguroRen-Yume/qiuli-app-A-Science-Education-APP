<template>
  <div class="page-container">
    <div class="header">
      <!-- 返回按钮 -->
      <img src="../assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
      <!-- 页面标题 -->
      <h1>群组页面</h1>
    </div>
    
    <!-- 搜索框 -->
    <div class="search-container" @click.stop>
      <input type="text" v-model="searchKeyword" placeholder="搜索群组" class="search-box" @focus="showSearchHistory"  @keydown.enter="fetchSearchHistory" >
      <!-- 搜索历史记录 -->
      <ul v-if="showHistory" class="search-history">
        <li v-for="historyItem in searchHistory" :key="historyItem.id">{{ historyItem.content }}</li>
    </ul>
    </div>
    
    <!-- 群组列表 -->
    <div class="group-list">
      <div v-for="group in groups" :key="group.id" class="group-item">
        <span>{{ group.group_name }}</span>
        <button @click="addGroup(group)" class="add-button">加入</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {group, historygroup, addHistoryGroup, GetID, JoinGroup} from '../api/api.js';

export default {
  data() {
    return {
      searchKeyword: '', // 存储搜索关键词
      showHistory: false, // 控制是否显示搜索历史记录
      searchHistory: [],
      groups: []
    };
  },
  created() {
    // 在组件创建时获取搜索历史记录
    // this.fetchSearchHistory();
    this.fetchGroupList();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async fetchSearchHistory() {
      if (this.searchKeyword.trim()) {
        try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          const response = await addHistoryGroup({
            token: token,
            content: this.searchKeyword
          });

          window.location.reload();

        } catch (error) {
          // 处理错误
          console.error('Error adding comment:', error.message);
          // 可以在界面上显示错误信息给用户
        }
      }
    },
    async fetchGroupList() {
      try {
            this.groups = await group();
            console.log(this.groups)
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    },
    async addGroup(group) {
        try {
          const token = localStorage.getItem('token');

          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          // 发送请求到后端
          const response = await JoinGroup({
            token: token,
            groupid: group.id
          });
          this.$router.push('/chat');

        } catch (error) {
          // 处理错误
          console.error('Error creating group:', error.message);
        }
    },
    goBack() {
      this.$router.go(-1);
    },
    async showSearchHistory() {
      this.showHistory = true;
      try {
        const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

            const userid= await GetID({
            token: token,
            });
            const id= userid.data.userId
            let data = await historygroup();
            const filteredData = data.filter(item => parseInt(item.userid) === id);
            this.searchHistory = filteredData.slice(-3)
        console.log(this.searchHistory)
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showHistory = false;
      }
    }
  },
  computed: {
        sortedLatest() {
            return this.searchHistory.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
  }
};
</script>

<style scoped>
.page-container {
  margin-top: 20px; 
  padding: 0 20px; 
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

.header h1 {
  font-size: 24px;
  margin: 0;
  flex: 1;
  color: rgb(15,73,136);
  text-align: center;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative; 
  margin-bottom: 20px; 
}

.search-box {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.search-history {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-history li {
  padding: 8px;
  cursor: pointer;
}

.search-history li:hover {
  background-color: #f0f0f0;
}

.group-list {
  width: 100%;
  background-color: rgba(106,178,254,0.1);
}

.group-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid rgb(106,178,254);
}

.group-item:last-child {
  border-bottom: none;
}

.add-button {
  margin-left: auto; 
  padding: 6px 12px;
  background-color: rgb(56,148,251);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: rgb(42,118,204);
}
</style>