import { onMount } from 'solid-js'
import { Outlet } from '@solidjs/router'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Box from '@suid/material/Box'
import Container from '@suid/material/Container'
import CssBaseline from '@suid/material/CssBaseline'
import Toolbar from '@suid/material/Toolbar'

import { checkAuth } from '../common/auth_guard'

const BasicLayout = () => {
	onMount(checkAuth)

	return (
		<>
			<Header />
			<Box class="liquid-shell">
				<CssBaseline />
				<Toolbar />

				<Box sx={{ display: 'flex' }}>
					<SideBar />

					<Container sx={{ pt: 4, pb: 4 }}>
						<Box class="liquid-main">
							<Outlet />
						</Box>
					</Container>
				</Box>
			</Box>
		</>
	)
}

export default BasicLayout
