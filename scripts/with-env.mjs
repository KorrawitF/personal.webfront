/**
 * Runs a CLI with the `.env*` files already loaded into `process.env`.
 *
 * Next loads those files itself, but only once the HTTP server is up — so `PORT`
 * set in `.env.local` is read too late to have any effect, and Storybook does not
 * read them at all. This wrapper loads them first, then hands the port to the CLI
 * on the command line, where both tools accept it.
 *
 *   node scripts/with-env.mjs PORT next dev
 *   node scripts/with-env.mjs STORYBOOK_PORT storybook dev
 *
 * The first argument names the variable holding the port; the rest is the command.
 * A port already exported in the shell still wins, per the usual load order.
 */
import { spawn } from 'node:child_process';
// @next/env is CommonJS, so it arrives as a default export rather than named ones.
import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;

const [variable, command, ...args] = process.argv.slice(2);

if (!variable || !command) {
    console.error('usage: node scripts/with-env.mjs <PORT_VARIABLE> <command> [...args]');
    process.exit(1);
}

// The same loader, and so the same file order, that `next dev` uses at boot.
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

const configured = process.env[variable]?.trim();
const port = configured && /^\d+$/.test(configured) ? configured : undefined;

if (configured && !port) {
    console.warn(`[with-env] ignoring ${variable}="${configured}": not a port number.`);
}

// `-p` is the flag both `next` and `storybook` take. Both CLIs require it to
// come after the subcommand (`next dev -p 3000`, not `next -p 3000 dev`) --
// leading with the flag makes `next` treat the subcommand as a directory.
const argv = [command, ...args, ...(port ? ['-p', port] : [])];

/**
 * The CLI lives in `node_modules/.bin`, which on Windows means a `.cmd` shim that
 * Node will only run through a shell. Passing the whole line as one string keeps
 * the arguments out of `spawn`'s own escaping, which is what it deprecates.
 */
function quote(value) {
    return /^[\w.@:=/\-]+$/.test(value) ? value : `"${value.replaceAll('"', '\\"')}"`;
}

const child = spawn(argv.map(quote).join(' '), { stdio: 'inherit', shell: true });

child.on('exit', (code, signal) => process.exit(signal ? 1 : code ?? 0));
child.on('error', (error) => {
    console.error(`[with-env] could not start ${command}:`, error.message);
    process.exit(1);
});
