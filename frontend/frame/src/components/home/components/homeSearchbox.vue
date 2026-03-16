<template>
  <div id="app" class="searchbox">
    <img src="../../../assets/img/ss.png" class="iconfont icon-search">
    <router-link :to="'/afterSearch'">
      <form class="searchbox-form" @submit.prevent="search">
        <input type="text" v-model="searchText" class="searchbox-input" name="words"
               autocomplete="off"
               placeholder="搜索课程/关键字" @keydown.enter="search">
      </form>
    </router-link>
  </div>
</template>

<script>
import "../../../assets/styles/home.css";
import {addHistoryArticle} from '../../../api/api';

export default {
  data() {
    return {
      searchText: '',
      articleList: [] // 改为数组，用于存放搜索结果列表
    }
  },
  methods: {
    async search() {
      if (this.searchText.trim()) {
        try {
          // 从 localStorage 中获取 token
          const token = localStorage.getItem('token');

          // 确保 token 存在再发送请求
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          const response = await addHistoryArticle({
            token: token,
            content: this.searchText
          });

        } catch (error) {
          // 处理错误
          console.log('Error adding comment:', error.message);
          // 可以在界面上显示错误信息给用户
        }
      }
      this.$router.push({ path: '/Search', query: { q: this.searchText }});
    },
  },
}
</script>

<style scoped>
/* 样式可以继续定义在这里 */
</style>
