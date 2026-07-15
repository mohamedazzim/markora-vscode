$ErrorActionPreference = 'Stop'
Write-Host 'Installing Markora VS Code development dependencies...'
npm ci
npm run typecheck
Write-Host 'Setup complete.'
