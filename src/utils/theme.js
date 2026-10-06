import { appConfig } from '../config'
import { themes } from '../config/themes'

function cssVariables(theme) {
  const { colors, radius } = theme
  return [
    `--ink:${colors.ink}`,
    `--muted:${colors.muted}`,
    `--paper:${colors.paper}`,
    `--card:${colors.card}`,
    `--accent:${colors.accent}`,
    `--accent-start:${colors.accentStart}`,
    `--accent-end:${colors.accentEnd}`,
    `--accent-soft:${colors.accentSoft}`,
    `--line:${colors.line}`,
    `--card-radius:${radius.card}`,
    `--control-radius:${radius.control}`,
    `background-color:${colors.paper}`
  ].join(';')
}

export const activeThemeId = themes[appConfig.uiTheme] ? appConfig.uiTheme : 'commerce'
export const activeTheme = themes[activeThemeId]
export const themeStyle = cssVariables(activeTheme)
export const themeAccent = activeTheme.colors.accent
export const themeLayout = activeTheme.layout

export function initializeTheme() {
  setTimeout(() => {
    uni.setNavigationBarColor({ ...activeTheme.navigation })
    uni.setTabBarStyle({ ...activeTheme.tabBar })
  }, 0)
  return activeTheme
}
