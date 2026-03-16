<template>
    <div class="lesson-layout">
        <div v-for="lesson in Nav34List" :key="lesson.id" class="lesson-layout-item">
            <router-link :to="lesson.path">
                <div class="lesson-title">{{ lesson.name }}</div>
                <div class="lesson-introuduce">{{ lesson.introduce }}</div>
                <div class="article-nav">{{lesson.subject}} | {{lesson.point}} | {{ lesson.author }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
import "../../../assets/styles/category.css";
import "../../../assets/styles/home.css";
export default{
    data(){
        return {
            Nav34List:[
                {
                    id: '1',
                    name: '课程1',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '2',
                    name: '课程2',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '3',
                    name: '课程3',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '4',
                    name: '课程4',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '5',
                    name: '课程5',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '6',
                    name: '课程6',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
                {
                    id: '7',
                    name: '课程7',
                    subject: '生物',
                    point: '基因工程',
                    author: 'xxx',
                    path: '/articleDetail',
                    introduce: '课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍'
                },
            ] 
            
        }
    }
}
</script>
<style scoped>
</style>