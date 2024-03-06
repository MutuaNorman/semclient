import { createApp, markRaw} from 'vue'
import {createPinia} from "pinia"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import "@/axios"
import '@/style.css'
import App from '@/App.vue'
import router from "@/router"

const pinia = createPinia()

const app = createApp(App)

pinia.use(({store})=>{
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app')
