/* eslint-disable import/order */
import '@/@iconify/icons-bundle';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import { loadFonts } from '@/plugins/webfontloader';
import router from '@/router';
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';
import '@styles/styles.scss';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

loadFonts();

// Create vue app
const app = createApp(App);
const pinia = createPinia();

// Use plugins
app.use(vuetify);
app.use(pinia.use(piniaPluginPersistedState));
app.use(router);

// Mount vue app
app.mount('#app');
