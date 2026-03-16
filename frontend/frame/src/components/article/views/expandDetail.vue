<template>
    <div>
    <BackPage title="拓展"/>
    <div class="article-layout" style="margin-top: 60px;">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-author">作者：{{ article.author }}</div>
        <div class="article-au">创建时间：{{ this.formatDate(article.created_at) }}</div>
        <div class="article-au">仅供学习交流，版权归作者所有</div>
        <div class="article-introduce">
            <div>&nbsp; &nbsp; {{ article.introduce }}</div>
        </div>
        <img :src="article.url" alt="Article Image" class="article-pic" v-if="article.url">
        <div class="article-mainbody">
            <div class="article-content" v-for="paragraph in article.paragraphList" :key="paragraph.id">
                {{ paragraph.content }}
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import BackPage from "../../BackPage.vue";
import { getExpandById } from '../../../api/api';

export default {
    name: 'expandDetail',
    components: {
        BackPage,
    },
    data() {
        return {
            article: {
                title: '',
                author: '',
                paragraphList: []
            }
        }
    },
    async created() {
        const articleId = this.$route.params.id;
        try {
            this.article = await getExpandById(articleId);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    },
    methods: {
        formatDate(isoString) {
        const dateObj = new Date(isoString);

        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const date = ('0' + dateObj.getDate()).slice(-2);
        const hours = ('0' + dateObj.getHours()).slice(-2);
        const minutes = ('0' + dateObj.getMinutes()).slice(-2);
        const seconds = ('0' + dateObj.getSeconds()).slice(-2);

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        }
    }
};
</script>
<style scoped>
.article-layout{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:3%
}
.article-title{
    width: 80%;
    margin: 0 auto;
    color:black;
    font-size: 20px;
    font-weight:bold;
    font-family: '华文楷体';
}
.article-author{
    color:black;
    font-size: 16px;
    font-family: '华文楷体';
    margin-bottom: 10px;
}
.article-au{
    color:gray;
    font-size: 12px;
    text-align: left;
    margin-left: 20px;
    font-family: '华文楷体';
}
.article-introduce{
    width: 90%;
    margin: 0 auto;
    text-align: left;
    color:black;
    font-size: 14px;
    font-family: '楷体';
    border-radius: 20px;
    padding: 20px;
}
.article-pic{
    width: 90%;
    margin:0 auto;
}
.article-img{
    width: 100%;
    border-radius: 10px;
    opacity: 0.8;
}
.article-mainbody{
    margin-top: 10px;
    padding: 0 15px;
}
.article-content{
  margin-top: 10px;
    text-indent: 2em;
    text-align: justify;
    word-break: break-all;
    font:normal normal 16px/1.6em "宋体";
    line-height: 1.5em;
    color:#000;
}
</style>
