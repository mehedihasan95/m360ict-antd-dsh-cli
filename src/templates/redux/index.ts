// src/utilities/reduxSetup.js
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import { copyDir } from '../../utilities/fileUtils.js';

/**
 * Installs and sets up Redux in the project
 * @param {string} projectPath - Path to the project directory
 * @param {string} dependencyManager - Package manager to use (npm, yarn, pnpm)
 * @param {string} templatesPath - Path to templates directory
 */
export async function setupRedux(
	projectPath: string,
	dependencyManager: 'npm' | 'yarn' | 'pnpm',
	templatesPath: string,
) {
	console.log(chalk.cyan('\n🔧 Installing Redux Toolkit...'));

	const installCommands = {
		npm: ['install', '@reduxjs/toolkit', 'react-redux'],
		yarn: ['add', '@reduxjs/toolkit', 'react-redux'],
		pnpm: ['add', '@reduxjs/toolkit', 'react-redux'],
	};

	await execa(dependencyManager, installCommands[dependencyManager], {
		stdio: 'inherit',
	});

	// Copy Redux boilerplate files
	console.log(chalk.cyan('\n📁 Copying Redux Toolkit structure...'));
	const reduxTemplatePath = path.join(templatesPath, 'redux');
	const targetReduxPath = path.join(projectPath, 'src', 'redux');

	await copyDir(reduxTemplatePath, targetReduxPath);

	console.log(chalk.green('\n✅ Redux setup complete!'));
}
