import path from 'node:path';
import { defineConfig } from 'vite';
import jsonServer from 'vite-plugin-simple-json-server';
import Vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import Pages from 'vite-plugin-pages';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, ``)}/`,
      '~/': `${path.resolve(__dirname, `src`)}/`,
    },
  },

  plugins: [
    jsonServer({ disable: mode === `test` }),

    Vue({
      include: [/\.vue$/],
      reactivityTransform: false,
    }),

    vuetify({ autoImport: false }),

    Pages({ extensions: [`vue`] }),

    AutoImport({
      imports: [
        `vue`,
        `vue-router`,
        `vitest`,
        {
          '@tanstack/vue-query': [`useQuery`, `useMutation`, `useQueryClient`],
        },
      ],
      dts: `src/auto-imports.d.ts`,
    }),

    Components({
      dts: `src/components.d.ts`,
      directoryAsNamespace: true,
      types: [{
        from: `vue-router`,
        names: [`RouterLink`, `RouterView`],
      }],
      exclude: [/vuetify/] // empêche le plugin de toucher Vuetify qui bloque l'import des components
    }),

    Unocss(),
  ],

  test: {
    include: [`**/*.spec.ts`],
    environment: `happy-dom`,
    deps: {
      inline: [`@vue`, `@vueuse`, `vuetify`, `loglevel`],
    },
    globals: true,
    setupFiles: [
      `./test-setup/global.js`,
      `./test-setup/vue-plugins.ts`,
      `./test-setup/mock-router.ts`,
      `./test-setup/auto-unmount.ts`,
    ],
  },
}));
