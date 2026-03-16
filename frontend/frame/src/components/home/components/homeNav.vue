<template>
  <div class="nav">
    <div class="nav-item" v-for="item in NavList" :key="item.id">
      <router-link :to="{ path: item.path }" class="nav-link">
        <img :src="item.img" alt="图" class="nav-img">
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import kc from '../../../assets/img/kc.png'
import wz from '../../../assets/img/wz.png'
import tm from '../../../assets/img/tm.png'
import tuozhan from '../../../assets/img/tuozhan.png'

export default {
  data() {
    return {
      NavList: [
        {
          id: '1',
          name: '课程资料',
          path: '/lesson',
          img: kc
        },
        {
          id: '2',
          name: '文章精选',
          path: '/article',
          img: wz
        },
        {
          id: '3',
          name: '经典题目',
          path: '/question',
          img: tm
        },
        {
          id: '4',
          name: '趣味拓展',
          path: '/expand',
          img: tuozhan
        }
      ]
    }
  }
}
</script>
    
<style scoped>
    .nav{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-top: 20.5px;
    }
    .nav-item {
        width: 25%;
        margin-bottom: 20.5px;
        border-radius: 50%;
    }
    .nav-link{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 14px;
        color: #2d2d2d;
    }
    .nav-img{
        border-radius: 50%;
        box-shadow: 10px 5px 10px rgba(0,0,0,0.05);
        width: 50%;
        margin-bottom: 5.5px;
        background-color: #fff;
    }
</style>