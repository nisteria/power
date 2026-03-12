param(
  [int]$Lines = 40,
  [int]$RefreshSeconds = 5
)

$logFile = Join-Path $PSScriptRoot "..\POWER_AGENT_ACTIVITY.md"
$logFile = (Resolve-Path $logFile).Path

Write-Host "Watching: $logFile" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray

while ($true) {
  Clear-Host
  Write-Host "Power Agent Live Monitor — $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
  Write-Host "" 
  if (Test-Path $logFile) {
    Get-Content $logFile -Tail $Lines
  } else {
    Write-Host "No activity file yet." -ForegroundColor Yellow
  }
  Start-Sleep -Seconds $RefreshSeconds
}
