<template>
    <div>
        <BackPage title="课程资料"/>
        <div class="course" style="margin-top: 20px;">
            <ul class="course-list">
                <li class="course-item" v-for="item in courseList" :key="item.id">
                    <RouterLink :to="{ name: 'ArticleDetail', params: { id: item.id } }">
                        <div class="course-pic">
                            <img :src="item.url" alt="图片" class="course-img">
                        </div>
                        <div class="course-info">
                            <div class="course-name">{{ item.title }}</div>
                            <div class="course-content">{{ item.introduce }}</div>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BackPage from "../../BackPage.vue";
import { article } from '../../../api/api';

export default {
    components: {
        BackPage,
    },
    data() {
        return {
            courseList: []
        };
    },
    async created() {
        try {
            const data = await article();
            this.courseList = data.filter(item => item.label === '学习资料').slice(-16);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    },
};
</script>

<style scoped>
.course {
    padding: 20px 0 0 0;
    margin-bottom: 40px;
    justify-content: center;
}
.course-list {
    width: 90%;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
}
.course-item {
    background-color: white;
    width: 48%;
    margin: 5px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* 添加相对定位 */
    overflow: hidden; /* 遮挡溢出内容 */
    display: flex; /* 使用 flex 布局 */
    flex-direction: column; /* 竖直方向布局 */
}
.course-pic {
    text-align: center;
    height: 80px; /* 设定高度 */
}
.course-img {
    width: 100%;
    height: 100%; /* 图片充满容器 */
    object-fit: cover; /* 保持比例充满容器 */
    border-radius: 8px;
}
.course-info {
    padding: 0px 0;
}
.course-name {
    margin: 8px auto;
    line-height: 20px;
    color: #333;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
}
.course-content {
    margin: 0 auto;
    line-height: 20px;
    color: #595959;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-wrap: break-word;
    text-align: left;
}
</style>
