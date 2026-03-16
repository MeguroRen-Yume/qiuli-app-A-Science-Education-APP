<template>
  <div>
    <div class="header">
      <img src="@/assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
      <h1>点赞记录</h1>
    </div>
    <div class="post-container">
      <div v-if="sortedLatestPosts.length === 0" class="no-questions">
        <p>快去点赞吧！</p>
      </div>
      <ul v-else></ul>
      <div v-for="post in sortedLatestPosts" :key="post.id" class="post-item" @click="goToPostDetail(post.id)">
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
</template>

<script>
import { postlike,post,comments,user,fetchGroups,allgroup,group } from '../api/api';
export default {
  data() {
    return {
      posts: [],
      comments: [],
      users:[],
    };
  },
  async created() {
    try {
      const postsData = await post(); // 获取 post 数据
      const postlikesData = await postlike(); // 获取 postlike 数据
      
      postlikesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // 创建一个映射，记录 postid 和 created_at 的时间戳
        const postLikesMap = new Map();
        postlikesData.forEach(postlike => {
            postLikesMap.set(postlike.postid, postlike.created_at);
        });

        // 按照 postlikesData 的 created_at 时间戳对 postsData 进行排序
        this.posts = postsData
            .filter(post => postLikesMap.has(post.id)) // 筛选出在 postlikesData 中存在的 post
            .sort((a, b) => new Date(postLikesMap.get(b.id)) - new Date(postLikesMap.get(a.id))); // 按照时间戳排序

        // 获取其他数据
        const commentsData = await comments();
        const usersData = await user();

        this.comments = commentsData;
        this.users = usersData;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
  },
  computed: {
    sortedLatestPosts() {
      return this.posts;
    },
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
    formatDate(isoString) {
        const dateObj = new Date(isoString);

        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const date = ('0' + dateObj.getDate()).slice(-2);
        const hours = ('0' + dateObj.getHours()).slice(-2);
        const minutes = ('0' + dateObj.getMinutes()).slice(-2);
        const seconds = ('0' + dateObj.getSeconds()).slice(-2);

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
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
  flex: 1;
  color: rgb(15,73,136);
  text-align: center;
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
  margin-bottom: 10px; /* 调整文字离昵称的间距 */
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
  margin-left: 10px; /* 调整昵称和头像之间的间距 */
}

.post-user-name {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: rgb(15,73,136);
}

.post-user-time {
  font-size: 12px;
  text-align: left;
  color: rgb(100, 100, 100);
}

.post-content {
  margin-bottom: 10px;
  text-align: left;
  padding: 5px;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-wrap: break-word;
}

.post-actions {
  display: flex;
  justify-content: space-between;
}

.post-actions span {
  color: #666;
}
</style>
