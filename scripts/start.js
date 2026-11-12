// Lanceur Electron :
// - retire ELECTRON_RUN_AS_NODE (hérité de VS Code / outils basés sur Electron),
//   qui ferait tourner Electron comme un simple Node (app === undefined) ;
// - force GTK 3 sous Linux (Electron 36 crashe si GTK 3 et GTK 4 sont chargés ensemble).
const { spawn } = require('child_process');
const path = require('path');
const electronPath = require('electron'); // hors Electron, renvoie le chemin du binaire

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const args = ['.', ...process.argv.slice(2)];
if (process.platform === 'linux') args.push('--gtk-version=3');

const child = spawn(electronPath, args, {
  cwd: path.join(__dirname, '..'),
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => child.kill(sig));
}
