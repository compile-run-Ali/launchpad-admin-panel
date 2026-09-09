import React from 'react'
import { useRoutes } from 'react-router-dom'
import Administration from '../pages/Administration'
import Banners from '../pages/Banners'


export default function WebRouter() {
  let routes = useRoutes([
    { path: '/', element: <Administration />},
    {path:'/banners', element: <Banners />}
  ])
  return routes
}

