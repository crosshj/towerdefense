import * as fs from 'fs';
import * as childProcess from 'child_process';

const sendModdedServiceWorker = (ctx) => {
	ctx.set('Content-Type', 'application/javascript; charset=utf-8');
	const serviceWorkerFileBody = fs.readFileSync('sw.js');
	const revision = childProcess
		.execSync('git rev-parse HEAD')
		.toString()
		.trim();
	const modified = serviceWorkerFileBody
		.toString()
		.replace('{GIT_COMMIT_HASH}', revision);
	ctx.body = modified;
	return;
};

const sendModdedDepends = (ctx) => {
	ctx.set('Content-Type', 'application/javascript; charset=utf-8');
	const modified = `
const getDepends = () => ({});
export default getDepends;

export const getDependsMeta = () => ({
  generatedAt: '${new Date().toISOString()}',
  filesLength: 0,
  hash: '${new Date().toISOString()}'
});
	`.trim();
	ctx.body = modified;
	return;
};

class Plugin {
	middleware() {
		return async (ctx, next) => {
			const { request } = ctx;
			console.log(`${request.method}: ${request.path}`);

			if (request.path === '/sw.js') {
				return sendModdedServiceWorker(ctx);
			}

			if (request.path === '/$data/__depends.js') {
				return sendModdedDepends(ctx);
			}

			await next();
		};
	}
}

export default Plugin;
