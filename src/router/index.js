import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/Auth";


const Home = () => import("../pages/Home.vue");
const Login = () => import("../pages/Login.vue");
const Register = () => import("../pages/Register.vue");
const ForgotPassword = () => import("../pages/ForgotPassword.vue");
const PasswordResetConfirm = () => import("../pages/PasswordResetConfirm.vue");
const Dashboard = () => import("../pages/Dashboard.vue");
const Payment = () => import("../pages/Payment.vue");
const Bcom = () => import("../pages/DashboardChildren/Bcom.vue");
const Accounting = () => import("../pages/BcomChildren/Accounting.vue");
const Finance = () => import("../pages/BcomChildren/Finance.vue");
const HumanResource = () => import("../pages/BcomChildren/HumanResource.vue");
const InformationSystems = () => import("../pages/BcomChildren/InformationSystems.vue");
const Insurance = () => import("../pages/BcomChildren/Insurance.vue");
const Marketing = () => import("../pages/BcomChildren/Marketing.vue");
const Procurement = () => import("../pages/DashboardChildren/Procurement.vue");
const Bent = () => import("../pages/DashboardChildren/Bent.vue");
const Profile = () => import("../pages/DashboardChildren/Profile.vue");
const Units = () => import("../pages/DashboardChildren/Units.vue");
const PageNotFound = () => import("../pages/PageNotFound.vue");


const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path:"/account/forgot-password",
        name:"forgot-password",
        component: ForgotPassword
    },
    {
        path:"/account/reset-password/:uid/:token",
        name:"reset-password",
        component:PasswordResetConfirm
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
        children : [
            {
                path:"",
                name:"bcom",
                component: Bcom
            },
            {
                path:"bcom",
                name:"bcom",
                component: Bcom,
                children : [
                    {
                        path: "accounting",
                        name:"accounting",
                        component: Accounting,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"accounting-units",
                                component: Units
                            }
                        ]
                    },
                    {
                        path: "finance",
                        name:"finance",
                        component: Finance,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"finance-units",
                                component: Units
                            }
                        ]
                    },
                    {
                        path: "information-systems",
                        name:"information-systems",
                        component: InformationSystems,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"information-systems-units",
                                component: Units
                            }
                        ]
                    },
                    {
                        path: "insurance",
                        name:"insurance",
                        component: Insurance,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"insurance-units",
                                component: Units
                            }
                        ]
                    },
                    {
                        path: "marketing",
                        name:"marketing",
                        component: Marketing,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"marketing-units",
                                component: Units
                            }
                        ]
                    },
                    {
                        path: "human-resource",
                        name:"human-resource",
                        component: HumanResource,
                        children : [
                            {
                                path: ":id/units/:specialization",
                                name:"human-resource-units",
                                component: Units
                            }
                        ]
                    }
                ]
            },
            {
                path:"procurement",
                name:"procurement",
                component: Procurement,
                children : [
                    {
                        path: ":id/units/:specialization",
                        name:"proc-units",
                        component: Units
                    }
                ]
            },
            {
                path:"bent",
                name:"bent",
                component: Bent,
                children : [
                    {
                        path: ":id/units/:specialization",
                        name:"bent-units",
                        component: Units
                    }
                ]
            },
            {
                path:"profile",
                name:"profile",
                component: Profile
            },
        ]
    },
    {
        path:"/plan/payment",
        name:"payment",
        component: Payment
    },
    {
        path: '/:pathMatch(.*)*',
        component:PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active-links',
    routes
});
// Navigation guard
router.beforeEach((to, from, next) => {
    const store = useAuthStore();
    const token = localStorage.getItem("access");

    if (to.meta.requiresAuth && !token) {
      // Redirect to the login page if the route requires authentication and the user is not authenticated
      next({ name: 'login' });
    } else {
      if(store.user){
        const isPaymentPeriodOver = !store.user.has_paid && !store.isOnFreePeriod;
            if (to.meta.requiresAuth && isPaymentPeriodOver) {
                next({ name: 'payment' });
            } else {
                next();
            }
      }else{
        next();
      }
        // next();
    }
  });
export default router;
