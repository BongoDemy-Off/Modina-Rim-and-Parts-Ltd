$ErrorActionPreference = 'Continue'
$script:receipts = @()
function Invoke-BatchCheck {
  param([string]$Name, [scriptblock]$Command)
  $logPath = "docs/audits/evidence/batch-2b/$Name.txt"
  $started = [DateTime]::UtcNow.ToString('o')
  & $Command *> $logPath
  $code = $LASTEXITCODE
  $script:receipts += [pscustomobject]@{ name = $Name; exitCode = $code; started = $started; finished = [DateTime]::UtcNow.ToString('o') }
  $script:receipts | ConvertTo-Json | Set-Content docs/audits/evidence/batch-2b/command-results.json
  Write-Output "$Name EXIT=$code"
  if ($code -ne 0) { Get-Content -LiteralPath $logPath -Tail 15 }
}
$env:QA_ROUTES = $null
$env:QA_WIDTHS = $null
$env:QA_LANGS = $null
$env:QA_CAPTURE_ALL = $null
$env:BATCH2A_DIST = $null
$env:BATCH2A_PORT = $null
Invoke-BatchCheck 'typecheck-final' { npm.cmd run lint }
if ($script:receipts[-1].exitCode -ne 0) { exit 1 }
Invoke-BatchCheck 'build-final' { npm.cmd run build }
if ($script:receipts[-1].exitCode -ne 0) { exit 1 }
$env:QA_URL = 'http://127.0.0.1:4191'
$env:BATCH_1A_URL = 'http://127.0.0.1:4191'
$env:BATCH_1A_RESULT = 'production-regression-results.json'
$env:ACCEPTANCE_RUN_NAME = 'production-regression-owned'
Invoke-BatchCheck 'production-regression-run' { node docs/audits/evidence/batch-2b/run-owned.cjs }
foreach ($suite in @('lifecycle', 'race', 'touch', 'a11y')) {
  Invoke-BatchCheck "$suite-final-run" { node docs/audits/evidence/batch-2b/run-isolated.cjs $suite }
}
$env:QA_RUN = 'production-query'
$env:ACCEPTANCE_RUN_NAME = 'production-query-owned'
Invoke-BatchCheck 'production-query-run' { node docs/audits/evidence/batch-2b/run-checks.cjs query }
$env:ACCEPTANCE_RUN_NAME = 'production-sweep-owned'
Invoke-BatchCheck 'production-sweep-run' { node docs/audits/evidence/batch-2b/run-sweep.cjs }
Invoke-BatchCheck 'diff-check-final' { git diff --check }
Invoke-BatchCheck 'preservation-final' { node docs/audits/evidence/batch-2b/preservation.cjs }
if (@($script:receipts | Where-Object exitCode -ne 0).Count) { exit 1 }
