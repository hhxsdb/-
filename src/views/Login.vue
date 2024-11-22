<template>
    <div id="app">
        <vue-particles id="tsparticles" :options="options" />
        <div class="formcontainer">
            <h3>后台管理系统</h3>
            <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginFormRules"
                label-width="auto" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(loginFormRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(loginFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// 引用路由
import { useRouter } from 'vue-router'
// 应用store
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
// 配置particles粒子库
const options = {
    background: {
        color: {
            value: '#494954'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
// 登录表单配置
// 登录表单数据
const loginForm = reactive({
    username: '',
    password: ''
})
// 登录表单ref
const loginFormRef = ref()
// 登录表单校验规则
const loginFormRules = reactive({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// 登录按钮点击事件
const submitForm = (ruleFormRef) => {
    // 校验表单
    ruleFormRef.validate((valid) => {
        if (!valid) {
            console.log('error')
            return
        } else {
            //传数据给接口
            console.log(loginForm)
            // 设置token
            localStorage.setItem('token', 'admin')
            router.push('/home')
            //vuex存储userInfo
            store.commit('changeUserInfo', loginForm)
            // 将isgetterRouter设置为false，
            store.commit('changeGetterRouter', false)
        }
    })
}
// 重置表单事件
const resetForm = (ruleFormRef) => {
    ruleFormRef.resetFields()
}
</script>

<style lang="scss" scoped>
.formcontainer {
    width: 500px;
    height: 200px;
    margin: auto;
    top: 50%;
    left: 50%;
    position: absolute;
    translate: -50% -50%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    padding: 20px;

    h3 {
        margin-bottom: 20px;
        color: white;
        text-align: center;
    }
}

::v-deep .el-form-item__label {
    color: white;
}
</style>