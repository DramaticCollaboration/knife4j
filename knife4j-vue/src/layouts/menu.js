/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

function isUrl(path) {
  return reg.test(path);
}


const menuData = [{
    key: 'kmain',
    name: 'Home',
    icon: 'icon-home',
    path: 'home',
  }, {
    key: 'swaggerModel',
    name: 'Swagger Models',
    icon: 'icon-modeling',
    path: 'swaggermodels',
  }, {
    key: 'documentManager',
    name: 'Document management',
    icon: 'icon-zdlxb',
    path: 'documentManager',
    children: [{
        key: 'anlaysisPage',
        name: 'Global parameter settings',
        component: 'Hello2',
        path: 'hello'
      },
      {
        key: 'monitorPage',
        name: 'Offline documents(Md)',
        component: 'Hello2',
        path: 'hello1'
      },
      {
        key: 'workspacePage',
        name: 'Personalization',
        component: 'Hello2',
        path: 'hello2'
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      }
    ]
  },
  {
    key: 'dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
        key: 'anlaysisPage',
        name: 'Analysis page',
        component: 'Hello2',
        path: 'hello'
      },
      {
        key: 'monitorPage',
        name: 'Monitoring page',
        component: 'Hello2',
        path: 'hello1'
      },
      {
        key: 'workspacePage',
        name: 'Workbench',
        component: 'Hello2',
        path: 'hello2'
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      }
    ]
  },
  {
    key: 'form',
    name: 'Form page',
    icon: 'form',
    path: 'form',
    children: [{
        key: 'basicForm',
        name: 'Basic form',
        component: 'Hello2',
        path: 'hello3'
      },
      {
        key: 'setupForm',
        name: 'step by step form',
        component: 'Hello2',
        path: 'hello5'
      },
      {
        key: 'advanceForm',
        name: 'Advanced forms',
        authority: 'admin',
        component: 'Hello2',
        path: 'hello4'
      }
    ]
  }
]

function formatter(data, parentPath = "/", parentAuthority) {
  return data.map(item => {
    let {
      path
    } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}



export const getMenuData = () => formatter(menuData);
