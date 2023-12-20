import { defineUserConfig } from 'vuepress'
import path from 'path'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default defineUserConfig({
    title: 'yy3535',
    description: 'yy3535的笔记',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ],
    plugins: [  
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        })
    ],
    theme:defaultTheme({
        //导航栏徽标
        logo: '/img/logo.jpg',
        editLinkText: "编辑此页",
        lastUpdatedText: "上次更新",
        navbar: [
            { text: '前端', link: '/Frontend/' },
            { text: '后端', link: '/Backend/' },
            { text: '运维', link: '/Operation/' },
            { text: '关于', link: '/About/' },
            // { text: '待整理', link: '/Todo/' },
            { text: 'ARTS', link: '/Thought/' },
            { text: 'GitHub', link: 'https://github.com/yy3535/yy3535' },
        ],
        sidebar: {
            '/Frontend/': [
            {
                text: 'html/css',
                link:'/Frontend/css.md',
            },
            {
                text: 'js',
                children: [
                    '/Frontend/js/jsbasic/',
                    '/Frontend/js/jssenior/',
                    '/Frontend/js/jsbasic/zepto',
                    '/Frontend/js/jsbasic/shenrubibao',
                    '/Frontend/js/jswebapi/',
                    '/Frontend/js/devenv/',
                    '/Frontend/js/runenv/',
                    '/Frontend/js/es6/',
                    '/Frontend/js/designpatterns/',
                ]
            },
            '/Frontend/vue.md',
            '/Frontend/vuesource.md',
            '/Frontend/react.md',
            '/Frontend/typescript.md',
            '/Frontend/webpack.md',
            '/Frontend/algorithm.md',
            '/Frontend/viewskills.md',
            {
                text: '小工具',
                children: [
                    "vuepress",
                    "markdown",
                    "github.io"
                ]
            },
            'automatedTest',
            {
                text: '其他',
                children: [
                    "other",
                ]
            },
            ],
            '/Backend/': [{
                text: '后端',
                children: [
                    "node"
                ]
            }],
            '/Operation/': [{
                text: '运维',
                children: [
                    "git",
                    "unix-linux-shell",
                    "tools"
                ]
            }],
            '/Thought/': [
                { text: 'Thought' }
            ],
            '/Summary/': [{
                text: '总结',
                children: [
                    "summary",
                    "xdf",
                    "aboutme",
                    "project"
                ]
            }],
        },
        sidebarDepth:0
    })
})
