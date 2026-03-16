<template>
    <div class="lesson-layout">
        <div v-for="lesson in Nav11List" :key="lesson.id" class="lesson-layout-item">
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
export default{
    data(){
        return {
            Nav11List:{}
            
        }
    },
    async created() {
        try {
            this.Nav11List = await article();
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }
}
</script>
<style scoped>
</style>