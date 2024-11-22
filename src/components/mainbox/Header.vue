<template>
     <el-header class="el-header">
          <div class="left">
               <!-- 菜单图标 -->
               <el-icon @click="handleClick">
                    <Menu />
               </el-icon>
               <!-- 标题 -->
               <span style="margin-left: 20px; font-size: 20px; font-weight: bold; color: ;">企业门户管理系统</span>
          </div>
          <div class="right">
               <!-- 欢迎语 -->
               <span>欢迎{{ store.state.userInfo.username }}光临</span>
               <!-- 下拉菜单 -->
               <el-dropdown>
                    <span class="el-dropdown-link">
                         <!-- 下拉菜单 用户图标 -->
                         <el-icon :size="30" color="white">
                              <User />
                         </el-icon>
                    </span>
                    <template #dropdown>
                         <el-dropdown-menu>
                              <el-dropdown-item @click="handleCenter">个人中心 </el-dropdown-item>
                              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                         </el-dropdown-menu>
                    </template>
               </el-dropdown>
          </div>
     </el-header>
</template>
<script setup>
import { useStore } from 'vuex';
import { Menu, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const store = useStore();
const handleClick = () => {
     // 向vuex提交改变侧边栏状态的mutation
     store.commit('changeCollapse');
}
const router = useRouter();
const handleLogout = () => {
     // 清除token 和 vuex中的userInfo
     localStorage.removeItem('token');
     store.commit('clearUserInfo');
     // 退出登录
     router.push('/login');

}
const handleCenter = () => {
     // 跳转到个人中心页面
     router.push('/center');
}

</script>
<style lang="scss" scoped>
.el-header {
     background-color: #2d3a4b;
     color: white;
     height: 60px;
     line-height: 60px;
     padding: 0 20px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     width: 100%;

}

.left,
.right {
     display: flex;
}

.left {
     i {
          margin: auto;
     }
}

.right {
     .el-dropdown {
          margin: auto;
     }
}
</style>