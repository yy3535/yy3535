module.exports = {
    // base: '/',
    title: 'yy3535',
    description: 'yy3535的笔记',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        ['script', { src: '/img/类图.png' }]
    ],
    themeConfig: {
        //导航栏徽标
        logo: '/img/logo.jpg',
        editLinkText: "编辑此页",
        lastUpdated: "上次更新",
        sidebarDepth: 1,
        nav: [
            { text: '前端', link: '/Frontend/' },
            { text: '后端', link: '/Backend/' },
            { text: '运维', link: '/Operation/' },
            // { text: '关于', link: '/About/' },
            // { text: '待整理', link: '/Todo/' },
            // { text: '随想', link: '/Thought/' },
            { text: 'GitHub', link: 'https://github.com/yy3535/yy3535' },
        ],
        sidebar: {
            '/Frontend/': [{
                    title: 'js',
                    collapsable: false,
                    children: [
                        '/Frontend/js/jsbasic/',
                        '/Frontend/js/jsbasic/zepto',
                        '/Frontend/js/jsbasic/shenrubibao',
                        '/Frontend/js/jswebapi/',
                        '/Frontend/js/devenv/',
                        '/Frontend/js/runenv/',
                        '/Frontend/js/es6/',
                        '/Frontend/js/designpatterns/',
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
                    title: '前端知识点大纲',
                    collapsable: false,
                    children: [
                        "viewskills",
                    ]
                },
                {
                    title: 'JS数据结构与算法',
                    collapsable: false,
                    children: [
                        "algorithm",
                    ]
                },
                {
                    title: '小工具',
                    collapsable: false,
                    children: [
                        "vuepress",
                        "markdown",
                        "github.io"
                    ]
                },
                {
                    title: '自动化测试',
                    collapsable: false,
                    children: [
                        "automatedTest",
                    ]
                },
                {
                    title: '其他',
                    collapsable: false,
                    children: [
                        "other",
                    ]
                },
                {
                    title: '错误',
                    collapsable: false,
                    children: [
                        "error",
                    ]
                },
                // '/Frontend/',
                // {
                //   title: 'jswebapi',
                //   children: [
                //       '/Frontend/js/jswebapi/',
                //   ]
                // },
                // ['/Frontend/js/jswebapi','js基础'],
                // ['/Frontend/js/other','js基础'],
            ],
            '/Backend/': [{
                title: '后端',
                collapsable: false,
                children: [
                    "node"
                ]
            }],
            '/Operation/': [{
                title: '运维',
                collapsable: false,
                children: [
                    "git",
                    "commands"
                ]
            }],
            '/about/': [{
                title: '关于',
                collapsable: false,
            }],
            '/summary/': [{
                title: '总结',
                collapsable: false,
                children: [
                    "summary",
                    "xdf",
                    "aboutme"
                ]
            }],
        }
    }
}