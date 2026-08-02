import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const clientDir = path.resolve(process.cwd(), 'dist/client');
const headersPath = path.join(clientDir, '_headers');

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(full)));
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

const scriptTagRe = /<script([^>]*)>([\s\S]*?)<\/script>/gi;

function isExecutable(attrs) {
	if (/\bsrc\s*=/.test(attrs)) return false;
	const typeMatch = attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i);
	if (!typeMatch) return true;
	const type = typeMatch[1].toLowerCase();
	return type === 'module' || type === 'text/javascript' || type === 'application/javascript';
}

const hashes = new Set();

const htmlFiles = await walk(clientDir);
for (const file of htmlFiles) {
	const html = await readFile(file, 'utf-8');
	for (const match of html.matchAll(scriptTagRe)) {
		const [, attrs, content] = match;
		if (!content.trim() || !isExecutable(attrs)) continue;
		const hash = createHash('sha256').update(content, 'utf-8').digest('base64');
		hashes.add(`'sha256-${hash}'`);
	}
}

let headers = await readFile(headersPath, 'utf-8');
if (!headers.includes(' __CSP_SCRIPT_HASHES__')) {
	throw new Error('_headers is missing the __CSP_SCRIPT_HASHES__ placeholder');
}
const hashList = [...hashes].join(' ');
headers = headers.replace(' __CSP_SCRIPT_HASHES__', hashList ? ` ${hashList}` : '');
await writeFile(headersPath, headers);

console.log(`Injected ${hashes.size} CSP script hash(es) into dist/client/_headers`);
