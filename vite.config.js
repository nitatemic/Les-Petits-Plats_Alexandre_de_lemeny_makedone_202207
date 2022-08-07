const path = require('path')
import {defineConfig} from'vite'
import mkcert from'vite-plugin-mkcert'

export default defineConfig({
	root: path.resolve(__dirname, 'src'),
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
		}
	},
	server: {
		port: 8080,
		hot: true,
		https : true
	},
	plugins: [mkcert()],
	//Config Vite to build in ./dist/ folder
	build: {
		outDir: '../dist'
	}
});
