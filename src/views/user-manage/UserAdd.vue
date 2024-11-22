<template>
    <div>
        <el-card>
            <!-- 页头 -->
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class> 添加用户 </span>
                </template>
            </el-page-header>
            <!-- 用户添加表单 -->
            <el-form ref="userInfoRef" :model="userInfoForm" :rules="userInfoFormRules" label-width="auto"
                class="demo-ruleForm" style="margin-top: 30px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfoForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfoForm.password" type="password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <!-- 性别选择框 -->
                    <el-select v-model="userInfoForm.role" placeholder="请选择角色" style="width: 100%">
                        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userInfoForm.introduction" type="textarea" />
                </el-form-item>
                <el-form-item label="头像" prop="avater">
                    <!-- 头像上传框 -->
                    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :on-success="handleAvatarSuccess" :show-file-list="false" :auto-upload="false">
                        <img v-if="userInfoForm.avater" :src="userInfoForm.avater" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="  ">
                    <el-button type="primary" @click="handleSubmit">添加用户</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'

const store = useStore()

// 表单对象 {username, password, role, avater, introduction, file(存放头像)}
const userInfoForm = reactive({
    username: "",
    password: "",
    role: "",
    avater: "",
    introduction: "",
    file: null,
})
// 表单校验规则
const userInfoFormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' },
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
const roleOptions = [
    { label: '管理员', value: '0' },
    { label: '普通用户', value: '1' },
]
// 计算属性 判断vuex是否存有头像地址
const avaterUrl = computed(() => { return store.state.userInfo.avater ? store.state.userInfo.avater : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' })
// 表单按钮提交
const handleSubmit = () => {
    // 表单校验
    userInfoRef.value.validate((valid) => {
        if (valid) {
            // 提交表单
            console.log('submit:' + userInfoForm)
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