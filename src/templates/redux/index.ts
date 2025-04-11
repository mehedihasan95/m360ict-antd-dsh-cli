import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';

export async function setupReduxToolkit(
	applicationName: string,
	dependencyManager: string,
) {
	const projectPath = path.join(process.cwd(), applicationName);
	const packages = ['@reduxjs/toolkit', 'react-redux'];
	const command =
		dependencyManager === 'npm' ? ['install', ...packages]
		: dependencyManager === 'pnpm' ? ['add', ...packages]
		: ['add', ...packages];

	await execa(dependencyManager, command, {
		cwd: projectPath,
		stdio: 'inherit',
	});

	await createReduxStructure(projectPath);
}

async function createReduxStructure(projectPath: string) {
	const reduxDir = path.join(projectPath, 'src', 'redux');
	const apiDir = path.join(reduxDir, 'api');
	const sliceDir = path.join(reduxDir, 'slice');
	const utilitiesDir = path.join(reduxDir, 'utilities');

	// Create directories
	await fs.mkdir(apiDir, { recursive: true });
	await fs.mkdir(sliceDir, { recursive: true });
	await fs.mkdir(utilitiesDir, { recursive: true });

	// Write placeholder files if needed
	await fs.writeFile(path.join(reduxDir, 'store.ts'), '// store setup here');
	await fs.writeFile(
		path.join(reduxDir, 'index.ts'),
		'// combine & export store here',
	);
	await fs.writeFile(path.join(apiDir, 'api.ts'), '// api logic here');
	await fs.writeFile(
		path.join(sliceDir, 'authSlice.ts'),
		'// slice setup here',
	);
	await fs.writeFile(
		path.join(utilitiesDir, 'baseQuery.ts'),
		'// baseQuery logic here',
	);
	await fs.writeFile(
		path.join(utilitiesDir, 'response.ts'),
		'// response helpers',
	);
	await fs.writeFile(path.join(utilitiesDir, 'tags.ts'), '// tags here');
}
