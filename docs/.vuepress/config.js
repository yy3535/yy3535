module.exports = {
  base: '/note/',
  title: 'yy3535',
  description: 'yy3535的笔记',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }]
  ],
  // markdown: {
  //   lineNumbers: true
  // },
  themeConfig: {
    //导航栏徽标
    logo: '/img/logo.jpg',
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",
    nav: [
      { text: '前端', link: '/Frontend/' },
      { text: '后端', link: '/Backend/' },
      { text: '运维', link: '/Operation/' },
      // { text: '关于', link: '/About/' },
      { text: '待整理', link: '/Todo/' },
      { text: '随想', link: '/Thought/' },
      { text: 'GitHub', link: 'https://github.com/yy3535/yy3535' },
    ],
    sidebar: {
      '/Frontend/':[
        {
            title: '前端',
            collapsable: false,
            children: [
              {
                title: 'Group 2',
                children: [['"/js/01"', 'js基础'],"/js/02"]
              },
               "vue",
               "vuepress",
               "webpack"
            ]
        }
      ],
      '/Backend/':[
        {
            title: '后端',
            collapsable: false,
            children: [
               "node"
            ]
        }
      ],
      '/Operation/':[
        {
            title: '运维',
            collapsable: false,
            children: [
               "git"
            ]
        }
      ],
      '/About/':[
        {
            title: '关于',
            collapsable: false,
        }
      ],
      '/Todo/':[
        {
            title: '待整理',
            collapsable: false,
        }
      ],
      '/Thought/':[
        {
            title: '随想',
            collapsable: false,
        }
      ],
    }
  }
}