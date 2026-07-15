import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const releaseDir = path.resolve('release');
const fileName = `${packageJson.name}-${packageJson.version}.vsix`;
const vsixPath = path.join(releaseDir, fileName);

mkdirSync(releaseDir, { recursive: true });
if (existsSync(vsixPath)) rmSync(vsixPath, { force: true });

const vsceEntrypoint = path.resolve('node_modules', '@vscode', 'vsce', 'vsce');
const result = spawnSync(
  process.execPath,
  [vsceEntrypoint, 'package', '--no-dependencies', '--out', vsixPath],
  {
    stdio: 'inherit',
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const hash = createHash('sha256').update(readFileSync(vsixPath)).digest('hex');
writeFileSync(path.join(releaseDir, 'SHA256SUMS.txt'), `${hash}  ${fileName}\n`, 'utf8');

let commit = null;
const git = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' });
if (git.status === 0) commit = git.stdout.trim();
const stat = statSync(vsixPath);
const manifest = {
  name: packageJson.name,
  displayName: packageJson.displayName,
  publisher: packageJson.publisher,
  extensionId: `${packageJson.publisher}.${packageJson.name}`,
  version: packageJson.version,
  repository: packageJson.repository?.url ?? null,
  vsix: { file: fileName, bytes: stat.size, sha256: hash },
  gitCommit: commit,
  generatedAt: new Date().toISOString(),
};
writeFileSync(
  path.join(releaseDir, 'release-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);
console.log(`VSIX: ${vsixPath}`);
console.log(`SHA-256: ${hash}`);
