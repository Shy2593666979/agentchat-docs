import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/custom.css'
import './style/vars.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 可以在这里注册全局组件或添加其他增强功能
  }
}