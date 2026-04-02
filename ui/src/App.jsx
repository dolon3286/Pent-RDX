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
		mode: 'dark',
		background: {
			default: '#070b14',
			paper: 'rgba(24, 33, 56, 0.44)',
		},
		primary: {
			main: '#89c7ff',
		},
		secondary: {
			main: '#cde3ff',
		},
		text: {
			primary: '#eef4ff',
			secondary: '#d2deee',
		},
	},
	shape: {
		borderRadius: 18,
	},
	typography: {
		fontFamily:
			'"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					background: 'rgba(20, 31, 56, 0.4)',
					border: '1px solid rgba(210, 228, 255, 0.2)',
					backdropFilter: 'blur(22px) saturate(180%)',
					WebkitBackdropFilter: 'blur(22px) saturate(180%)',
					boxShadow: '0 18px 40px rgba(2, 8, 24, 0.45)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 999,
					textTransform: 'none',
					fontWeight: 600,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: 'rgba(12, 21, 39, 0.55)',
					borderBottom: '1px solid rgba(208, 225, 255, 0.16)',
					backdropFilter: 'blur(24px) saturate(170%)',
					WebkitBackdropFilter: 'blur(24px) saturate(170%)',
					boxShadow: 'none',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: 'rgba(185, 209, 247, 0.16)',
				},
				head: {
					fontWeight: 650,
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
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
