module.exports = {
  base: '/',
  title: 'yy3535',
  description: 'yy3535的笔记',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }]
  ],
  themeConfig: {
    //导航栏徽标
    logo: '/img/logo.jpg',
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",
    // sidebarDepth: 4, 
    nav: [
      { text: '前端', link: '/frontend/' },
      { text: '后端', link: '/backend/' },
      { text: '运维', link: '/operation/' },
      // { text: '关于', link: '/About/' },
      { text: '待整理', link: '/todo/' },
      // { text: '随想', link: '/Thought/' },
      { text: 'GitHub', link: 'https://github.com/yy3535/yy3535' },
    ],
    sidebar: {
      '/frontend/':[
        {
            title: 'js',
            collapsable: false,
            children: [
              '/frontend/js/jsbasic/',
              '/frontend/js/jswebapi/',
              '/frontend/js/devenv/',
              '/frontend/js/runenv/',
              '/frontend/js/es6/',
              '/frontend/js/designpatterns/',
              '/frontend/js/jsbasic/zepto/',
              '/frontend/js/jsbasic/shenrubibao/',
            ]
        },
        {
            title: 'css',
            collapsable: false,
            children: [
              'css',
            ]
        },
        {
          title: 'vue',
          collapsable: false,
          children: [
             "vue",
          ]
        },
        {
          title: 'webpack',
          collapsable: false,
          children: [
             "webpack",
          ]
        },
        {
          title: '小工具',
          collapsable: false,
          children: [
             "vuepress",
             "markdown"
          ]
        },
        // '/frontend/',
        // {
        //   title: 'jswebapi',
        //   children: [
        //       '/frontend/js/jswebapi/',
        //   ]
        // },
        // ['/frontend/js/jswebapi','js基础'],
        // ['/frontend/js/other','js基础'],
      ],
      '/backend/':[
        {
            title: '后端',
            collapsable: false,
            children: [
               "node"
            ]
        }
      ],
      '/operation/':[
        {
            title: '运维',
            collapsable: false,
            children: [
               "git"
            ]
        }
      ],
      '/about/':[
        {
            title: '关于',
            collapsable: false,
        }
      ],
      '/todo/':[
        {
            title: '待整理',
            collapsable: false,
        }
      ],
      '/thought/':[
        {
            title: '随想',
            collapsable: false,
        }
      ],
    }
  }
}