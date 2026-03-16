<template>
    <el-container>
       <el-aside width="28%">
            <el-menu
            default-active='/Nav21'
            :key="index"
            router>
            <el-menu-item v-for="(item, index) in Nav2List" :index="item.path">
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
var Nav2List = reactive([
{
    title: "全部",
    path: "/Nav21",
},
{
    title: "推荐",
    path: "/Nav22",
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