$ErrorActionPreference = 'Stop'
npm run package:vsix
Get-Content release\SHA256SUMS.txt
Get-Content release\release-manifest.json
