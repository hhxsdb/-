<template>
    <div class="container">
        <div class="header-container">
            <!-- 页头 -->
            <el-page-header icon="" title="企业门户管理">
                <template #content>
                    <span class> 首页 </span>
                </template>
            </el-page-header>
            <!-- 欢迎语与头像展示 -->
            <el-card>
                <el-row>
                    <!-- 头像展示 -->
                    <el-col :span="1">
                        <el-avatar :size="50" :src="avaterUrl" />
                    </el-col>
                    <!-- 欢迎语 -->
                    <el-col :span="18" style="line-height: 60px;">{{ welcomeText }}</el-col>
                </el-row>
            </el-card>
        </div>


        <!-- 轮播图商品展示 -->
        <el-card>
            <!-- 卡片组件 头部插槽 -->
            <template #header>
                <div class="card-header">
                    <span>产品展示</span>
                </div>
            </template>
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>

        </el-card>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 计算属性 判断vuex是否存有头像地址
const avaterUrl = computed(() => { return store.state.userInfo.avater ? store.state.userInfo.avater : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' })
// 计算属性 判断当前时间,渲染不同的欢迎语
const welcomeText = computed(() => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 6) {
        return '凌晨好，' + store.state.userInfo.username + '！'
    } else if (hour < 9) {
        return '早上好，' + store.state.userInfo.username + '！'
    } else if (hour < 12) {
        return '上午好，' + store.state.userInfo.username + '！'
    } else if (hour < 14) {
        return '中午好，' + store.state.userInfo.username + '！'
    } else if (hour < 17) {
        return '下午好，' + store.state.userInfo.username + '！'
    } else if (hour < 19) {
        return '傍晚好，' + store.state.userInfo.username + '！'
    } else if (hour < 22) {
        return '晚上好，' + store.state.userInfo.username + '！'
    } else {
        return '夜深了，' + store.state.userInfo.username + '！'
    }
})
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    .el-card {
        width: 100%;
    }

    .header-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 150px;

    }

    // 轮播图样式 el-carousel
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
}
</style>