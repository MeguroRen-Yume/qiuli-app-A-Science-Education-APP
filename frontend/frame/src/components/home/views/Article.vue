<template>
    <div>
        <BackPage title="文章精选"/>
        <div class="lesson-layout" style="margin-top: 40px;">
            <div style="height: 3px;background-color: #e0efff;"></div>
            <div v-for="article in articleList" :key="article.id" class="lesson-layout-item">
                <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="lesson-link">
                    <div class="lesson-image">
                        <img :src="article.url" alt="文章图片" class="lesson-img">
                    </div>
                    <div class="lesson-content">
                        <div class="lesson-title">{{ article.title }}</div>
                        <div class="lesson-introuduce">{{ article.introduce }}</div>
                        <div class="article-nav">{{ article.subject }} | {{ article.point }} | {{ article.author }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../assets/styles/home.css";
import "../../../assets/styles/category.css";
import BackPage from "../../BackPage.vue";
import { article } from '../../../api/api';

export default {
    components: {
        BackPage,
    },
    data() {
        return {
            articleList: [],
        };
    },
    async created() {
            const data = await article();
            // 获取所有 '知识详解' 标签的文章
            const filteredData = data.filter(item => item.label === '知识详解');
            // 筛选最后十位数据
            this.articleList = filteredData.slice(-10);
    },
};
</script>

<style scoped>
.lesson-layout {
    margin-bottom: 50px;
    scroll-snap-type: y mandatory;
    background-color: #e0efff;
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
    background-color: white;
    border-bottom: 1px solid #3495fc;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
}

.lesson-link {
    display: flex;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.lesson-image {
    flex: 0 0 120px; /* 固定图片宽度 */
    overflow: hidden;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
}

.lesson-img {
    width: 80%; /* 填充父元素 */
    height: 80%; /* 填充父元素 */
    object-fit: cover;
    border-radius: 50%; /* 圆形边框 */
}

.lesson-content {
    flex: 1;
    padding: 5px;
    display: flex;
    flex-direction: column;
}

.lesson-title {
    font-family: '华文新魏';
    font-size: 20px;
    text-align: left;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    margin-left: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-wrap: break-word;
    text-align: left;
}

.lesson-introuduce {
    margin-left: 5px;
    font-size: 14px;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 1;
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
