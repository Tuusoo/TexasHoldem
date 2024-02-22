import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../pages/Login.vue"),
    },
    {
        path: "/GameTable",
        name: "GameTable",
        component: () => import("../pages/GameTable.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
