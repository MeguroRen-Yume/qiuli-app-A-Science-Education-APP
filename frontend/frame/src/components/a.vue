<template>
    <div>
        <van-nav-bar title="题目详情" left-text="返回" left-arrow @click-left="goBack" />
        <van-card style="text-align: left;margin-top:10%; margin-left:5%;margin-right:5%">
			<template #desc>
                <h3 style="font-weight: bold; font-size:16px">{{ question.introduce }}</h3>
				<p style="font-size: 16px;">A.{{ question.optionA }}</p>
				<p style="font-size: 16px;">B.{{ question.optionB }}</p>
				<p style="font-size: 16px;">C.{{ question.optionC }}</p>
				<p style="font-size: 16px;">D.{{ question.optionD }}</p>
                <h3 style="color:#3495fc;font-weight: bold;font-size: 16px;">正确答案：{{ question.correctOption }}</h3>
				<h3 style="color:#3495fc;font-weight: bold;font-size: 16px;">解析：{{ question.analyse }}</h3>
		    </template>
	    </van-card>  
    </div>
</template>

<script>
import "../assets/styles/home.css";
import BackPage from "./BackPage.vue";
import { getQuestionById } from '../api/api';
export default {
  data() {
    return {
      question: {},
    };
  },
  async created() {
        const articleId = this.$route.params.id;
        try {
            this.question = await getQuestionById(articleId);
        } catch (error) {
            console.error('Error fetching a:', error);
        }
    },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
   
  }
};
</script>
<style scoped></style>