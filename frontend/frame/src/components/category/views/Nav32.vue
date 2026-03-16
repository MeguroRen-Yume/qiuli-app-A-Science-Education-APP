<template>
    <div class="lesson-layout">
        <div v-for="lesson in sortedLatest" :key="lesson.id" class="lesson-layout-item">
            <router-link :to="{ name: 'ArticleDetail', params: { id: lesson.id } }">
                <div class="lesson-title">{{ lesson.title }}</div>
                <div class="lesson-introuduce">{{ lesson.introduce }}</div>
                <div class="article-nav">{{lesson.subject}} | {{lesson.point}} | {{ lesson.author }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
import "../../../assets/styles/category.css";
import "../../../assets/styles/home.css";
import { article } from '../../../api/api';
export default {
    data() {
        return {
            Nav32List: []
        };
    },
    async created() {
        try {
            const response = await article();
            this.Nav32List = response.filter(item => item.label === '经验分享')
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    },
    computed: {
        sortedLatest() {
            return this.Nav32List.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    }
};
</script>
<style scoped>
</style>