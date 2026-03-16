<template>
  <div class="content">
    <div class="head">
      <img src="/src/assets/img/chat_copy.png" class="round-image" >
      <div style="display: block;margin-left:5px">
      <h1 class="app-title">学习交流区</h1>
        <div style="display: flex">
    <router-link :to="{ path: '/group' }" class="group">
      <div style="font-weight: bold;">当前群组：</div>
    </router-link>
        <select id="groupSelect" v-model="currentGroup" @change="groupChanged">
          <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.group_name }}</option>
        </select>
        </div>
        </div>
      </div>

    <div class="tabs">
      <button class="tab" @click="currentTab = 'latest'" :class="{ 'active': currentTab === 'latest' }">最新</button>
      <button class="tab" @click="currentTab = 'hot'" :class="{ 'active': currentTab === 'hot' }">最热</button>
      <button class="tab" @click="currentTab = 'essence'" :class="{ 'active': currentTab === 'essence' }">精华</button>
    </div>

    <div v-if="currentTab === 'latest'">
      <div v-for="post in sortedLatestPosts" :key="post.id" class="post">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <div class="post-header">
            <img :src="getUser(post.userid).avatar" class="round-image">
            <div class="post-user-info">
              <p class="post-user">{{ getUser(post.userid).username }}</p>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
        </router-link>
        <div class="post-actions">
          <span>{{ post.likes }} 点赞</span>
          <span>{{ getComments(post.id).length }} 评论</span>
        </div>
        <div v-show="post.showCommentInput" class="comment-input">
          <input v-model="post.newComment" type="text" placeholder="输入评论">
          <button @click="addComment(post)">发布</button>
        </div>
      </div>
    </div>

    <div v-else-if="currentTab === 'hot'">
      <div v-for="post in hotPosts" :key="post.id" class="post">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <div class="post-header">
            <img :src="getUser(post.userid).avatar" class="round-image">
            <div class="post-user-info">
              <p class="post-user">{{ getUser(post.userid).username }}</p>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
        </router-link>
        <div class="post-actions">
          <span>{{ post.likes }} 点赞</span>
          <span>{{ getComments(post.id).length }} 评论</span>
        </div>
        <div v-show="post.showCommentInput" class="comment-input">
          <input v-model="post.newComment" type="text" placeholder="入评论">
          <button @click="addComment(post)">发布</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-for="post in essencePosts" :key="post.id" class="post">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <div class="post-header">
            <img :src="getUser(post.userid).avatar" class="round-image">
            <div class="post-user-info">
              <p class="post-user">{{ getUser(post.userid).username }}</p>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
        </router-link>
        <div class="post-actions">
          <span>{{ post.likes }} 点赞</span>
          <span>{{ getComments(post.id).length }} 评论</span>
        </div>
        <div v-show="post.showCommentInput" class="comment-input">
          <input v-model="post.newComment" type="text" placeholder="输入评论">
          <button @click="addComment(post)">发布</button>
        </div>
      </div>
    </div>

    <div class="floating-icon" @click="toggleMenu">
      +
    </div>
    <div v-if="menuOpen" class="menu">
      <button @click="postStatus">发表动态</button>
      <button @click="createGroup">发起群组</button>
      <button @click="toggleMenu">取消</button>
    </div>
  </div>
</template>

<script>
import { post,comments,user,fetchGroups,allgroup,group } from '../api/api';
export default {
  name: 'Chat',
  data() {
    return {
      currentTab: 'latest',
      menuOpen: false,
      posts: [],
      comments: [],
      users: [],
      currentGroup:'',
      groups: [],
      grouplist:[],
    };
  },
  async created() {
        try {
            this.grouplist = await group();
            let data = await allgroup();
            const userIds = data.map(item => item.groupid);
            const filteredGrouplist = this.grouplist.filter(item => userIds.includes(item.id));
            this.groups = filteredGrouplist;
            if (this.groups.length > 0) {
              this.currentGroup = this.groups[0].id; // 默认选中第一个 group
            }
            const data1 = await post();
            const data2 = await comments();
            const data3 = await user();
            this.posts = data1;
            this.comments = data2;
            this.users = data3;
        } catch (error) {
        console.error('Error fetching articles:', error);
        }
  },
  async loadGroups() {
      try {
        const token = localStorage.getItem('token');
          
          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }
        const response = await fetchGroups({
            token: token,
        });
        
        this.groups = response.data.groups;
        if (this.groups.length > 0) {
          this.currentGroup = this.groups[0].id; 
        }
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    },
  computed: {
    sortedLatestPosts() {
      return this.posts.filter(post => new Date(post.createdAt) >= new Date('2023-04-01')).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    hotPosts() {
      return this.posts.filter(post => post.likes > 5 );
    },
    essencePosts() {
      return this.posts.filter(post => post.likes > 15);
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    postStatus() {
      this.$router.push('/publish');
    },
    createGroup() {
      this.$router.push('/launch');
    },
    addComment(post) {
      if (post.newComment.trim()) {
        this.comments.push({
          id: this.comments.length + 1,
          postid: post.id,
          userid: 1,
          content: post.newComment,
          createdAt: new Date().toISOString()
        });
        post.newComment = '';
        post.showCommentInput = false;
      }
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
.content {
  max-width: 800px; 
  width: 100%; 
  background-color: #fff;
  padding: 10%;
  box-sizing: border-box;
}

.head {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: rgb(15,73,136);
}

.round-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.group{
  color: rgb(15,73,136);
  position:relative;
  display: flex;
  margin-left: 10px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 16px;
  margin-right: 10px;
}

.tab:hover {
  background-color: rgb(106, 178, 254, 0.2);
}

.tab.active {
  font-weight: bold;
  color: rgb(15,73,136);
}

.post {
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(106, 178, 254, 0.2);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 调整文字离昵称的间距 */
}

.post-user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px; /* 调整昵称和头像之间的间距 */
}

.post-content {
  font-size: 16px;
  text-align: left;
  padding: 5px;
  color: rgb(15,73,136);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-wrap: break-word;
}

.post-user {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: rgb(15,73,136);
}

.post-date {
  font-size: 12px;
  text-align: left;
  color: rgb(100, 100, 100);
}

.post-actions {
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-top: 10px;
}

.post-actions span {
  margin-right: 10px;
}

.comment-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.comment-input input {
  flex: 1;
  margin-right: 10px;
}

.floating-icon {
  position: fixed;
  bottom: 65px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: rgb(56,148,251);
  color: white;
  border-radius: 50%;
  font-size: 36px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background-color: rgb(56,148,251);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.menu1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(56,148,251);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.comment-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.comment-input input {
  flex: 1;
  margin-right: 10px;
}
</style>
