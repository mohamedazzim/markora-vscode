$ErrorActionPreference = 'Stop'
npm run verify
${package} = Get-Content package.json -Raw | ConvertFrom-Json
if ([string]${package}.publisher -notmatch '^<.*>$') {
  npx @vscode/vsce ls
} else {
  Write-Host '[INFO] VSIX file listing is deferred until a real Marketplace publisher ID is configured.'
}
Write-Host 'Verification complete.'
