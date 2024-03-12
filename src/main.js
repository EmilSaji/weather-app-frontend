import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

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

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const app = createApp(App)
app.provide(DefaultApolloClient, apolloClient);
app.use(router)
app.mount('#app')
