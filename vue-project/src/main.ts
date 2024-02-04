import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import i18n from './config/i18n'; 

const app = createApp(App)

app.use(router); //router
app.use(store); //stockage dans LocalStorage
app.use(i18n); //traduction

app.mount('#app');
