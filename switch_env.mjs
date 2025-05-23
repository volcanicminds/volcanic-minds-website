import { copyFile, appendFile, existsSync, readFileSync } from 'fs'

// Copy correct .env
let src = ''
if (process.env.NODE_ENV === 'production') {
	console.log('Moving .env_production to .env...')
	src = '.env_production'
} else {
	console.log('Moving .env_development to .env...')
	src = '.env_development'
}

// Copy base file
copyFile(src, '.env', (error) => {
	if (error) {
		console.error('❌ Error copying env file:', error)
		return
	}
	console.log('✅ Copied base .env successfully')

	// .env_secret append
	const secretPath = '.env_secret'
	if (existsSync(secretPath)) {
		const secretEnv = readFileSync(secretPath, 'utf-8')
		appendFile('.env', `\n${secretEnv}`, (appendErr) => {
			if (appendErr) {
				console.error('❌ Error appending secret:', appendErr)
			} else {
				console.log('🔐 Appended secrets from .env_secret')
			}
		})
	} else {
		console.warn('⚠️  .env_secret not found, skipping secret injection')
	}
})
