import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router' // ✅ import the router

createApp(App)
  .use(vuetify)
  .use(router)     // ✅ use the router
  .mount('#app')
