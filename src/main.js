import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import List from "./components/List.vue";
import Store from "./components/Store.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMyStore } from './store/myStore';

library.add(fas);

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/todo-list", component: List },
  { path: "/store", component: Store },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
import 'bootstrap/dist/css/bootstrap.css';

const myStore = useMyStore();
myStore.loadFromStorage();

router.beforeEach(() => {
  myStore.saveToStorage();
});

app.mount("#app");
