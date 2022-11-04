import React, { memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from '../routes/routes'

const AppRouter = memo(() => {
	return (
		<Routes>
			{routes.map(route =>
				<Route key={route.path} path={route.path} element={route.element}></Route>
			)}
		</Routes>
	)
})

export default AppRouter