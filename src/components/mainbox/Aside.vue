<template>
  <el-aside width="$store.state.isCollapse ? 40px : 240px" class="menu-container">
    <el-menu class="el-menu" @open="handleOpen" @close="handleClose" :collapse="$store.state.isCollapse"
      :collapse-transition="false" :router="true" :default-active="route.fullPath">
      <!-- 无折叠菜单的导航项 -->
      <el-menu-item index="/home">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <!-- 无折叠菜单的导航项 -->
        <el-icon>
          <Avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <!-- 有折叠菜单的导航项 -->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <!-- 图标放置 -->
          <el-icon>
            <UserFilled />
          </el-icon>
          <!-- 父级导航名称 -->
          <span>用户管理</span>
        </template>
        <!-- 子级导航菜单 index 必须唯一 -->
        <el-menu-item-group title="用户管理">
          <el-menu-item index="/user-manage/add">用户添加</el-menu-item>
          <el-menu-item index="/user-manage/list">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 有折叠菜单的导航项 -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <!-- 图标放置 -->
          <el-icon>
            <MessageBox />
          </el-icon>
          <!-- 父级导航名称 -->
          <span>新闻管理</span>
        </template>
        <!-- 子级导航菜单 index 必须唯一 -->
        <el-menu-item-group title="新闻管理">
          <el-menu-item index="/news-manage/add">新闻添加</el-menu-item>
          <el-menu-item index="/news-manage/list">新闻列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 有折叠菜单的导航项 -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <!-- 图标放置 -->
          <el-icon>
            <Reading />
          </el-icon>
          <!-- 父级导航名称 -->
          <span>产品管理</span>
        </template>
        <!-- 子级导航菜单 index 必须唯一 -->
        <el-menu-item-group title="产品管理">
          <el-menu-item index="/product-manage/add">产品添加</el-menu-item>
          <el-menu-item index="/product-manage/list">产品列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
// 导入图标icon
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from "@element-plus/icons-vue";
import { onMounted } from "vue";
// 导入路由
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
console.log(route.fullPath);
// 侧边导航栏的方法
const handleClose = (index) => {
}
const handleOpen = (index) => {
}
// v-admin
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.username !== "admin") {

      el.parentNode.removeChild(el);
    }
  }
}
</script>
<style scoped lang="scss">
.menu-container {
  box-sizing: border-box;

  .el-menu {
    height: 100%;
  }
}
</style>
