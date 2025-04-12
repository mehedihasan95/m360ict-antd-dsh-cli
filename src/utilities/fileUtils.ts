// src/utilities/fileUtils.js
import fs from 'fs/promises';
import path from 'path';

/**
 * Recursively copies a directory and its contents
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
export async function copyDir(src: string, dest: string) {
	// Create the target directory if it doesn't exist
	await fs.mkdir(dest, { recursive: true });

	const entries = await fs.readdir(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await fs.mkdir(destPath, { recursive: true });
			await copyDir(srcPath, destPath);
		} else {
			await fs.copyFile(srcPath, destPath);
		}
	}
}
