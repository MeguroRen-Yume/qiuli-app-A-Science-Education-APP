<template>
  <div id="index-page" class="index-layout">
    <div class="header-layout">
      <!-- 首页头部组件 -->
      <Header />
    </div>
    <div class="slider-layout">
      <!-- 首页轮播组件 -->
      <Slider />
    </div>
    <div class="headline-layout">
      <!-- 首页头条组件 -->
      <Headline />
    </div>
    <div class="nav-layout">
      <!-- 首页导航组件 -->
      <Nav />
    </div>
    <div class="picture-layout">
      <!-- 首页图片组件 -->
      <Picture />
    </div>
    <div class="enter-layout">
      <!-- 首页闯关入口组件 -->
      <Enter />
    </div>
    <div class="recommend-layout">
      <!-- 首页课程推荐组件 -->
      <Recommend />
    </div>
    <div><br><br><br></div>
  </div>
</template>

<script>
import Header from '../components/home/components/homeHeader.vue';
import Slider from '../components/home/components/homeSlider.vue';
import Headline from '../components/home/components/homeHeadline.vue';
import Nav from '../components/home/components/homeNav.vue';
import Picture from '../components/home/components/homePicture.vue';
import Enter from '../components/home/components/homeEnter.vue';
import Recommend from '../components/home/components/homeRecommend.vue';
export default {
  components: {
    Header,
    Slider,
    Headline,
    Nav,
    Picture,
    Enter,
    Recommend
  }
  // 可以在这里添加组件的逻辑
};
</script>

<style scoped>
.index-layout{
  position:absolute;
  top:0px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.header-layout {
  position: fixed;
  background-color: #fff;
  margin-left: 0;
  top: 0px;
  z-index: 1000;
  width: 100%;
  height: 54px;
}
.header-layout .searchbox{
  width: 89.33%;
}


.headline-layout{
  margin-top: 1px;
}
.nav-layout{
  margin-bottom: 10px;
}

.enter-layout, .recommend-layout{
  margin-top: 10px;
}
</style>
