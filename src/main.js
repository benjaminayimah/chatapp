import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'process/browser';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

createApp(App).use(store).use(router).mount('#app');
