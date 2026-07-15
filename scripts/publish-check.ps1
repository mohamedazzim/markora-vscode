[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$failures = 0
function Pass($message) { Write-Host "[PASS] $message" -ForegroundColor Green }
function Fail($message) { $script:failures++; Write-Host "[FAIL] $message" -ForegroundColor Red }
$package = Get-Content package.json -Raw | ConvertFrom-Json
if ($package.version -notmatch '^\d+\.\d+\.\d+$') { Fail 'Version is not semver.' } else { Pass "Version $($package.version)" }
if ([string]$package.publisher -match '^<.*>$') { Fail 'Marketplace publisher is still a placeholder.' } else { Pass 'Publisher field is configured.' }
if ([string]$package.repository.url -match '<GITHUB_OWNER>|<MARKETPLACE_PUBLISHER_ID>') { Fail 'Repository metadata still contains a placeholder owner.' } else { Pass 'Repository metadata is configured.' }
foreach ($file in @('LICENSE','README.md','CHANGELOG.md','SECURITY.md','PRIVACY.md','THIRD_PARTY_NOTICES.md')) { if (Test-Path $file) { Pass "$file exists" } else { Fail "$file is missing" } }
$changelog = Get-Content CHANGELOG.md -Raw
if ($changelog -match [regex]::Escape($package.version)) { Pass 'Changelog contains the package version.' } else { Fail 'Changelog does not contain the package version.' }
$secretPatterns = 'AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|-----BEGIN (RSA|OPENSSH|EC) PRIVATE KEY-----|password\s*='
$scanFiles = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\|\\dist\\|\.vsix$|\\.git\\' }
foreach ($file in $scanFiles) { if ((Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue) -match $secretPatterns) { Fail "Possible secret in $($file.FullName)" } }
$privatePaths = 'C:\\Users\\|C:\\Markdown_Project'
foreach ($file in $scanFiles) { if ((Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue) -match $privatePaths) { Fail "Absolute local path in $($file.FullName)" } }
if (Test-Path dist) { Pass 'Build output exists.' } else { Fail 'dist is missing; run npm run build.' }
$oversized = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\.git\\' -and $_.Length -gt 10MB }
if ($oversized) { foreach ($file in $oversized) { Fail "Oversized source asset: $($file.FullName)" } } else { Pass 'No oversized source assets.' }
if ($failures) { throw "$failures publish-check failure(s)." }
Write-Host 'Publish checks passed.'
