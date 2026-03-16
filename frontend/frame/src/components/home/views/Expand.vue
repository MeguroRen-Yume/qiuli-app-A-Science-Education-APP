<template>
    <div>
        <BackPage title="趣味拓展"/>
        <div class="question" style="margin-top: 40px;">
            <ul class="course-list">
                <li class="question-item" v-for="item in questionList" :key="item.id">
                    <RouterLink :to="{ name: 'expandDetail', params: { id: item.id } }" class="question-link">
                        <div class="question-item-content">
                            <div class="question-pic">
                                <img :src="item.url" alt="" class="course-img">
                            </div>
                            <div class="question-content">
                                <p class="question-name">{{ item.title }}</p>
                                <p class="course-content">{{ item.introduce }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import "../../../assets/styles/home.css";
import BackPage from "../../BackPage.vue";
import { expand } from '../../../api/api';
export default{
    components: {
        BackPage,
    },
    data(){
        return {
            questionList:[] 
        }
    },
    async created() {
        try {
        this.questionList = await expand(); // 调用从后端获取文章的函数
        } catch (error) {
        console.error('Error fetching articles:', error);
        }
    }
};
</script>
<style scoped>
.question {
    width: 100%;
    margin-bottom: 40px;
    margin-top: 15px;
}

.course-list {
    list-style-type: none;
    padding: 0;
}

.question-item {
    margin-top: 10px; 
    background-color: #fff;
    align-items: center;
    justify-content: center;
}

.question-link {
    text-decoration: none; /* 去除链接的下划线 */
    color: inherit; /* 继承父元素的文字颜色 */
}

.question-item-content {
    width: 100%;
    display: flex; /* 使用 Flexbox 布局 */
    align-items: flex-start; /* 垂直对齐方式 */
    align-items: center;
    justify-content: center;
}

.question-pic {
    width: 30%; /* 图片占据30%宽度 */
    margin-right: 20px; /* 图片与内容之间的间距 */
}

.question-content {
    width: 50%; /* 内容占据70%宽度 */
}

.question-name {
    font-size: 18px;
    color: black;
    font-family: '微软雅黑';
    margin: 0; /* 清除段落的默认外边距 */
}

.course-content {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
    margin: 0; /* 清除段落的默认外边距 */
}

.course-img {
    width: 100%;
    height: auto;
    display: block;
}
</style>