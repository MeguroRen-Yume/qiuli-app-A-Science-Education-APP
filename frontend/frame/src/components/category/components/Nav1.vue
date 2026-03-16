<template>
    <el-container>
       <el-aside width="28%">
            <el-menu
            default-active='/Nav11'
            :key="index"
            router>
            <el-menu-item v-for="(item, index) in Nav1List" :index="item.path">
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
var Nav1List = reactive([
{
    title: "全部",
    path: "/Nav11",
},
{
    title: "学习资料",
    path: "/Nav12",
},
{
    title: "知识详解",
    path: "/Nav13",
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