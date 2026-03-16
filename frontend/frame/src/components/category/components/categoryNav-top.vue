<template>
  <el-menu
  default-active='/Nav1'
  mode="horizontal"
  :key = "index"
  router>
    <el-menu-item v-for = "(item, index) in NavTopList" :index="item.path">
      {{item.title}}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {reactive} from 'vue';
var NavTopList = reactive([
{
  title: '课程',
  path: '/Nav1',
},
{
  title: '分享',
  path: '/Nav2',
},
{
  title: '最新',
  path: '/Nav3',
},
])
</script>

<style scoped>
.el-menu
{
  margin: 0;
}
:deep(.el-menu-item)
{
  width: 28%;
  margin: 0;
  padding: 0;
}
</style>