<template>
<!--    首页头部区域-->
    <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #cccccc; display: flex">
        <div style="width:200px; padding-left: 30px; font-weight: bold; color: dodgerblue">
            后台管理
        </div>
        <div style="flex: 1px"></div>
        <div style="width: 100px">
            <el-dropdown>
          <span class="el-dropdown-link">
                <el-icon>tom</el-icon>
          </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import {User} from "@element-plus/icons-vue";

export default {
    name: "Header",
    components: {User}
};
</script>

<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>