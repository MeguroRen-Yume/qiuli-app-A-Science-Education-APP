<template>
    <div class="lesson-layout">
        <div v-for="lesson in Nav22List" :key="lesson.id" class="lesson-layout-item">
            <router-link :to="lesson.path">
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
            Nav22List:{}
            
        }
    },
    async created() {
        try {
            this.Nav22List = await article();
            this.Nav22List = this.Nav22List.slice(-10)
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }
}
</script>
<style scoped>
</style>