import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        ...(process.env.VITE_WEB_ONLY === 'true' ? [] : [
            electron([
                {
                    // Main-Process entry point of the Electron App
                    entry: 'electron/main.ts',
                },
                {
                    entry: 'electron/preload.ts',
                    onstart(options) {
                        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
                        // instead of restarting the entire Electron App.
                        options.reload()
                    },
                },
            ]),
            renderer(),
        ]),
    ],
    resolve: {
        alias: {
            // Alias @ to the src directory
            '@': path.resolve(__dirname, './src'),
        },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
})

