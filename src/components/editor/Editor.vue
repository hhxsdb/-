<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" @onChange="handleEditorChange" />
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, defineEmits } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    components: { Editor, Toolbar },
    setup(props, { emit }) { // 注意这里的 { emit }
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        // 内容 HTML
        const valueHtml = ref('<p>hello</p>')

        // 编辑器配置
        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }

        // 监听编辑器内容变化的处理函数
        const handleEditorChange = (editor) => {
            const html = editor.getHtml()
            // 使用 emit 来触发自定义事件
            emit('event', html)
        }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        // 编辑器创建时，保存实例
        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        return {
            editorRef,
            valueHtml,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleEditorChange // 返回处理函数
        };
    }
}
</script>

<style lang="scss" scoped></style>
