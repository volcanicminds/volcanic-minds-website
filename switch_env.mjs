import { copyFile } from 'fs'

// Copy correct .env
let src = ''
if (process.env.NODE_ENV === 'production') {
	console.log('Moving .env_production to .env...')
	src = '.env_production'
} else {
	console.log('Moving .env_development to .env...')
	src = '.env_development'
}
copyFile(src, '.env', (error) => {
	if (error) {
		console.error(error)
		return
	}

	console.log('Copied Successfully!\n')
})
