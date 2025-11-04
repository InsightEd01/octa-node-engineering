import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from './' for Vercel deployment
  publicDir: 'public', // Ensure public directory is copied to dist
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true, // Explicitly copy public directory
    
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // UI components chunk
          ui: ['react-slick', 'react-helmet-async'],
          
          // Admin chunk (separate from main app)
          admin: [
            'src/admin/AdminRouter.tsx',
            'src/admin/components/AdminLayout.tsx',
            'src/admin/pages/LoginPage.tsx'
          ]
        },
        
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    
    // Optimize build performance
    // target: 'esnext', // Removed for Vercel compatibility
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Source maps for debugging
    sourcemap: false // Disable in production for smaller builds
  },
  
  // Development server optimization
  server: {
    hmr: {
      overlay: false // Disable error overlay for better development experience
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet-async',
      'react-slick'
    ]
  }
})
