import Vue from 'vue'
import Router from 'vue-router'
import about from '@/components/about'
import capture from '@/components/capture'
import login from '@/components/login'
import authCallback from '@/components/auth-callback'
import register from '@/components/register'
import clients from '@/components/clients/clients-list'
import client from '@/components/clients/clients-read'
import clientsCreate from '@/components/clients/clients-create'
import clientsUpdate from '@/components/clients/clients-update'
import projectsList from '@/components/projects/projects-list'
import projectsRead from '@/components/projects/projects-read'
import projectsCreate from '@/components/projects/projects-create'
import issuesRead from '@/components/issues/issues-read'
import issuesCreate from '@/components/issues/issues-create'
import epic from '@/components/epics/epics-read'
import epicsList from '@/components/epics/epics-list'
import epicsCreate from '@/components/epics/epics-create'
import epicsUpdate from '@/components/epics/epics-update'
import storiesCreate from '@/components/stories/stories-create'
import storiesList from '@/components/stories/stories-list'
import storiesUpdate from '@/components/stories/stories-update'
import storiesRead from '@/components/stories/stories-read'
import account from '@/components/account'
import accountUpdate from '@/components/account-update'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/auth/callback',
      name: 'Callback',
      component: authCallback
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
      path: '/clients-update',
      name: 'clients-update',
      component: clientsUpdate
    },
    {
      path: '/projects',
      name: 'projects',
      component: projectsList
    },
    {
      path: '/project',
      name: 'project',
      component: projectsRead
    },
    {
      path: '/project-create',
      name: 'project-create',
      component: projectsCreate
    },
    {
      path: '/issues-create',
      name: 'issues-create',
      component: issuesCreate
    },
    {
      path: '/issue',
      name: 'issue',
      component: issuesRead
    },
    {
      path: '/epic/:id',
      name: 'epic',
      component: epic
    },
    {
      path: '/epics-update',
      name: 'epics-update',
      component: epicsUpdate
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
    },
    {
      path: '/stories',
      name: 'stories',
      component: storiesList
    },
    {
      path: '/stories-update',
      name: 'stories-update',
      component: storiesUpdate
    },
    {
      path: '/story/:id',
      name: 'story',
      component: storiesRead
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/account-update',
      name: 'account-update',
      component: accountUpdate
    }
  ]
})
