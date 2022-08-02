export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'smile',
    component: './DashBoard',
  },
  {
    path: '/users',
    name: 'users',
    icon: 'UserOutlined',
    component: './Users',
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'ShoppingOutlined',
    component: './Goods',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './DashBoard',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
