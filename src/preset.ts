import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import type { StorybookConfig } from '@storybook/builder-vite';
import { hasVitePlugins } from '@storybook/builder-vite';
import { mergeConfig, PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const core: StorybookConfig['core'] = {
  builder: '@storybook/builder-vite',
  renderer: '@storybook/html',
};

export const viteFinal: StorybookConfig['viteFinal'] = async (
  defaultConfig
) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: 'es2020',
      rollupOptions: {
        external: ['@qwik-city-plan'],
      },
    },
  });

  config.plugins = config.plugins ?? [];
  const plugins: PluginOption[] = config.plugins;

  // Add qwik plugins if not present
  if (!(await hasVitePlugins(plugins, ['vite-plugin-qwik-city']))) {
    plugins.push(qwikCity());
  }

  if (!(await hasVitePlugins(plugins, ['vite-plugin-qwik']))) {
    plugins.push(qwikVite());
  }

  if (!(await hasVitePlugins(plugins, ['vite-tsconfig-paths']))) {
    plugins.push(tsconfigPaths());
  }

  return config;
};
