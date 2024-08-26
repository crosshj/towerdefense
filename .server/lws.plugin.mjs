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

class Plugin {
	middleware() {
		return async (ctx, next) => {
			const { request } = ctx;
			console.log(`${request.method}: ${request.path}`);

			if (request.path === '/sw.js') {
				return sendModdedServiceWorker(ctx);
			}

			await next();
		};
	}
}

export default Plugin;
