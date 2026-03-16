<template>
    <div>
    <BackPage title="经典题目"/>
    <div class="lesson-layout" style="margin-top: 40px;">
      <div style="height: 3px;background-color: white;"></div>
        <div v-for="question in questionList" :key="question.id" class="lesson-layout-item">
            <router-link :to="{ name: 'a', params: { id: question.id } }" style="width: 100%;">
                <div class="lesson-introuduce">{{ question.introduce }}</div>
                <div class="article-nav">{{question.source}} | {{question.point}}</div>
            </router-link>
        </div>
    </div>
    </div>
</template>
<script>
import "../../../assets/styles/category.css";
import "../../../assets/styles/home.css";
import BackPage from "../../BackPage.vue";
import axios from 'axios';

export default {
    components: {
        BackPage,
    },
    data() {
        return {
            questionList: [],
            loading: false, 
        };
    },
    created() {
        this.fetchQuestions(); 
    },
    methods: {
        async fetchQuestions() {
            try {
                this.loading = true; // Start loading
                const response = await axios.get('http://203.195.66.65:3001/answer');
                
                if (response.status === 200) { 
                    this.questionList = response.data;
                    console.log(this.questionList)
                }
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            } finally {
                this.loading = false; // End loading
            }
        },
    },
};
</script>
<style scoped>
.lesson-layout {
    margin-bottom: 50px;
    scroll-snap-type: y mandatory;
    background-color: white;
}

.lesson-layout-item {
    display: flex;
    margin: 0 auto;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    margin-top: 8px;
    width: 92%;
    height: 110px;
    border-radius: 50px;
    background-color: #e0efff;
    border-bottom: 1px solid #3495fc;
    position: relative;
    overflow: hidden;
  align-items: center;
}

.lesson-introuduce {
  position: relative;
    margin-left: 40px;
    font-size: 16px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-wrap: break-word;
    text-align: left;
}

.article-nav {
    font-size: 12px;
    text-align: center;
    color: #333;
    margin-top: auto;
    align-self: flex-end;
    position: absolute;
    bottom: 10px;
    right: 30px;
}
</style>