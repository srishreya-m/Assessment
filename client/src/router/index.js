import { createRouter, createWebHistory } from 'vue-router'
import EmployeeMaintenance from '../views/EmployeeMaintenance.vue'
import DepartmentMaintenance from '../views/DepartmentMaintenance.vue'
import addEmp from '../views/addEmp.vue'
import addDept from '../views/addDept.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
routes : [
  {
    path: '/emp',
    name: 'emp',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/EmployeeMaintenance.vue')
  },
  {
    path: '/dept',
    name: 'dept',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/DepartmentMaintenance.vue')
  },
  {
    path: '/addDept',
    name: 'addDept',
    component: () => import('../views/addDept.vue')
  },
  {
    path: '/addEmp',
    name: 'addEmp',
    component: () => import('../views/addEmp.vue')
  },
]
})

export default router
