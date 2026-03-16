<template>
  <div>
    <div class="header">
      <!-- 返回按钮 -->
      <img src="@/assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
      <!-- 页面标题 -->
      <h1>学习情况</h1>
    </div>
    <div class="learning-status">
      <div class="content">
        <section>
          <div class="section-container">
            <div class="subsection green-bg" style="text-align: center;"> 
              <!-- 头像 -->
              <img :src="avatarUrl"
                style="margin-top:1rem;width:6rem;height:6rem"
              />
            </div>
            <!-- 用户名 -->
            <div class="subsection green-bg" style="text-align: center;">
                <h3>{{ this.username }}</h3>
            </div>
            <div class="subsection green-bg" style="text-align: center;">
              <h3>我的答题数：</h3>
              <ul class="list">
                <div v-for="(question) in questions" :key="question.userid">
                <h3>{{ question.answerCount }}</h3>
              </div>
              </ul>
            </div>
            <div class="subsection green-bg" style="text-align: center;">
              <h3>我的正确率：</h3>
              <div v-for="(question) in questions" :key="question.userid">
              <h3>{{question.rightRate}}</h3>
            </div>
            </div>
            <!-- 错题集 -->
            <div class="subsection green-bg" style="text-align: center;">
              <span style="font-size:18px;color: rgb(42,118,204)">我的错题：</span>
              <router-link :to="{ path: '/wrong1' }">
                <span style="font-size:18px">查看详情</span>
              </router-link>
            </div>
            <div class="subsection green-bg" style="text-align: center;">
              <span style="font-size:18px;color:rgb(42,118,204);">当前排名：</span>
              <router-link :to="{ path: '/rank1' }">
                <span style="font-size:18px">查看详情</span>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FetchData,user,GetID } from '../api/api';

export default {
  data() {
    return {
      wrongAnswers: [],
      questions: [], // 题目列表
      loading: false, 
      avatarUrl:'',
      username:''
    };
  },
  created() {

    this.fetchQuestions(); 
    this.fetchUserData();
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push('/my');
    },
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
      this.username=filteredData[0].username
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    },
    // 获取题目数据
    async fetchQuestions() {
      try {
        this.loading = true; // 开始加载
		    const token = localStorage.getItem('token');
        const response = await axios.get(`http://203.195.66.65:3001/ranking/${token}`);
        const wrongData = response.data;

        const displayedIds = new Set();

        // 确保每个题目只出现一次
        this.questions = wrongData.map(wrongAnswer => {
          if (!displayedIds.has(wrongAnswer.id)) {
            displayedIds.add(wrongAnswer.id);
            return wrongAnswer;
          }
        }).filter(question => question); // 过滤掉 undefined 项

      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        this.loading = false; // 结束加载
      }
    },
	async created() {
    try {
      this.loading = true; // 开始加载
      const token = localStorage.getItem('token');
      this.questions = await FetchData(token); // 调用 API 函数
      // console.log('最终数据:', this.questions);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      this.loading = false; // 结束加载
    }
  }
  },
};
</script>

<style scoped>
.learning-status {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; 
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  top: 15px;
}

.header h1 {
  color: rgb(15,73,136);
  font-size: 24px;
  flex: 1;
  text-align: center;
}

.content {
  background-color: #fff; 
  padding: 20px;
  border: 1px solid rgb(56,148,251,0.5);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-container {

  gap: 20px;
}

.subsection.green-bg {
  background-color: rgb(106,178,254,0.1); 
  padding: 10px;
  text-align: left;
}

.subsection h3 {
  margin-top: 0;
  color: rgb(42,118,204); 
}
.subsection h2 {
  margin-top: 0;
  color: rgb(42,118,204); 
}

.course-details h4 {
  font-size: 14px;
  color: rgb(56,148,251);
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  margin-bottom: 10px;
}

.course-item {
  display: flex;
}

.course-item img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.course-details {
  display: flex;
  flex-direction:row;
  gap: 10px; 
}

.article-item {
  margin-bottom: 20px;
}

.article-item h4 {
  margin-top: 0;
  color: rgb(56,148,251);
}
</style>
