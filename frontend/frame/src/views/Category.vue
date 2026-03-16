<template>
  <div class="category-layout">
    <div class="header-layout">
      <!-- 首页头部组件 -->
      <Header />
    </div>
    <div class="topNav-out">
      <topNav />
    </div>
    <div class="topNav-below">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import {RouterView} from 'vue-router';
import Header from '../components/home/components/homeHeader.vue';
import topNav from '../components/category/components/categoryNav-top.vue';
export default {
  components: {
    Header,
    topNav
  }
  // 可以在这里添加组件的逻辑
};
</script>

<style scoped>
.category-layout :deep(.common-layout){
  position:absolute;
  top:70px;
  overflow-y: auto;
  display: flex !important ;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;
}
.header-layout {
  position: fixed;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 54px;
}
.header-layout .searchbox{
  width: 89.33%;
}
.topNav-out{
  position: fixed;
  z-index: 1000;
  left: 0;
  width: 100%;
  top: 50px;
}
.topNav-below{
  position: absolute;
  width: 100%;
  top:100px;
}
</style>
