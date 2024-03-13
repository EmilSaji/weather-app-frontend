import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./index.css";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

import App from "./App.vue";
import SignInPage from "./components/SignInPage.vue";
import SignUpPage from "./components/SignUpPage.vue";
import HomePage from "./components/HomePage.vue";

import { provideApolloClient } from "@vue/apollo-composable";

import store from "./store";

const routes = [
  { path: "/signin", component: SignInPage },
  { path: "/signup", component: SignUpPage },
  { path: "/homePage", component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

provideApolloClient(apolloClient);

const app = createApp(App);
app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.use(store);
app.mount("#app");
