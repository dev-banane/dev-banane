import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

export default defineConfigWithVueTs(
	{
		name: 'app/ignores',
		ignores: ['**/dist/**', '**/node_modules/**'],
	},
	{
		name: 'app/vue-ts',
		files: ['src/**/*.{ts,vue}', 'vite.config.ts'],
	},
	pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	skipFormatting,
	{
		name: 'app/server',
		files: ['server/**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.node,
		},
		rules: js.configs.recommended.rules,
	}
)
