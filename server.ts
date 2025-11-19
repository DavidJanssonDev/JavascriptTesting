/**
 * A lightweight static filer server for development.
 * Servers HTML, CSS, and compiled JS from /src and /dist.
 * 
 * No external dependencies are required.
 */

import http from "node:http";
import fs from "node:fs";
import { Server } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Server Node http Response type
 */
type ServerResponseType = http.ServerResponse<http.IncomingMessage>


/**
 * Server Node http Request Type
 */
type ServerRequestType = http.IncomingMessage


/**
 * Server Node http Server Type
 */
type ServerType = Server<typeof http.IncomingMessage, typeof http.ServerResponse>


/**
 * The root folder of the project (not just dist/)
 */

const projectRoot: string = path.join(__dirname, "..");

/** Port where the dev server will run */
const port: number = 4173;

/**Simple mapping from rifle extenstions to MIME types */
const mimeTypes: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
};



/**
 * Simple HTTP server for local develpoment.
 * Reads the requestd file from disk and serves it to the browser.
 */

const server: ServerType = http.createServer((req: ServerRequestType, res: ServerResponseType) => {
	// default to index.html
	const rawPath: string = req.url === "/" ? "/src/index.html" : req.url ?? "/src/index.html";

	// strip query string
	const [urlPath] = rawPath.split("?");

	// IMPORTANT: strip leading "/" so path.join works equally on Windows and Unix
	const relativePath: string = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;

	// build absolute path under project root
	const filePath: string = path.normalize(path.join(projectRoot, relativePath));

	// security: prevent escaping project root
	if (!filePath.startsWith(projectRoot)) {
		res.writeHead(403);
		res.end("Forbidden");
		return;
	}

	fs.readFile(filePath, (err: NodeJS.ErrnoException | null, data: Buffer<ArrayBuffer>) => {
		if (err) {
			res.writeHead(404);
			res.end("Not found");
			return;
		}

		const ext = path.extname(filePath);
		const contentType = mimeTypes[ext] ?? "application/octet-stream";

		res.writeHead(200, { "Content-Type": contentType });
		res.end(data);
	});
});

server.listen(port, () => {
	console.log(`Dev server running at http://127.0.0.1:${port}`);
});