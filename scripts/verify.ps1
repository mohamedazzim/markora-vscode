$ErrorActionPreference = 'Stop'
npm run verify
${package} = Get-Content package.json -Raw | ConvertFrom-Json
npx @vscode/vsce ls
Write-Host 'Verification complete.'
