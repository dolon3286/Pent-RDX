import AppBar from '@suid/material/AppBar'
import Toolbar from '@suid/material/Toolbar'
import Typography from '@suid/material/Typography'
import IconButton from '@suid/material/IconButton'
import { A, useNavigate } from '@solidjs/router'
import LogoutIcon from '@suid/icons-material/Logout'
import Box from '@suid/material/Box'

import AppIcon from './AppIcon'
import createLocalStore from '../../libs'

const Header = () => {
	const [_store, setStore] = createLocalStore()
	const navigate = useNavigate()

	const logout = (_) => {
		setStore('access_token')
		setStore('redirect', '/')

		navigate('/login')
	}

	return (
		<AppBar
			elevation={0}
			sx={{
				background:
					'linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(157, 255, 181, 0.11))',
				backdropFilter: 'blur(18px) saturate(115%)',
				borderBottom: '1px solid rgba(198, 255, 208, 0.38)',
				boxShadow: '0 12px 30px rgba(5, 24, 13, 0.35)',
				color: '#f2fff3',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<A href="/">
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<AppIcon />
						<Typography
							variant="h4"
							noWrap
							sx={{
								pl: 1.5,
								fontWeight: 700,
								textShadow: '0 4px 16px rgba(42, 90, 56, 0.45)',
							}}
						>
							Pentaract
						</Typography>
					</Box>
				</A>

				<IconButton
					onClick={logout}
					sx={{
						color: '#f2fff3',
						border: '1px solid rgba(207, 255, 216, 0.42)',
						backgroundColor: 'rgba(188, 255, 202, 0.15)',
					}}
				>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export default Header
