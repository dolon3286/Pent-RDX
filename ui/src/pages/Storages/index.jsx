import Typography from '@suid/material/Typography'
import Grid from '@suid/material/Grid'
import Stack from '@suid/material/Stack'
import Paper from '@suid/material/Paper'
import Table from '@suid/material/Table'
import TableBody from '@suid/material/TableBody'
import TableCell from '@suid/material/TableCell'
import TableContainer from '@suid/material/TableContainer'
import TableHead from '@suid/material/TableHead'
import TableRow from '@suid/material/TableRow'
import Button from '@suid/material/Button'
import DeleteIcon from '@suid/icons-material/Delete'
import { Show, createSignal, mapArray, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import API from '../../api'
import { convertSize } from '../../common/size_converter'
import ActionConfirmDialog from '../../components/ActionConfirmDialog'

const Storages = () => {
	/**
	 * @type {[import("solid-js").Accessor<import("../../api").StorageWithInfo[]>, any]}
	 */
	const [storages, setStorages] = createSignal([])
	const [storageToDelete, setStorageToDelete] = createSignal(null)
	const navigate = useNavigate()

	onMount(async () => {
		const storagesSchema = await API.storages.listStorages()
		setStorages(storagesSchema.storages)
	})

	const removeStorage = async () => {
		const selectedStorage = storageToDelete()
		if (!selectedStorage) {
			return
		}

		await API.storages.deleteStorage(selectedStorage.id)
		setStorages((s) => s.filter((storage) => storage.id !== selectedStorage.id))
		setStorageToDelete(null)
	}

	return (
		<Stack container>
			<Grid container sx={{ mb: 2 }}>
				<Grid item xs={6}>
					<Typography variant="h4">Storages</Typography>
				</Grid>
				<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						onClick={() => navigate('/storages/register')}
						variant="contained"
						color="secondary"
					>
						Register new
					</Button>
				</Grid>
			</Grid>

			<Grid>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }}>
						<Show
							when={storages().length}
							fallback={<div>There's no storages yet</div>}
						>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Chat ID</TableCell>
									<TableCell>Size</TableCell>
									<TableCell>Files</TableCell>
									<TableCell align="right">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{mapArray(storages, (storage) => (
									<TableRow
										onClick={() => navigate(`/storages/${storage.id}/files`)}
										sx={{
											cursor: 'pointer',
											'&:last-child td, &:last-child th': { border: 0 },
										}}
									>
										<TableCell component="th" scope="row">
											{storage.name}
										</TableCell>
										<TableCell>{storage.chat_id}</TableCell>
										<TableCell>{convertSize(storage.size)}</TableCell>
										<TableCell>{storage.files_amount}</TableCell>
										<TableCell align="right">
											<Button
												color="warning"
												onClick={(e) => {
													e.stopPropagation()
													setStorageToDelete(storage)
												}}
											>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Show>
					</Table>
				</TableContainer>
			</Grid>

			<ActionConfirmDialog
				isOpened={!!storageToDelete()}
				entity="storage"
				action="Delete"
				actionDescription={`delete storage "${storageToDelete()?.name || ''}"`}
				onCancel={() => setStorageToDelete(null)}
				onConfirm={removeStorage}
			/>
		</Stack>
	)
}

export default Storages
