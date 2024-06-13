<template>
  <div style="width: 200px; height: 100%">
    <el-menu
        style="height: 100%"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item>主页</el-menu-item>
      <el-menu-item>个人中心</el-menu-item>
    </el-menu>
  </div>


</template>

<script>
export default {
  name: "Aside"
}

</script>

<style scoped>

</style>