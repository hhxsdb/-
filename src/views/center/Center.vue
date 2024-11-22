<template>
    <div class="container">
        <!-- 页头 -->
        <el-page-header icon="" title="企业门户网站管理系统">
            <template #content>
                <span class> 个人中心 </span>
            </template>
        </el-page-header>
        <!-- 头像与个人信息展示部分 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <!-- 头像昵称展示 -->
                <el-card class="avatar-card">
                    <!-- 头像展示 -->
                    <el-avatar :size="150" :src="avaterUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h3>{{ store.state.userInfo.username === 'admin' ? '超级管理员' : '普通用户' }}</h3>
                </el-card>
            </el-col>
            <!-- 表单信息展示 -->
            <el-col :span="18">
                <el-card>
                    <!-- 卡片组件 头部插槽 -->
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <!-- 个人信息 表单部分 -->
                    <el-form ref="userInfoRef" :model="userInfoForm" n :rules="userInfoFormRules" label-width="auto"
                        class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userInfoForm.username" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="userInfoForm.password" type="password" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <!-- 性别选择框 -->
                            <el-select v-model="userInfoForm.gender" placeholder="请选择性别" style="width: 240px">
                                <el-option v-for="item in genderOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userInfoForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avater">
                            <!-- 头像上传框 -->
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :on-success="handleAvatarSuccess" :show-file-list="false" :auto-upload="false">
                                <img v-if="userInfoForm.avater" :src="userInfoForm.avater" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <!-- 表单提交按钮 -->
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'
const store = useStore()
// 获取vuex中的用户信息
const { username, password, gender, avater, introduction } = store.state.userInfo
// 表单对象 {username, password, gender, avater, introduction}
const userInfoForm = reactive({
    username, password, gender, avater, introduction
})
// 表单校验规则
const userInfoFormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入个人简介', trigger: 'blur' },
    ],
    avater: [
        { required: false, message: '请上传头像', trigger: 'blur' },
    ],
}
// 表单ref
const userInfoRef = ref(null)
// 性别选项
const genderOptions = [
    { label: '男', value: '男' },
    { label: '女', value: '女' },
    { label: '保密', value: '保密' },
]
// 计算属性 判断vuex是否存有头像地址
const avaterUrl = computed(() => { return store.state.userInfo.avater ? store.state.userInfo.avater : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' })
// 表单按钮提交
const handleSubmit = () => {
    // 表单校验
    userInfoRef.value.validate((valid) => {
        if (valid) {
            // 提交表单
            console.log('submit')
            // 保存用户信息到vuex
            store.commit('changeUserInfo', userInfoForm)
        } else {
            console.log('error submit')
            return false
        }
    })
}
// 头像上传
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw)
    console.log(response, uploadFile);
}
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;

    .el-page-header {
        margin-bottom: 20px;
    }

    .el-card.avatar-card {
        text-align: center;
    }

    .el-button {
        margin-left: 75px;
    }
}

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