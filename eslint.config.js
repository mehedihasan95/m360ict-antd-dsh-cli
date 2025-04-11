import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: { js },
		extends: [
			'js/recommended',
			'eslint:recommended',
			'plugin:prettier/recommended',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
		rules: {
			'prettier/prettier': 'error',
		},
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
]);
