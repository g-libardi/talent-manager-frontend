import React from 'react';
import DefaultLayout from '@layouts/default';
import EmptyLayout from '@/layouts/empty';


/* --- begin interface defintions --- */
interface Route {
  route: string,
  component: React.ComponentType,
  layout: React.ComponentType,
}

interface PageConfig {
  layout: React.ComponentType,
}

interface PageModule {
  default: React.ComponentType,
  pageConfig: PageConfig,
}
/* --- end interface definitions --- */


/* --- begin constants --- */
const pageConfigDefaults: PageConfig = {
  layout: DefaultLayout,
}
/* --- end constants --- */


/* --- begin helper functions --- */
function pathToRoute(path: string) {
  return path.replace(/\/src\/pages\/|index|\.tsx/g, '')
    .replace(/\[\.{3}\]/g, '*')
    .replace(/\[(.+)\]/g, ':$1')
}

function getPageConfig(module: PageModule) {
  const config = { ...pageConfigDefaults, ...module.pageConfig }
  config.layout = config.layout === null ? EmptyLayout : config.layout
  return config
}
/* --- end helper functions --- */


/* --- begin main code --- */
const routeFiles = import.meta.glob<PageModule>('/src/pages/**/[a-z\[]*.tsx', { eager: true })
const routes = Object.keys(routeFiles).map((path) => {
  const route = pathToRoute(path)
  const pageConfig = getPageConfig(routeFiles[path])
  return { route, component: routeFiles[path].default, ...pageConfig }
})

export default routes as Route[];
/* --- end main code --- */
