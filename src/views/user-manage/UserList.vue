<template>
    <div>
        <el-card>
            <!-- 页头 -->
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class> 用户列表 </span>
                </template>
            </el-page-header>
            <!-- 用户列表表格 -->
            <el-table :data="tableData" style="width: 100%;margin-top: 20px">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="avatar" label="头像" width="180">

                    <template #default="scope">
                        <el-avatar :size="50" :src="scope.row.avatar" />
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role !== undefined" :type="scope.row.role === 0 ? 'success' : 'warning'">{{
                            scope.row.role
                            === 0 ? '管理员' : '普通用户' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button plain type="primary" size="small" @click="handleEdit(scope.row)"> 编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!-- 弹窗显示编辑 -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="40%">
            <el-form ref="userInfoRef" :model="userInfoForm" n :rules="userInfoFormRules" label-width="auto"
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
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
// 表格数据
const tableData = [
    {
        username: '2016-05-03',
        avatar: 'Tom',
        role: 0,
    }, {
        username: '2016-05-03',
        avatar: 'Tom',
        role: 1,
    },

    {
        username: '2016-05-03',
        avatar: 'Tom',
        role: 0,
    },
    {
        username: '2016-05-03',
        avatar: 'Tom',
        role: 1,
    },

]
// 弹窗显隐
const dialogVisible = ref(false)
// 点击编辑按钮
const handleEdit = (row) => {
    //数据回显
    Object.assign(userInfoForm, row)
    // 弹窗显示
    dialogVisible.value = true
}
//userinfo 数据
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
//点击提交
const handleSubmit = () => {
    // 校验表单
    userInfoRef.value.validate((valid) => {
        if (valid) {
            console.log(userInfoForm)
            // 提交表单
            dialogVisible.value = false
        } else {
            console.log('error submit!!')
            return false
        }
    })
    // 发送数据给后端
    // 重新获取表格数据
}
</script>

<style lang="scss" scoped></style>