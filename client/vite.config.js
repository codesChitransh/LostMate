import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/server':{
        target:"http://localhost:4010",
        secure:false
      }
    }
  }
})
