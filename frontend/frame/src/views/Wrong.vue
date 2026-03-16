<template>
  <div>
    <van-nav-bar title="错题集" left-text="返回" left-arrow @click-left="goBack" />
    
    <!-- 如果题目列表为空 -->
    <div v-if="questions.length === 0" class="no-questions">
      <p>你没有错题！</p>
    </div>
    <!-- 如果题目列表不为空 -->
    <van-list v-else>
      <div class="showQuestion" style="text-align: left;" v-for="(question) in questions" :key="question.id">
        <van-card>
          <!-- 根据题目类型进行渲染 -->
          <template #desc>
            <h3 style="font-weight: bold;">{{ question.introduce }}</h3>
            <p>A.{{ question.optionA }}</p>
            <p>B.{{ question.optionB }}</p>
            <p>C.{{ question.optionC }}</p>
            <p>D.{{ question.optionD }}</p>
            <h3 style="color:#3495fc;font-weight: bold;">正确答案：{{ question.correctOption }}</h3>
            <h3 style="color:#3495fc;font-weight: bold;">解析：{{ question.analyse }}</h3>
          </template>
        </van-card>              
      </div>
    </van-list>
  </div>
</template>


<script>
import axios from 'axios';
import { FetchQuestions } from '../api/api';

export default {
  data() {
    return {
      wrongAnswers: [],
      questions: [], // 题目列表
      loading: false, // 控制加载状态
    };
  },
  created() {

    this.fetchQuestions(); // 组件创建后立即获取数据
  },
  methods: {
    // 返回按钮
    goBack() {
      this.$router.push({ name: 'Challenge', params: { id: this.$route.params.id } });
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
      this.loading = true; // 开始加载
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

<style>
.showQuestion{
    padding: 1rem;
}
</style>
