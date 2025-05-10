import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Dashboard from '../components/Dashboard.vue';
import Settings from '../components/Settings.vue';
import SideBar from '../components/SideBar.vue';
import DataAnalytics from '../components/DataAnalytics.vue';
import EnergySet from '../components/EnergySet.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }, 
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path:'/sidebar',
    name: 'SideBar',
    component: SideBar
  },
  {
    path: '/dataanalytics',
    name: 'DataAnalytics',
    component: DataAnalytics
  },
  {
    path:'/energyset',
    name:'EnergySet',
    component: EnergySet
  },
  {
    path: '/',
    redirect: '/login' // Default route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
