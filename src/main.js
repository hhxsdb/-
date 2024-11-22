import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入eleui plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入particles粒子库
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
createApp(App).
    use(ElementPlus).
    use(Particles, {
        init: async engine => {
            // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
            await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
        },
    })
    .use(store)
    .use(router).mount('#app')
