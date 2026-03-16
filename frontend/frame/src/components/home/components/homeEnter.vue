<template>
    <div>
    <div class="title">
        <img src="../../../assets/img/cgrk.png" alt="" class="title-logo">
        <div class="title-text">
            闯关入口
        </div>
    </div> 
    <div class="enter-example">
        <div class="enter-item" v-for="(item, index) in exampleList" :key="item.id">
            <img :src="getImagePath(index + 1)" alt="Example Image" class="example-image">
            <div class="enter-title">{{ item.title }}</div>
            <div class="enter-example-btn">
                <RouterLink :to="{ name: 'Challenge', params: { id: item.id } }" class="link-style">开始</RouterLink>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import {RouterLink} from 'vue-router';
import '../../../assets/styles/home.css';
import example1 from '../../../assets/img/enter/1.png';
import example2 from '../../../assets/img/enter/2.png';
import example3 from '../../../assets/img/enter/3.png';
import example4 from '../../../assets/img/enter/4.png';
import example5 from '../../../assets/img/enter/5.png';
import example6 from '../../../assets/img/enter/6.png';
export default{
    data(){
        return {
            exampleList:[
                {
                    id: '1',
                    title: '第一关',
                },
                {
                    id: '2',
                    title: '第二关',
                },
                {
                    id: '3',
                    title: '第三关',
                },
                {
                    id: '4',
                    title: '第四关',
                },
                {
                    id: '5',
                    title: '第五关',
                },
                {
                    id: '6',
                    title: '第六关',
                },
            ] 
        }
    },
    methods: {
       getImagePath(index) {
           switch(index) {
               case 1:
                   return example1;
               case 2:
                   return example2;
               case 3:
                   return example3;
               case 4:
                   return example4;
               case 5:
                   return example5;
               case 6:
                   return example6;
               default:
                   return '';
           }
       }
   }
}
</script>
<style scoped>
.enter-example {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    height: 170px;
}
.enter-item {
    position: relative;
    margin-right: 2px;
    flex-shrink: 0;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 165px;
    width: 200px;
    background-color: white;
    border-radius: 20px;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.example-image {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 20px 20px 0 0; /* 圆角设置 */
}
.enter-title {
    width: 100px;
    font-size: 18px;
    position: absolute;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-top: 12px;
    left:0%
}
.enter-example-btn{
    width: 60px;
    margin: 0 auto;
    font-size: 12px;
    position: relative;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 20px;
    margin-top: 5px;
    border: 2px solid #3498db;
    background-color: white;
    margin-bottom: 10px;
}
.enter-example-btn .link-style {
    color: black;
}
</style>