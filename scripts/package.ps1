$ErrorActionPreference = 'Stop'
npm run package:vsix
$vsix = Get-ChildItem -Filter '*.vsix' | Select-Object -First 1
Get-FileHash $vsix -Algorithm SHA256
