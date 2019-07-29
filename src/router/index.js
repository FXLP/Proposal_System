import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   当设置 true 的时候该路由不会再侧边栏出现
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）。
    breadcrumb: false           如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    name: 'Auth',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: 'Home', icon: 'international', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/message',
    hidden: true,
    component: Layout,
    name: 'Message',
    meta: {
      title: 'Message'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    redirect: '/message/receive',
    children: [
      {
        path: 'receive',
        component: () => import('@/views/message/receive'),
        name: 'Receive',
        meta: { title: 'ReceiveMessage', icon: 'message', noCache: true }
      },
      {
        path: 'send',
        component: () => import('@/views/message/send'),
        name: 'Send',
        meta: { title: 'SendMessage', icon: 'message', noCache: true }
      }
    ]
  },
  {
    path: '/proposal',
    name: 'Proposal',
    component: Layout,
    redirect: '/proposal/create',
    meta: {
      title: 'Proposal',
      icon: 'edit',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/proposal/create'),
        name: 'NewProposal',
        meta: { title: 'NewProposal', roles: ['admin', 'editor'] }
      },
      {
        path: 'support',
        component: () => import('@/views/proposal/support'),
        name: 'SupportProposal',
        meta: { title: 'SupportProposal', roles: ['admin', 'editor'] }
      },
      {
        path: 'list',
        component: () => import('@/views/proposal/list'),
        name: 'ProposalDraft',
        meta: { title: 'ProposalDraft', roles: ['admin', 'editor'] }
      },
      {
        path: 'propodetail/:id',
        hidden: true,
        component: () => import('@/views/proposal/propodetail'),
        name: 'Propodetail',
        meta: { title: 'ProposalDetail', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/review',
    name: 'Review',
    component: Layout,
    redirect: '/review/commander',
    meta: {
      title: 'Review',
      icon: 'peoples',
      roles: ['admin']
    },
    children: [
      {
        path: 'commander',
        component: () => import('@/views/review/commander'),
        name: 'CommanderReview',
        meta: { title: 'CommanderReview', roles: ['admin'] }
      },
      {
        path: 'proposalGroup',
        component: () => import('@/views/review/proposalGroup'),
        name: 'GroupReview',
        meta: { title: 'GroupReview', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/assign',
    name: 'Assign',
    component: Layout,
    redirect: '/assign/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/assign/index'),
        name: 'Assign',
        meta: { title: 'Assign', icon: 'list', roles: ['admin'], requireAuth: true }
      }
    ]
  },
  {
    path: '/implement',
    name: 'Implement',
    component: Layout,
    meta: {
      title: 'Implement',
      icon: 'tab',
      roles: ['admin']
    },
    redirect: '/implement/handle',
    children: [
      {
        path: 'handle',
        component: () => import('@/views/implement/components/handle'),
        name: 'Handle',
        meta: { title: 'Handle', icon: 'tab', roles: ['admin'] }
      },
      {
        path: 'jointly',
        component: () => import('@/views/implement/components/jointly'),
        name: 'Jointly',
        meta: { title: 'Jointly', icon: 'tab', roles: ['admin'] }
      },
      {
        path: 'suggestion/:id',
        hidden: true,
        component: () => import('@/views/implement/suggestion'),
        name: 'Suggestion',
        meta: { title: 'Suggestion', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/handle',
    name: 'Handle',
    component: Layout,
    redirect: '/handle/waitHandle',
    meta: {
      title: 'Handle',
      icon: 'skill',
      roles: ['admin']
    },
    children: [
      {
        path: 'waitHandle',
        component: () => import('@/views/handle/waitHandle'),
        name: 'WaitHandle',
        meta: { title: 'WaitHandle', roles: ['admin'] }
      },
      {
        path: 'Handling',
        component: () => import('@/views/handle/handling'),
        name: 'Handling',
        meta: { title: 'Handling', roles: ['admin'] }
      },
      {
        path: 'finished',
        component: () => import('@/views/handle/finished'),
        name: 'Finished',
        meta: { title: 'Finished', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      requireAuth: true,
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', affix: true }
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/icon',
    name: 'Icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    name: 'Tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    name: 'Error-log',
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    name: 'Pdf',
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    name: 'Pdfdownload',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    name: 'Theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    name: 'Clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    name: 'External-link',
    component: Layout,
    children: [
      {
        path: 'https://www.ecust.edu.cn/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
