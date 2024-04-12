import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sim_test',
      name: 'sim_test',
      component: () => import('@/components/Render.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/card/:code?',
      name: 'card',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardPageView.vue')
    },
    {
      path: '/brand/:code?',
      name: 'card',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardPageView.vue')
    },
    {
      path: '/sang_report',
      name: 'sang_report',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NaverMapView.vue')
    },
    {
      path: '/simulation/map/:code?',
      name: 'simualtion_map',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SimulationReport/SimulationMap.vue')
    },
    {
      path: '/simulation/asset',
      name: 'simulation_asset',
      component: () => import('../views/SimulationReport/SimulationAsset.vue')
    },
    {
      path: '/simulation/asset2',
      name: 'simulation_asset2',
      component: () => import('../views/SimulationReport/SimulationAsset2.vue')
    },
    {
      path: '/simulation/brand',
      name: 'simulation_brand',
      component: () => import('../views/SimulationReport/SimulationBrand.vue')
    },
    {
      path: '/simulation_report',
      name: 'simulation_report',
      component: () => import('../views/SimulationReportView.vue')
    },
    {
      path: '/initTile',
      name: 'initTile',
      component: () => import('../views/InitTileTestView.vue')
    },
    {
      path: '/simulation_poly_file',
      name: 'simulation_poly_file',
      component: () => import('@/views/SimulationReport/SimulationPolyFileView.vue')
    },
    {
      path: '/financial_statements',
      name: 'financial_statements',
      component: () => import('@/views/SimulationReport/FinancialStatements.vue'),
      children: [
        {
          path: 'first_year',
          name: 'first_year',
          component: () => import('@/components/SimulationReport/FirstYear.vue')
        },
        {
          path: 'second_year',
          name: 'second_year',
          component: () => import('@/components/SimulationReport/SecondYear.vue')
        },
        {
          path: 'third_year',
          name: 'third_year',
          component: () => import('@/components/SimulationReport/ThirdYear.vue')
        }
      ]
    },
    {
      path: '/store_info',
      name: 'store_info',
      component: () => import('@/views/SimulationReport/StoreInfoView.vue')
    },
    {
      path: '/near_info',
      name: 'near_info',
      component: () => import('@/views/SimulationReport/NearInfo.vue')
    }
  ]
})

export default router
