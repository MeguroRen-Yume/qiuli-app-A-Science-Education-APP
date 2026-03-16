<template>
    <el-container>
       <el-aside width="28%">
            <el-menu
            default-active='/Nav31'
            :key="index"
            router>
            <el-menu-item v-for="(item, index) in Nav3List" :index="item.path">
                    {{item.title}}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main-layout">
            <router-view></router-view>  
        </el-main> 
    </el-container>
</template>
<script setup>
import "../../../assets/styles/category.css";
import {reactive} from 'vue';
import { RouterView } from 'vue-router';
var Nav3List = reactive([
{
    title: "文章",
    path: "/Nav31",
},
{
    title: "经验分享",
    path: "/Nav32",
},
{
    title: "拓展",
    path: "/Nav33",
},
])
</script>
<style scoped>
.el-aside{
    position: fixed;
    top: 108px;
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-menu{
    height: 100%;
}
</style>