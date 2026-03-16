<template>
	<div class="totalPage">
		<div style="margin-top: -5.7%;">
		<router-link :to="{ name: 'Challenge', params: { id: this.$route.params.id } }">
         <van-nav-bar title="挑战" left-text="返回" left-arrow/>
		</router-link>
		</div>
		<!-- 进度条 -->
		<van-progress style="margin-top: 5%;" :percentage="(currentQuestionIndex+1) / questions.length * 100" stroke-width="8" pivot-text="" color="#1989fa" />

		<!-- 题目 -->
		<div v-if="currentQuestionIndex < questions.length" class="question-card">
			<van-card style="font-size: large; text-align: left; --van-card-title-line-height: auto; line-height: normal; --van-radio-size: none;"
					  :title="`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].introduce}`"
					  :class="{ 'bg-red': showAnswer[questions[currentQuestionIndex].id] && selectedAnswers[questions[currentQuestionIndex].id] !== questions[currentQuestionIndex].correctOption }">
				
				<template #desc>
					<van-radio-group v-model="selectedAnswers[questions[currentQuestionIndex].id]">
						<van-radio style="line-height: 40px;" :name="'A'">A.{{ questions[currentQuestionIndex].optionA }}</van-radio>
						<van-radio style="line-height: 40px;" :name="'B'">B.{{ questions[currentQuestionIndex].optionB }}</van-radio>
						<van-radio style="line-height: 40px;" :name="'C'">C.{{ questions[currentQuestionIndex].optionC }}</van-radio>
						<van-radio style="line-height: 40px;" :name="'D'">D.{{ questions[currentQuestionIndex].optionD }}</van-radio>
					</van-radio-group>
					<p class="answer" v-if="showAnswer[questions[currentQuestionIndex].id]">正确答案：<span class="correct">{{ questions[currentQuestionIndex].correctOption }}</span></p>
				</template>
				<!-- 可以增加其他题型 -->
			</van-card>
		</div>

		<van-empty v-else />

		<!-- 上一题和下一题按钮 -->
        <div class="preNextButton">
            <van-button style="float: right; width: 40%;" v-if="currentQuestionIndex < questions.length - 1" type="primary" block @click="nextQuestion">下一题</van-button>
            <van-button style="float: left; width: 40%;" v-if="currentQuestionIndex > 0" type="primary" block @click="previousQuestion">上一题</van-button>
		</div>
		
    <!-- 提交答案按钮 -->
		<van-button style="float: right; width: 40%; margin-right:10%" v-if="currentQuestionIndex === questions.length - 1" type="primary" block :disabled="isSubmitting" @click="onSubmit">{{ submitBtnText }}</van-button>
	</div>
</template>

<script>
	import axios from "axios";
	import { showDialog } from 'vant';
	import { getQuestions,sendWrongAnswer, sendRank,fetchQuestionsForThirdGrade } from '../api/api'; 

	export default {
	  data() {
	    return {
	      questions: [], // 题目列表
	      selectedAnswers: {}, // 用户选择的答案
	      showAnswer: {}, // 是否显示答案
	      isVertical: false, // 是否垂直布局选项
	      currentQuestionIndex: 0, // 当前问题的索引
	      totalScore: 0, // 总分数
	      isSubmitting: false, // 是否提交答案
		  wrongAnswers: [],
		  rightRate: 0, //准确率
		  answerCount: 0, //答题数
	    };
	  },
	  computed: {
	    submitBtnText() {
	      return this.isSubmitting ? '已提交' : '提交'
	    }
	  },
	  methods: {

		async fetchQuestions() {
			try {
				console.log('题库'+this.$route.params.id);
				const choose='题库'+this.$route.params.id;
				this.questions = await fetchQuestionsForThirdGrade(choose);
				
				// this.questions.filter(questions => questions.source === '三年级' && questions.name === '题库1')
				this.initializeSelectedAnswers();
				this.initializeShowAnswer();
				this.showQuestion();
			} catch (error) {
				console.error('Failed to initialize questions:', error);
      }
		},

		initializeSelectedAnswers() {
			this.selectedAnswers = {};
			this.questions.forEach(question => {
			this.selectedAnswers[question.id] = null;
			});
		},

		initializeShowAnswer() {
			this.showAnswer = {};
			this.questions.forEach(question => {
			this.showAnswer[question.id] = false;
			});
		},
	    // 返回按钮
	    onClickLeft() {
	      this.$router.push("/challenge");
	    },
	
	    // 提交答案的代码
	    onSubmit() {
			let totalCount = Object.keys(this.selectedAnswers).length;
			let correctCount = 0;

			// 禁用提交按钮
			this.isSubmitting = true;

			// 计算总得分
			for (const question of this.questions) {
				const userAnswer = this.selectedAnswers[question.id];
				if (userAnswer === question.correctOption) {
				correctCount++;
				} else {
				this.wrongAnswers.push(question); // 添加做错的题目到数组
				}
				this.answerCount++;
				// 显示正确答案
				this.showAnswer[question.id] = true;
			}
			this.totalScore = (100 * correctCount / totalCount).toFixed(2);
			this.rightRate = ( correctCount / totalCount).toFixed(2);

			// 使用vant-ui组件弹出对话框显示结果
			const message = `你选择了 ${totalCount} 道题，答对了 ${correctCount} 道题。总得分：${this.totalScore} 分。`;

			showDialog({
				title: "挑战结束",
				message: message,
			}).then(() => {
				// 在关闭对话框后发送做错的题目到后端
				this.sendWrongAnswers();
				this.sendrightRate();
			});

			// 禁用提交按钮
			this.isSubmitting = true;

			// 显示正确答案
			for (const question of this.questions) {
				this.showAnswer[question.id] = true;
			}
			},

			async sendWrongAnswers() {
				const token = localStorage.getItem('token');
				for (const wrongAnswer of this.wrongAnswers) {
					try {
					const response = await sendWrongAnswer({
					token: token,
					id: wrongAnswer.id, 
					name: wrongAnswer.name,
					source: wrongAnswer.source,
					point: wrongAnswer.point,
					introduce: wrongAnswer.introduce,
					optionA: wrongAnswer.optionA,
					optionB: wrongAnswer.optionB,
					optionC: wrongAnswer.optionC,
					optionD: wrongAnswer.optionD,
					correctOption: wrongAnswer.correctOption,
					analyse: wrongAnswer.analyse,
					
					});

					if (response.status === 201) {
						console.log('错题上传成功！');
					} else {
						console.error('错题上传失败:', error);
					}
				} catch (error) {
					console.error('错题上传过程中发生错误:', error);
				}
			}
		},
		async sendrightRate() {
			const token = localStorage.getItem('token');
					try {
					const response = await sendRank({
						token: token,
						rightRate: this.rightRate,
						answerCount: this.answerCount
					});

					if (response.status === 201) {
						console.log('准确率上传成功！');
					} else {
						console.error('准确率上传失败:', error);
					}
				} catch (error) {
					console.error('准确率上传过程中发生错误:', error);
			}
		},

	
  previousQuestion() {
	  this.currentQuestionIndex--;
      if(this.isSubmitting==false){
        // 清除答案显示
        delete this.showAnswer[this.questions[this.currentQuestionIndex].id];
      }

	},
	nextQuestion() {
		this.showAnswer[this.questions[this.currentQuestionIndex].id] = true;
		this.currentQuestionIndex++;
	},
	// 显示当前问题
	showQuestion() {
	  // 获取当前问题
	  const question = this.questions[this.currentQuestionIndex];
	  this.isVertical = false;
	
	  // 显示问题并将提交按钮重新启用
	//   this.$refs.submitButton.disable = false;
	},
	},
	mounted() {
	this.fetchQuestions();
	axios
	.get()
	.then((res) => {
	this.questions = res.data.data;
	    this.showQuestion();
	  })
	  .catch((error) => {
	    console.log(error);
	  });
	},
	};
</script>

<style>
  .answer {
	  color: red;
	  margin-bottom: 0;
	}
  .question-card {
    padding: 2rem;
  }
  .preNextButton{
    margin-left: 10%;
    margin-right: 10%;
  }
</style>
