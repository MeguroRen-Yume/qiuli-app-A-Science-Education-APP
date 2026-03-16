<template>
  <div>
  <div class="header">
    <img src="@/assets/img/arrow-left.png" class="back-button" @click="goBack" alt="返回">
    <h1>错题集</h1>
  </div>
  <div class="history-questions">
    <h2>历史错题记录</h2>
    <div v-if="questions.length === 0" class="no-questions">
    <p>你没有错题！</p>
  </div>
  <ul v-else>
      <li v-for="question in questions" :key="question.id">
        <div class="question-item">
          <div class="question-header">
            <p class="question-title">{{ question.introduce}}</p>
            <span class="question-type">{{ question.point }}</span>
          </div>
          <div class="question-options">
            <p>A. {{ question.optionA }}</p>
            <p>B. {{ question.optionB }}</p>
            <p>C. {{ question.optionC }}</p>
            <p>D. {{ question.optionD }}</p>
            <h3 style="color:#3495fc;font-weight: bold;font-size: 16px;text-align: left;margin-left: 3%;margin-top: 5px">正确答案：{{ question.correctOption }}</h3>
				    <h3 style="color:#3495fc;font-weight: bold;font-size: 16px;text-align: left;margin-left: 3%">解析：{{ question.analyse }}</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FetchQuestions } from '../api/api';

export default {
  data() {
    return {
      wrongAnswers: [],
      questions: [],
      loading: false, // 控制加载状态
    };
  },
  created() {

    this.fetchQuestions(); // 组件创建后立即获取数据
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push("/My");
    },
    // 获取题目数据
    async fetchQuestions() {
      try {
        this.loading = true; // 开始加载
		    const token = localStorage.getItem('token');
        const response = await axios.get(`http://203.195.66.65:3001/wrong/${token}`);
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
      this.loading = true;
      const token = localStorage.getItem('token');
      this.questions = await FetchQuestions(token); // 调用 API 函数
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

.history-questions h2 {
  margin-bottom: 10px;
  color: rgb(42,118,204);
  text-align: center;
}

.history-questions {
  border: 1px solid rgb(106,178,254);
  border-radius: 5px;
  font-family: Arial, sans-serif;
  background-color: rgb(106,178,254,0.1);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

.question-item {
  margin-bottom: 10px;
  padding: 10px;
  color:#666;
  background-color: rgb(106,178,254,0.2);
  border-radius: 4px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-title {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  overflow-wrap: break-word; /* 允许单词内部换行 */
  white-space: normal; /* 允许文本自动换行 */
  max-width: 80%; /* 根据实际需要调整 */
}

.question-type, .question-status {
  padding: 4px 8px;
  border-radius: 4px;
  color:rgb(56,148,251,0.8);
  background-color: #ffffff;
}

.question-options {
  margin-top: 10px;
}

.question-options p {
  margin: 0;
  padding: 5px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}
</style>
