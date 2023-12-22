import { ComponentType } from 'react'
import {
  createBrowserRouter,
  Link,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import DemoMain from './demo-main'
/*import DemoPerformance from './demo-performance'
import DemoTreePGroups from './demo-tree-groups'
import LinkedTimelines from './demo-linked-timelines'
import ElementResize from './demo-element-resize'
import Renderers from './demo-renderers'
import VerticalClasses from './demo-vertical-classes'
import CustomItems from './demo-custom-items'
import CustomHeaders from './demo-headers'
import CustomInfoLabel from './demo-custom-info-label'
import ControledSelect from './demo-controlled-select'
import ControlledScrolling from './demo-controlled-scrolling'*/

const routes: RouteObject[] = [
  {
    path: '/',
    Component: withLayout(DemoMain),
    loader: () => 'loading',
  },
  /* {
    path: '/DemoPerformance',
    Component: withLayout(DemoPerformance),
    loader: () => 'loading',
  },
  {
    path: '/DemoTreePGroups',
    Component: withLayout(DemoTreePGroups),
    loader: () => 'loading',
  },
  {
    path: '/LinkedTimelines',
    Component: withLayout(LinkedTimelines),
  },
  {
    path: '/ElementResize',
    Component: withLayout(ElementResize),
  },
  {
    path: '/Renderers',
    Component: withLayout(Renderers),
  },
  {
    path: '/VerticalClasses',
    Component: withLayout(VerticalClasses),
  },
  {
    path: '/CustomItems',
    Component: withLayout(CustomItems),
  },
  {
    path: '/CustomHeaders',
    Component: withLayout(CustomHeaders),
  },
  {
    path: '/CustomInfoLabel',
    Component: withLayout(CustomInfoLabel),
  },
  {
    path: '/ControledSelect',
    Component: withLayout(ControledSelect),
  },
  {
    path: '/ControlledScrolling',
    Component: withLayout(ControlledScrolling),
  },*/
]

function Menu() {
  return (
    <div className={`demo-row`}>
      Choose the demo:
      {routes.map((key) => (
        <Link key={key.path} to={`${key.path}`}>
          {key.path!.replace('/', '')}
        </Link>
      ))}
    </div>
  )
}

function withLayout(Component: ComponentType<any>) {
  return function Layout() {
    return (
      <div>
        <Menu />
        <div className="demo-demo">{/* <Component />*/}</div>
      </div>
    )
  }
}

function App() {
  // return <RouterProvider router={createBrowserRouter(routes)} />
  return <DemoMain />
}

export default App
