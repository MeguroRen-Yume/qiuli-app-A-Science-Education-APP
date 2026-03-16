import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/index';
import './assets/main.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './components/store/index';

const app = createApp(App);

// Register Vant as a whole
app.use(Vant);

// Register other plugins
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueAwesomeSwiper);

// Register ElementPlus icons
for (const [key, components] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, components);
}

app.mount('#app');
