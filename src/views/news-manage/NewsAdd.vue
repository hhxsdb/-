<template>
    <div>

        <!-- 页头 -->
        <el-page-header icon="" title="新闻管理">
            <template #content>
                <span class> 添加新闻 </span>
            </template>
        </el-page-header>
        <!-- 表单 -->
        <el-form ref="newsInfoRef" :model="newsInfoForm" :rules="newsInfoFormRules" label-width="auto" class="demo-ruleForm"
            style="margin-top: 30px">
            <el-form-item label="用户名" prop="news">
                <el-input v-model="newsInfoForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor></editor>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-input v-model="newsInfoForm.category" />
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-input v-model="newsInfoForm.cover" />
            </el-form-item>
            <el-form-item label="是否发布" prop="isPublish">
                <el-input v-model="newsInfoForm.isPublish" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import editor from "@/components/editor/Editor";
import { ref, reactive } from "vue";
const newsInfoForm = reactive({
    title: "",
    content: "",
    category: "",//1 最新动态 2典型案例 3 通知公告
    cover: "",
    file: "",
    isPublish: 0, //是否发布 0 未发布 1 已发布
});
const newsInfoFormRules = {
    title: [
        { required: true, message: "请输入新闻标题", trigger: "blur" },
        { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
    ]
};
</script >

<style lang="scss" scoped></style>

  