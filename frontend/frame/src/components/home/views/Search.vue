<template>
  <div class="after-search">
    <BackPage title="搜索结果"/>
    <div style="margin-top: 50px;">
    <p>您搜索的内容: {{ $route.query.q }}</p>
    <ul>
      <li v-for="(article, index) in articleResults" :key="index" class="lesson-layout-item">
            <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">
                <div class="lesson-title">{{ article.title }}</div>
                <div class="lesson-introuduce">{{ article.introduce }}</div>
                <div class="article-nav">{{article.subject}} | {{article.point}} | {{ article.author }}</div>
            </router-link>
      </li>
      <li v-if="articleResults.length === 0">没有找到相关结果。</li>
    </ul>
    </div>
  </div>
</template>

<script>
import { article,expand } from '../../../api/api'; 
import BackPage from "../../BackPage.vue";
import "../../../assets/styles/home.css";
import "../../../assets/styles/category.css";
import Header from '../components/homeHeader.vue';
import searchbox from '../components/homeSearchbox.vue';

export default {
    components: {
        BackPage,
        Header,
        searchbox,
    },
    setup() {
        const onClickBack = () => {
            history.back();
        };
        return {
            onClickBack,
        };
    },
    data() {
        return {
            articleResults: [],
            expandResults: [],
        };
    },
    created() {
        this.search(); // 组件创建时执行搜索
    },
    methods: {
        async search() {
        try {
            const query = this.$route.query.q; // 获取路由中的查询参数 q
            const data = await article(query); 
            const data1 = await expand(query); 
            this.articleResults = data; 
            this.expandResults = data1; 
            console.log(this.articleResults)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        }
    }
};
</script>

<style scoped>
.lesson-layout{
    margin-bottom: 50px;
    scroll-snap-type: y mandatory;
}
.lesson-layout-item{
    display: flex;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    margin-top: 2px;
    width: 100%;
    height: 130px;
    border-radius: 20px;
    background-color: #e0efff;
    border-bottom: 1px solid #3495fc;
    justify-items: center;
}
.lesson-title{
margin-top: 20px;
margin-left: 25px;
width: 80%;
font-family: '华文新魏';
font-size: 24px;
text-align: left;
word-break: break-all;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
 color:black;
}
.lesson-introuduce{
margin-left: 23px;
width: 80%;
color:black;
word-break: break-all;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
font-size: 17px;
}

</style>
