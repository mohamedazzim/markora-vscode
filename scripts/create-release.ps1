param([Parameter(Mandatory=$true)][string]$Version)
$ErrorActionPreference = 'Stop'
npm run verify
npm run package:vsix
git tag -a "v$Version" -m "Markora for VS Code v$Version"
Write-Host "Created local tag v$Version. Push only after reviewing the release and authenticating GitHub."
