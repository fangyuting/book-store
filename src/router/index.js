import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import MyPage from '../views/MyPage';
import AddBook from '../views/AddBook';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    component: MyPage,
    children: [
      {
        path: 'myInfo',
        name: 'myInfo',
        component: () => import('@/components/myPages/myInfo')
      },
      {
        path: 'myCollege',
        name: 'myCollege',
        component: () => import('@/components/myPages/myCollege')
      },
      {
        path: 'myOrder',
        name: 'myOrder',
        component: () => import('@/components/myPages/myOrder')
      },
      {
        path: 'myCollection',
        name: 'myCollection',
        component: () => import('@/components/myPages/myCollection')
      },
      {
        path: 'dataAnalysis',
        name: 'dataAnalysis',
        component: () => import('@/components/myPages/dataAnalysis')
      }
    ]
  },
  {
    path: '/addBook',
    name: 'addBook',
    component: AddBook
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
