<template>
    <div>
        <el-container>
            <Aside></Aside>
            <el-container direction="vertical">
                <Header>Header</Header>
                <el-main><router-view></router-view></el-main>

            </el-container>
        </el-container>

    </div>
</template>

<script setup>
import Aside from "@/components/mainbox/Aside.vue";
import Header from "@/components/mainbox/Header.vue";
</script>

<style lang="scss" scoped>
Aside {
    height: 100vh;
}
</style>