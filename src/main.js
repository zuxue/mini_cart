import { createSSRApp } from 'vue'
import App from './App.vue'
import { initializeTheme, activeThemeId, themeStyle, themeAccent, themeLayout } from './utils/theme'

export function createApp() {
  const app = createSSRApp(App)
  initializeTheme()
  Object.defineProperty(app.config.globalProperties, '$themeStyle', {
    get: () => themeStyle
  })
  Object.defineProperty(app.config.globalProperties, '$themeAccent', {
    get: () => themeAccent
  })
  Object.defineProperty(app.config.globalProperties, '$themeId', {
    get: () => activeThemeId
  })
  Object.defineProperty(app.config.globalProperties, '$themeLayout', {
    get: () => themeLayout
  })
  return { app }
}
