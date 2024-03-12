import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SignInPage from './components/SignInPage.vue'
import SignUpPage from './components/SignUpPage.vue'

const routes = [
  { path: '/signin', component: SignInPage },
  { path: '/signup', component: SignUpPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
