<template>
    <div id="app">
        <div class="header">
            <searchbox/>
        </div>
    </div>
</template>
  
<script>
  import searchbox from "./homeSearchbox.vue"
  export default {
    name: "app",
    components: {
      searchbox
    },
  }
</script>
  
<style scoped>
.header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 58px;
}
</style>
  