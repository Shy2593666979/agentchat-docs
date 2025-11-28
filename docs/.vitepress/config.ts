import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'AgentChat',
  description: '基于大语言模型的智能对话系统技术文档',
  base: '/agentchat-docs/',
  
  head: [
    ['link', { rel: 'icon', href: '/agentchat-docs/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: 'AgentChat | 智能对话系统' }],
    ['meta', { property: 'og:site_name', content: 'AgentChat' }],
    ['meta', { property: 'og:image', content: '/agentchat-docs/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://shy2593666979.github.io/agentchat-docs/' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '快速入门', link: '/快速入门' },
      { text: '系统概述', link: '/系统概述' },
      { text: '技术栈', link: '/技术栈' },
      {
        text: '核心功能',
        items: [
          { text: '多Agent系统', link: '/核心功能模块/多Agent系统' },
          { text: 'MCP集成', link: '/核心功能模块/MCP集成' },
          { text: '知识库系统', link: '/核心功能模块/知识库系统' },
          { text: '工具生态系统', link: '/核心功能模块/工具生态系统' }
        ]
      },
      {
        text: 'API文档',
        items: [
          { text: 'API总览', link: '/API参考/API参考' },
          { text: 'Agent API', link: '/API参考/Agent API' },
          { text: '对话 API', link: '/API参考/对话API' },
          { text: '知识库 API', link: '/API参考/知识库API' }
        ]
      },
      {
        text: '开发指南',
        items: [
          { text: '环境搭建', link: '/开发指南/环境搭建' },
          { text: '编码规范', link: '/开发指南/编码规范' },
          { text: '调试技巧', link: '/开发指南/调试技巧' }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: '入门与概览',
          collapsed: false,
          items: [
            { text: '系统概述', link: '/系统概述' },
            { text: '快速入门', link: '/快速入门' },
            { text: '技术栈', link: '/技术栈' }
          ]
        },
        {
          text: '核心功能模块',
          collapsed: false,
          items: [
            { text: '核心功能模块', link: '/核心功能模块/核心功能模块' },
            { text: '多Agent系统', link: '/核心功能模块/多Agent系统' },
            { text: 'MCP集成', link: '/核心功能模块/MCP集成' },
            { text: '工具生态系统', link: '/核心功能模块/工具生态系统' },
            { text: '知识库系统', link: '/核心功能模块/知识库系统' }
          ]
        },
        {
          text: 'API 参考',
          collapsed: true,
          items: [
            { text: 'API总览', link: '/API参考/API参考' },
            { text: 'Agent API', link: '/API参考/Agent API' },
            { text: '对话 API', link: '/API参考/对话API' },
            { text: '工具 API', link: '/API参考/工具API' },
            { text: '用户 API', link: '/API参考/用户API' },
            { text: '知识库 API', link: '/API参考/知识库API' },
            { text: 'MCP服务 API', link: '/API参考/MCP服务API' }
          ]
        },
        {
          text: '数据库设计',
          collapsed: true,
          items: [
            { text: '设计总览', link: '/数据库设计/数据库设计' },
            {
              text: '关系型数据模型',
              items: [
                { text: '模型总览', link: '/数据库设计/关系型数据模型/关系型数据模型' },
                { text: '用户数据模型', link: '/数据库设计/关系型数据模型/用户数据模型' },
                { text: '智能体数据模型', link: '/数据库设计/关系型数据模型/智能体数据模型' },
                { text: '对话会话模型', link: '/数据库设计/关系型数据模型/对话会话数据模型' },
                { text: '消息记录模型', link: '/数据库设计/关系型数据模型/消息记录数据模型' },
                { text: '知识库模型', link: '/数据库设计/关系型数据模型/知识库数据模型' },
                { text: 'MCP服务配置', link: '/数据库设计/关系型数据模型/MCP服务配置模型' }
              ]
            },
            {
              text: '向量存储架构',
              items: [
                { text: '架构总览', link: '/数据库设计/向量存储架构/向量存储架构' },
                { text: '文档解析与向量化', link: '/数据库设计/向量存储架构/文档解析与向量化/文档解析与向量化' },
                { text: '向量数据库集成', link: '/数据库设计/向量存储架构/向量数据库集成/向量数据库集成' }
              ]
            }
          ]
        },
        {
          text: '项目目录结构',
          collapsed: true,
          items: [
            { text: '结构总览', link: '/项目目录结构/项目目录结构' },
            { text: '前端目录', link: '/项目目录结构/前端目录结构/前端目录结构' },
            { text: '后端目录', link: '/项目目录结构/后端目录结构/后端目录结构' }
          ]
        },
        {
          text: '开发指南',
          collapsed: true,
          items: [
            { text: '开发指南', link: '/开发指南/开发指南' },
            { text: '环境搭建', link: '/开发指南/环境搭建' },
            { text: '编码规范', link: '/开发指南/编码规范' },
            { text: '调试技巧', link: '/开发指南/调试技巧' },
            { text: '测试策略', link: '/开发指南/测试策略' }
          ]
        },
        {
          text: '部署指南',
          collapsed: true,
          items: [
            { text: '部署指南', link: '/部署指南/部署指南' },
            { text: '开发环境部署', link: '/部署指南/开发环境部署' },
            { text: '生产环境部署', link: '/部署指南/生产环境部署/生产环境部署' },
            { text: '运维管理', link: '/部署指南/运维管理/运维管理' }
          ]
        },
        {
          text: '安全考虑',
          collapsed: true,
          items: [
            { text: '安全概述', link: '/安全考虑/安全考虑' },
            {
              text: 'API安全',
              items: [
                { text: 'API安全概览', link: '/安全考虑/API安全/API安全' },
                { text: '输入验证与防注入', link: '/安全考虑/API安全/输入验证与防注入' },
                { text: '沙箱执行安全', link: '/安全考虑/API安全/沙箱执行安全' }
              ]
            },
            {
              text: '数据安全',
              items: [
                { text: '数据安全概览', link: '/安全考虑/数据安全/数据安全' },
                { text: '传输安全', link: '/安全考虑/数据安全/传输安全' },
                { text: '密码哈希与加密', link: '/安全考虑/数据安全/密码哈希与数据加密' }
              ]
            },
            {
              text: '认证与授权',
              items: [
                { text: '认证与授权概览', link: '/安全考虑/认证与授权/认证与授权' },
                { text: '令牌生成与验证', link: '/安全考虑/认证与授权/令牌生成与验证/令牌生成与验证' },
                { text: '安全策略', link: '/安全考虑/认证与授权/安全策略/安全策略' }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Shy2593666979/AgentChat' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 AgentChat'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/Shy2593666979/AgentChat/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // 这里可以添加markdown插件配置
    }
  },





  vite: {
    optimizeDeps: {
      include: ['mermaid']
    }
  },

  // 忽略死链检查，特别是localhost开发环境链接
  ignoreDeadLinks: [
    // 忽略所有localhost链接
    /^http:\/\/localhost/,
    // 忽略特定的开发环境链接
    'http://localhost:7860',
    'http://localhost:8090',
    'http://localhost:7860/health',
    'http://localhost:8090/health',
    'http://localhost:7860/docs'
  ]
}))