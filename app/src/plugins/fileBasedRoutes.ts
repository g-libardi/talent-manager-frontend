import React, { Fragment } from 'react';

interface Route {
  route: string,
  component: typeof Fragment,
}

interface PageModule {
  default: React.ComponentType
}

function pathToRoute(path: string) {
  return path.replace(/\/src\/pages\/|index|\.tsx/g, '')
    .replace(/\[\.{3}\]/g, '*')
    .replace(/\[(.+)\]/g, ':$1')
}

const routeFiles = import.meta.glob<PageModule>('/src/pages/**/[a-z\[]*.tsx', { eager: true })
console.log(routeFiles)
const routes = Object.keys(routeFiles).map((path) => {
  const route = pathToRoute(path)
  return { route, component: routeFiles[path].default }
})

export default routes as Route[];
