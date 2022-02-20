import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default {
  plugins: [vue(), ssr(),viteCommonjs()],
}
