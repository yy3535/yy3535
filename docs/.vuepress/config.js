module.exports = {
  title: 'yy3535', // 页签标题 : A001_VuePress博客搭建的简单教程&问题分析 # | Wiki 1001
  description: 'yy3535的笔记', // meta 中的描述文字，意义不大，SEO用
  themeConfig: {
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",
    nav: [
      { text: '前端', link: '/Frontend/' },
      { text: '后端', link: '/Backend/' },
      { text: '运维', link: '/Operation/' },
      // { text: '关于', link: '/About/' },
      { text: 'GitHub', link: 'https://github.com/yy3535' },
    ],
    sidebar: {
      '/Frontend/':[
        {
            title: '前端',
            collapsable: false,
            children: [
               "js",
               "vue",
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
      ]
    }
  }
}