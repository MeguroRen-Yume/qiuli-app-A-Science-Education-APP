<template>
  <div class="post-detail">
    <div class="header">
      <img src="@/assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
      <h1>帖子详情</h1>
    </div>

    <div class="post">
      <div class="post-header">
        <img :src="getUser(post.userid).avatar" class="round-image">
        <div class="post-user-info">
          <p class="post-user">{{ getUser(post.userid).username }}</p>
          <p class="post-date">{{ formatDate(post.createdAt) }}</p>
        </div>
      </div>
      <div class="post-content">
        <p>{{ post.content }}</p>
        <div class="post-actions">
          <span class="action-button" @click="toggleLike(post)">
            <img :src="isLiked(post) ? likedIcon : notLikedIcon" class="button" alt="Like Button">
          </span>
          <span>{{ post.likes }} 点赞</span>
          <span class="action-button" @click="toggleCommentInput">
            <img src="/src/assets/img/pl.png" class="button">
          </span>
          <span>{{ getComments(post.id).length }} 评论</span>
        </div>
      </div>
    </div>

    <div class="comments-section">
      <div v-if="post.showCommentInput" class="comment-input">
        <textarea v-model="post.newComment" placeholder="请输入评论内容"></textarea>
        <div class="button-container">
          <button @click="addComment">提交评论</button>
        </div>
      </div>
      <div v-for="comment in getComments(post.id)" :key="comment.id" class="comment">
        <div class="comment-header">
          <img :src="getUser(comment.userid).avatar" class="round-image">
          <div class="comment-user-info">
            <p class="comment-user">{{ getUser(comment.userid).username }}</p>
            <p class="comment-date">{{ formatDate(comment.createdAt) }}</p>
          </div>
        </div>
        <div class="comment-content">
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import likedIcon from '../assets/img/z_filled.png';
import notLikedIcon from '../assets/img/z.png';
import { getPostById,comments,user,addComment,PostAddLike,PostCancelLike,postlike,PostAddClick } from '../api/api';
export default {
  name: 'PostDetail',
  data() {
    return {
      post: {},
      comments: [],
      users: [],
      likelist:[],
      likedIcon,
      notLikedIcon
    };
  },
  async created() {
        const articleId = this.$route.params.id;
        try {
            this.post = await getPostById(articleId);
            this.comments = await comments();
            this.users = await user();
            this.likelist = await postlike();
            this.AddClick(this.post);
        } catch (error) {
            console.error(error);
        }
    },
  methods: {
    async AddClick(post){
      const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
      if (!token) {
         throw new Error('Token not found in localStorage');
      }
      try {
        await PostAddClick({ token, postid: post.id });
      } catch (error) {
        console.error(error);
      }
    },
    isLiked(post) {
      return this.likelist.some(like => like.postid === post.id);
    },
    goBack() {
      this.$router.go(-1);
    },
    async toggleLike(post) {
      const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
      if (!token) {
         throw new Error('Token not found in localStorage');
      }
      try {
        let isLiked = this.likelist.some(like => like.postid === post.id);
        if (isLiked) {
          // Unlike the post
          await PostCancelLike({ token, postid: post.id });
          post.likes -= 1;
          this.likelist = this.likelist.filter(like => like.postid !== post.id);
        } else {
          await PostAddLike({ token, postid: post.id });
          post.likes += 1;
          this.likelist = [...this.likelist, { postid: post.id }];
        }
        post.liked = !post.liked;
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },
    toggleCommentInput() {
      this.post.showCommentInput = !this.post.showCommentInput;
    },
    async addComment() {
      if (this.post.newComment.trim()) {
        try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');
          
          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          const response = await addComment({
            token: token,
            postid: this.post.id,
            content: this.post.newComment
          });

          window.location.reload();

        } catch (error) {
          // 处理错误
          console.error('Error adding comment:', error.message);
          // 可以在界面上显示错误信息给用户
        }
      }
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
.post-detail {
  padding: 20px;
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
  color: rgb(15,73,136);
  flex: 1;
  text-align: center;
}

.button {
  width: 20px;
  height: 20px;
  overflow: hidden;
  margin-right: 10px;
}

.round-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgb(106,178,254,0.2);
  border: 1px solid rgb(106,178,254);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.post-user-info {
  margin-left: 10px; 
}

.post-content {
  font-size: 18px;
  text-align: center; 
  color: rgb(15,73,136);
}

.post-user {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: rgb(15,73,136);
}

.post-date {
  font-size: 12px;
  color: rgb(100, 100, 100);
}

.post-actions {
  display: flex;
  justify-content: center;
  color: #666;
  margin-top: 10px;
}

.post-actions span {
  margin-right: 5px;
}

.comments-section {
  margin-top: 20px;
}

.comment {
  margin-bottom: 15px;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment .round-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.comment-user-info {
  margin-left: 10px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-content {
  margin-top: 10px; 
  width: 90%;
  height:100%;
  background-color: rgb(106,178,254,0.1);
  padding: 20px;
  border-radius: 8px;
  text-align:left; 
}

.comment-user {
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  color: rgb(15,73,136);
}

.comment-date {
  color: #666;
  font-size: 12px;
}

.comment-input {
  margin-top: 10px;
}

.comment-input textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.comment-input button {
  padding: 6px 14px;
  background-color: rgb(56,148,251);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
