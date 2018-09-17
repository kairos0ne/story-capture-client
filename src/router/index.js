import Vue from 'vue'
import Router from 'vue-router'
import about from '@/components/about'
import capture from '@/components/capture'
import login from '@/components/login'
import register from '@/components/register'
import clients from '@/components/clients/clients-list'
import client from '@/components/clients/clients-read'
import clientsCreate from '@/components/clients/clients-create'
import epic from '@/components/epics/epics-read'
import epicsList from '@/components/epics/epics-list'
import epicsCreate from '@/components/epics/epics-create'
import storiesCreate from '@/components/stories/stories-create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: about
    },
    {
      path: '/capture',
      name: 'capture',
      component: capture
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/clients',
      name: 'clients',
      component: clients
    },
    {
      path: '/clients-create',
      name: 'clients-create',
      component: clientsCreate
    },
    {
      path: '/client/:id',
      name: 'client',
      component: client
    },
    {
      path: '/epic/:id',
      name: 'epic',
      component: epic
    },
    {
      path: '/epics',
      name: 'epics',
      component: epicsList
    },
    {
      path: '/epics-create',
      name: 'epics-create',
      component: epicsCreate
    },
    {
      path: '/stories-create',
      name: 'stories-create',
      component: storiesCreate
    }
  ]
})
