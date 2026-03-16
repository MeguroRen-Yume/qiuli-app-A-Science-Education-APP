<template>
    <div class="index-layout">
        <div class="header-layout">
            <van-nav-bar left-text="返回" left-arrow @click-left="onClickBack">
                <template #title>
                    <searchbox/>
                </template>
            </van-nav-bar>
        </div>
        <div style="padding: 1em;">
        <div class="history-layout">
            <div class="history-title1">
                <span>历史记录</span>
                <van-icon class="history-icon" name="delete-o" color="black"/>
            </div>
            <div class="history-item">
                <!-- 如果有历史记录，则显示记录 -->
                <template v-if="sortedLatest.length > 0">
                    <router-link v-for="item in sortedLatest" :key="item.id" :to="{ path: '/Search', query: { q: item.content }}">
                        <van-tag :show="item.show" closeable @close="close" plain round type="primary">{{ item.content }}</van-tag>
                    </router-link>
                </template>
                <!-- 如果没有历史记录，则显示“无历史记录” -->
                <template v-else>
                    <div style="margin-left: 3%;color:gray">无历史记录</div>
                </template>
            </div>
        </div>
        <div class="history-layout">
            <div class="history-title">
                <span>猜你想搜</span>
                <van-icon class="history-icon" name="replay" color="black"/>
            </div>
            <van-grid clickable :column-num="2" :border="false" :center="false">
                <van-grid-item v-for="guess in guessList" :key="guess.id" @click="search(guess)"  class="guess-item" :text="guess.text" />
            </van-grid>
        </div>
        </div>
    </div>
    
</template>
  
<script>
import BackPage from "../../BackPage.vue";
import "../../../assets/styles/home.css"
import Header from '../components/homeHeader.vue';
import searchbox from '../components/homeSearchbox.vue';
import {ref} from 'vue';
import {historyarticle,GetID,guess,addHistoryArticle} from '../../../api/api';

export default {
    components: {
        BackPage,
        Header,
        searchbox,
    },
    data() {
        return {
            show: true,
            historyList: [],
            guessList: []
        };
    },
    methods: {
        async showSearchHistory() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found in localStorage');
                }

                const userid = await GetID({ token });
                const id = userid.data.userId;
                const data = await historyarticle();
                const data2 = await guess();
                this.guessList = data2
                const filteredData = data.filter(item => parseInt(item.userid) === id);
                this.historyList = filteredData;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
        close() {
            this.show = false;
        },
        onClickBack() {
            history.back();
        },
        async search(guess) {
        if (guess) {
            try {
            // 从 localStorage 中获取 token
            const token = localStorage.getItem('token');

            // 确保 token 存在再发送请求
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const response = await addHistoryArticle({
                token: token,
                content: guess.text
            });
            } catch (error) {
            // 处理错误
            console.log('Error adding comment:', error.message);
            // 可以在界面上显示错误信息给用户
            }
        }
        this.$router.push({ path: '/Search', query: { q: guess.text } });
        },
    },
    mounted() {
        this.showSearchHistory();
    },
    computed: {
        sortedLatest() {
            return this.historyList.slice(-6).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }
};
</script>
  
<style scoped>
  .history-title1{
    margin-top: -10px;
    margin-left: 10px;
    width: 100%;
    font-size: 30px;
    text-align: left;
  }
  .history-title{
    margin-top: 10px;
    margin-left: 10px;
    width: 100%;
    font-size: 30px;
    text-align: left;
  }
  .history-item{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 2px;
    margin-left: 2px;
    border: 1px black;
  }
  .guess-item{
    text-align: left;
  }
  :deep(.van-grid){
    margin-left: 10px;
  }
  :deep(.van-grid-item){
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  :deep(.van-tag){
    margin-top: 10px;
    margin-left: 10px;
    padding: 5px;
  }
  .van-grid-item {
  /* 使文字右移一点 */
  padding-left: 10px; /* 或者你可以使用 margin-left: 10px; 来右移文字 */

  /* 添加外边框 */
  border: 1px solid #ccc; /* 你可以调整颜色、宽度、样式等 */
  border-radius: 4px; /* 可选的圆角效果 */
  background-color: white; /* 可选的背景色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.van-grid-item:hover {
  /* 鼠标悬停时的样式，增加互动性 */
  border-color: #007bff; /* 鼠标悬停时边框颜色 */
  background-color: #ccc; /* 鼠标悬停时背景颜色 */
}
</style>
  