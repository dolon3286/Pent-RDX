import { Routes, Route, Navigate } from '@solidjs/router'
import { ThemeProvider, createTheme } from '@suid/material'

import Login from './pages/Login'
import BasicLayout from './layouts/Basic'
import Storages from './pages/Storages'
import StorageCreateForm from './pages/Storages/StorageCreateForm'
import AlertStack from './components/AlertStack'
import StorageWorkers from './pages/StorageWorkers'
import StorageWorkerCreateForm from './pages/StorageWorkers/StorageWorkerCreateForm'
import Files from './pages/Files'
import UploadFileTo from './pages/Files/UploadFileTo'
import Register from './pages/Register'
import NotFound from './pages/404'

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#5F6FFF',
		},
		secondary: {
			main: '#8BE9FF',
		},
		background: {
			default: '#e9f1ff',
			paper: 'rgba(255, 255, 255, 0.55)',
		},
	},
	shape: {
		borderRadius: 20,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backdropFilter: 'blur(16px)',
					background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.35))',
					border: '1px solid rgba(255, 255, 255, 0.55)',
					boxShadow: '0 12px 28px rgba(70, 88, 149, 0.18)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '999px',
					textTransform: 'none',
					fontWeight: 600,
				},
			},
		},
	},
})

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />

				<Route path="/" component={BasicLayout}>
					<Route path="/" element={<Navigate href="/storages" />} />
					<Route path="/storages" component={Storages} />
					<Route path="/storages/register" component={StorageCreateForm} />
					<Route path="/storages/:id/files/*path" component={Files} />
					<Route path="/storages/:id/upload_to" component={UploadFileTo} />
					<Route path="/storage_workers" component={StorageWorkers} />
					<Route
						path="/storage_workers/register"
						component={StorageWorkerCreateForm}
					/>
					<Route path="*404" component={NotFound} />
				</Route>
			</Routes>

			<AlertStack />
		</ThemeProvider>
	)
}

export default App
