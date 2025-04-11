#!/usr/bin/env node

import chalk from 'chalk';
import { execa } from 'execa';
import prompts from 'prompts';

async function initializeProject() {
	console.log(
		chalk.cyan(
			'🚀 Welcome to React + TypeScript + Vite Starter - Professional Development Environment',
		),
	);

	const { applicationName } = await prompts({
		type: 'text',
		name: 'applicationName',
		message: 'Enter application name:',
		initial: 'react-ts-vite-app',
		validate: (value) =>
			value.trim().length > 0 ? true : '⚠️ Application name is required',
	});

	const { dependencyManager } = (await prompts({
		type: 'select',
		name: 'dependencyManager',
		message: 'Select dependency manager:',
		choices: [
			{ title: 'NPM', value: 'npm', description: 'Node Package Manager' },
			{
				title: 'Yarn',
				value: 'yarn',
				description: 'Fast, reliable, and secure dependency management',
			},
			{
				title: 'PNPM',
				value: 'pnpm',
				description: 'Fast, disk space efficient package manager',
			},
		],
		initial: 0,
	})) as { dependencyManager: 'npm' | 'yarn' | 'pnpm' };

	console.log(
		chalk.blueBright(
			`\n⚡ Initializing React+TypeScript application with Vite using ${dependencyManager}...\n`,
		),
	);

	// Create command and args based on dependency manager with TypeScript template
	const createCommands = {
		npm: [
			'create',
			'vite@latest',
			applicationName,
			'--',
			'--template',
			'react-ts',
		],
		yarn: ['create', 'vite', applicationName, '--template', 'react-ts'],
		pnpm: ['create', 'vite', applicationName, '--template', 'react-ts'],
	};

	try {
		await execa(dependencyManager, createCommands[dependencyManager], {
			stdio: 'inherit',
		});

		console.log(chalk.greenBright(`\n✅ Project setup complete!\n`));
		console.log(chalk.yellow(`📂 Next steps:`));
		console.log(chalk.blueBright(`  cd ${applicationName}`));

		// Command mappings for different managers
		const nextCommands = {
			npm: ['npm install', 'npm run dev'],
			yarn: ['yarn', 'yarn dev'],
			pnpm: ['pnpm install', 'pnpm dev'],
		};

		nextCommands[dependencyManager].forEach((cmd) => {
			console.log(chalk.blue(cmd));
		});
	} catch (error) {
		console.error(chalk.red('Error during project initialization:'), error);
		process.exit(1);
	}
}
// Add signal handlers for graceful termination
process.on('SIGINT', () => {
	console.log(chalk.yellow('\nProcess interrupted. Exiting...'));
	process.exit(0);
});

initializeProject().catch((error) => {
	console.error(chalk.red('Error during project initialization:'), error);
	process.exit(1);
});
