<template>
    <div>
    <div class="title">
        <img src="../../../assets/img/cgrk.png" alt="" class="title-logo">
        <div class="title-text">
            推荐学习栏
        </div>
    </div>
    <div class="enter-example">
        <div class="enter-example-item" v-for="item in exampleList" :key="item.id">
            <img :src="item.url" alt="Header Image" class="header-image">
                <!-- 内容区域 -->
                <div class="enter-example-content">
                    <div class="enter-example-nav">{{item.subject}} | {{item.point}} | {{ item.author }}</div>
                    <div class="enter-example-title">{{ item.title }}</div>
                </div>
            <div class="enter-example-btn">
                <RouterLink :to="{ name: 'expandDetail', params: { id: item.id } }">阅读</RouterLink>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import {RouterLink} from 'vue-router';
import '../../../assets/styles/home.css';
import { expand } from '../../../api/api';
export default{
    data(){
        return {
            exampleList:[] 
        }
    },
    async created() {
        try {
        this.exampleList = await expand();
        this.exampleList.sort((a, b) => {
            // 将updated_at字符串转换为日期对象进行比较
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            // 降序排序
            return dateB - dateA;
            })
        this.exampleList = this.exampleList.slice(0, 6);
        } catch (error) {
        console.error('Error fetching articles:', error);
        }
    }
};
</script>
<style>
.article-img{
    width: 100%;
    border-radius: 10px;
    opacity: 0.8;
}
</style>