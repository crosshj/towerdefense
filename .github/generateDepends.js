/*
 This script generates a dependency list from the specified directories. The dependency list enables caching of all dependencies by the service worker.

 This should be ran every time a significant change is made to the project, such as adding or removing files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_FILE_HASH_LENGTH = 16;
const DEPENDS_FILE_PATH = '$data/__depends.js';

const directories = [
	'$data',
	'assets',
	'modals',
	'pages',
	'serviceWorker',
	'stages',
	'user',
	'utils',
	'visuals',
	'vendor',
];
const exceptions = [
	'.DS_Store',
	'.gitkeep',
	'*.psd',
	'*.kra',
	'*.clip',
	'*.bak.png',
	'*.md',
	//
];
const dirSubstitutions = {
	'assets/character/FighterBase': '$F_BASE$',
	'assets/character/base_fighter': '$BASE_F$',
};

const isException = (file) => {
	return exceptions.some((exception) => {
		if (exception.includes('*')) {
			const regex = new RegExp(exception.replace('*', '.*'));
			return regex.test(file);
		}
		return file.includes(exception);
	});
};

const readDirectoryRecursively = (dirPath) =>
	fs.readdirSync(dirPath).reduce((results, file) => {
		const filePath = path.join(dirPath, file);
		const stat = fs.statSync(filePath);
		if (isException(file)) {
			return results;
		}
		return stat && stat.isDirectory()
			? results.concat(readDirectoryRecursively(filePath))
			: results.concat(path.relative(__dirname, filePath));
	}, []);

const getAllFilesFromDirectories = (dirs) =>
	dirs.flatMap((dir) => {
		const fullPath = path.join(__dirname, '../', dir);
		return fs.existsSync(fullPath)
			? readDirectoryRecursively(fullPath)
			: (console.log(`Directory ${dir} does not exist.`), []);
	});

const allFiles = getAllFilesFromDirectories(directories);

const calculateFileHash = (filePath, hashLength = DEFAULT_FILE_HASH_LENGTH) => {
	const fileBuffer = fs.readFileSync(filePath);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);
	const fullHash = hashSum.digest('hex');
	return hashLength ? fullHash.slice(0, hashLength) : fullHash;
};

const substituteDirectory = (file) => {
	for (const [dir, substitution] of Object.entries(dirSubstitutions)) {
		if (file.startsWith(dir)) {
			return file.replace(dir, substitution);
		}
	}
	return file;
};

const fileHashes = allFiles.reduce((acc, file) => {
	const fileKey = file.replace('../', '');
	const substitutedFile = substituteDirectory(fileKey);
	acc[substitutedFile] = calculateFileHash(path.join(__dirname, file));
	acc[substitutedFile] = calculateFileHash(path.join(__dirname, file));
	return acc;
}, {});

const outputFilePath = path.join(__dirname, '../', DEPENDS_FILE_PATH);
const generatedAt = new Date().toISOString();
const DEPENDS_HASH = crypto
	.createHash('sha256')
	.update(JSON.stringify(fileHashes))
	.digest('hex');
const dependsContents = `
/* 
This file is auto-generated; do not edit manually.
To regenerate, run 'node generateDepends.js'.
Generated at: ${generatedAt}
*/

const getDepends = () => {
  const reconstituteDirectory = (file) => {
    for (const [dir, substitution] of Object.entries(dirSubstitutions)) {
      if (file.startsWith(substitution)) {
        return file.replace(substitution, dir);
      }
    }
    return file;
  };
  const reconstitutedHashes = {};
  for (const [key, value] of Object.entries(fileHashes)) {
    const originalPath = reconstituteDirectory(key);
    reconstitutedHashes[originalPath] = value;
  }
  return reconstitutedHashes;
};
export default getDepends;

export const getDependsMeta = () => ({
  generatedAt: '${generatedAt}',
  filesLength: ${Object.keys(fileHashes).length},
  hash: '${DEPENDS_HASH}'
});

const dirSubstitutions = ${JSON.stringify(dirSubstitutions, null, 2)};

const fileHashes = ${JSON.stringify(fileHashes, null, 2)};
`.trim();

fs.writeFileSync(outputFilePath, dependsContents, 'utf-8');
console.log(`File hashes written to ${DEPENDS_FILE_PATH}\n`);
