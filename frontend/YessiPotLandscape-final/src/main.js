import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@fontsource/poppins'; 
import '@fontsource/poppins/700.css';
import router from './router'


const app = createApp(App)
app.use(router)
app.mount('#app')
