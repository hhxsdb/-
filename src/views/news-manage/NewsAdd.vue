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
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsInfoForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleChange"></editor>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <!-- 类别选择框 -->
                <el-select v-model="newsInfoForm.category" placeholder="请选择类别" style="width: 100%">
                    <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <!-- 头像上传框 -->
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :auto-upload="false">
                    <img v-if="newsInfoForm.cover" :src="userInfoForm.cover" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否发布" prop="isPublish">
                <el-input v-model="newsInfoForm.isPublish" />
            </el-form-item>
            <el-form-item label="  ">
                <el-button @click="handleSubmit" type="primary" size="small"> 提交 </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import editor from "@/components/editor/Editor";
import { ref, reactive } from "vue";
import { Plus } from '@element-plus/icons-vue'
const newsInfoRef = ref(null);
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
    ],
    content: [
        { required: true, message: "请输入新闻内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请选择新闻类别", trigger: "blur" },

    ],
    cover: [
        { required: false, message: "请上传新闻封面", trigger: "blur" },

    ]
};
// editor event 子组件传值
const handleChange = (content) => {
    newsInfoForm.content = content;
    console.log(newsInfoForm.content);
};
//类别选择框
// 性别选项
const categoryOptions = [
    { label: '最新动态', value: '1' },
    { label: '典型案例', value: '2' },
    { label: '通知公告', value: '3' },
]
// 提交
const handleSubmit = () => {
    // 表单校验
    newsInfoRef.value.validate((valid) => {
        if (valid) {
            // 提交表单
            console.log(newsInfoForm)
        } else {
            console.log('error submit')
            return false
        }
    })

};
</script >

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>

  