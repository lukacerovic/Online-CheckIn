import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {  // svaki put kad adresa vidi /api racuna port 3000 
        target: 'http://localhost:3000',
        secure: false,
      
      },
    },
  },
  plugins: [react()],
})
