/*eslint-disable*/
import Vue from "vue"
import Router from "vue-router"
import store from '../store/index.js'
import Login from '@/components/auth/login'
import MainDashboard from '../components/dashboard/main-dashboard'
import Home from '../components/home'
import Program from '../components/assets/program/index'
import Project from '../components/assets/projects/index'
import  ProjectView from '../components/assets/projects/view-project'
import NewProject from '../components/assets/projects/create'
import FundSource from '../components/assets/funding/sources'
import FundTransferApprover from '../components/participants/fundapprovers/index'
import MDA from '../components/assets/mda/index'
import MMDA from '../components/assets/mmda/index'
import Budget from '../components/assets/budget/index'
import Role from '../components/assets/role/index'
import MMDAView from '../components/mmda/index'
import MMDAProjects from '../components/mmda/projects/index'
import MMDANewProject from '../components/mmda/projects/create'
import MMDAProjectview from '../components/mmda/projects/view-project';
import MMDATransactions from '../components/mmda/transactions'
import MMDAFundReceipients from '../components/mmda/receipient'

Vue.use(Router);

const router=new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: MainDashboard,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
    {
      path:'/programs',
      name:'programs',
      component:Program,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
    {
      path:'/projects',
      name:'projects',
      component:Project,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
    {
      path:'/projects/:id/:mmda',
      name:'projectview',
      component:ProjectView
    },
    {
      path:'/projects/new',
      name:'projects',
      component:NewProject,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
    {
      path:'/budgets',
      name:'budgets',
      component:Budget,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
    {
      path:'/fund-source',
      name:'fundsource',
      component:FundSource,
      meta: { requiresAuth: true ,adminAuth:false,userAuth:true}
    },
     {
      path: "/fund-transfer-approver",
      name: "approver",
      component: FundTransferApprover,
      meta: { requiresAuth: true ,adminAuth:true,userAuth:false}
    },
    {
      path:'/mmda',
      name:'mmda',
      component:MMDA,
       meta: { requiresAuth: true ,adminAuth:true,userAuth:false}
    },
    {
      path:'/mda',
      name:'mda',
      component:MDA,
       meta: { requiresAuth: true ,adminAuth:true,userAuth:false}
    },
    {
      path:'/mmda/:name/',
      name:'mmdaview',
      component:MMDAView,
      meta: { requiresAuth: true ,adminAuth:true,userAuth:false},
    },
    {
      path:'/mmda/:name/transactions',
      name:'mmdatransactions',
      component:MMDATransactions,
      meta: { requiresAuth: true ,adminAuth:true,userAuth:false}
    },
    {
      path:'/mmda/:name/fund-receipients',
      name:'mmdafundreceipients',
      component:MMDAFundReceipients,
      meta: { requiresAuth: true ,adminAuth:true,userAuth:false}
    },
    {   
      path:'/mmda/:name/projects',
      name:'mmdaprojects',
      component:MMDAProjects,
      },
      {
        path:'/mmda/:name/projects/:id',
        name:'mmdaprojectsview',
        component:MMDAProjectview,
      },
      {
        path:'/mmda/:name/projects/new',
        name:'mmdanewproject',
        component:MMDANewProject
      },
      {
      path:'/roles',
      name:'role',
      component:Role

    }
  ]
})

export default router;
router.beforeEach((to, from, next) => {
  const token=localStorage.getItem('access_token');
  const role=localStorage.getItem('role');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }

    // if (to.matched.some(record => record.meta.adminAuth) && role!='admin') {
    //   next({
    //     path: '/dashboard',
    //   })
    // } 

    // if (to.matched.some(record => record.meta.userAuth) && role=='admin') {
    //   next({
    //     path: '/fund-transfer-approver',
    //   })
    // } 


  } else {
    next() // make sure to always call next()!
  }




})
