<template>
    <div class="lesson-layout">
        <div v-for="lesson in sortedLatest" :key="lesson.id" class="lesson-layout-item">
            <router-link :to="{ name: 'ArticleDetail', params: { id: lesson.id } }">
                <div class="lesson-title">{{ lesson.title }}</div>
                <div class="lesson-introuduce">{{ lesson.introduce }}</div>
                <div class="article-nav">{{ lesson.subject }} | {{ lesson.point }} | {{ lesson.author }}</div>
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
            Nav31List: []  // 初始化为空数组
        }
    },
    async created() {
        try {
            const response = await article();
            this.Nav31List = response
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    },
    computed: {
        sortedLatest() {
            return this.Nav31List.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    }
}
</script>

<style scoped>
/* 样式表 */
</style>
