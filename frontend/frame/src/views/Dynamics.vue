<template>
  <div>
    <div class="header">
      <img src="../assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
      <h1>个人动态</h1>
    </div>
    <div class="post-container">
      <div v-if="posts.length === 0" class="no-posts-message">
        <p>快来发表动态吧</p>
      </div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="post-item" @click="goToPostDetail(post.id)">
          <div class="post-header">
            <img :src="getUser(post.userid).avatar" class="post-avatar">
            <div class="post-user-info">
              <p class="post-user-name">{{ getUser(post.userid).username }}</p>
              <p class="post-user-time">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
          <div class="post-actions">
            <span>{{ post.likes }} 点赞</span>
            <span>{{ getComments(post.id).length }} 评论</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post, comments, user, GetID} from '../api/api';
export default {
  data() {
    return {
      posts: {},
      comments: [],
      users: []
    };
  },
  async created() {
      try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found in localStorage');
            }

            const userid= await GetID({
            token: token,
            });
            const id= userid.data.userId
            const data1 = await post();
            const data2 = await comments();
            const data3 = await user();
            this.posts = data1;
            this.comments = data2;
            this.users = data3;
            let posts=this.posts.filter(post => post.userid === id);
            this.posts =posts
        } catch (error) {
        console.error('Error fetching articles:', error);
        }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToPostDetail(postId) {
      this.$router.push({ name: 'PostDetail', params: { id: postId } });
    },
    getUser(userid) {
      return this.users.find(user => user.id === userid) || {};
    },
    getComments(postid) {
      return this.comments.filter(comment => comment.postid === postid);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('zh-CN', options);
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
  color: rgb(15,73,136);
  flex: 1;
  text-align: center;
  margin: 0;
}

.post-container {
  padding: 20px;
}

.post-item {
  background-color: rgba(106,178,254,0.2);
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.post-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-user-info {
  display: flex;
  flex-direction: column;
  justify-content: center; 
}

.post-user-name {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: rgb(15,73,136);
}

.post-user-time {
  font-size: 14px;
  text-align: left;
  color: rgb(100, 100, 100);
}

.post-content {
  margin-bottom: 10px;
  text-align: center; 
}

.post-actions {
  display: flex;
  justify-content: space-between;
}

.post-actions span {
  color: #666;
}
</style>
