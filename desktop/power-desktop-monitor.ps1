param(
  [int]$Port = 4177,
  [string]$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)

$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
$dashboardDir = Join-Path $root 'dashboard'
$serverScript = Join-Path $dashboardDir 'server.js'
$url = "http://localhost:$Port"

function Ensure-ServerRunning {
  $running = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -match 'node(.exe)?' -and $_.CommandLine -match [regex]::Escape($serverScript)
  }

  if (-not $running) {
    Start-Process -FilePath 'node' -ArgumentList "`"$serverScript`"" -WorkingDirectory $dashboardDir -WindowStyle Hidden | Out-Null
    Start-Sleep -Seconds 2
  }
}

function Ensure-DesktopWindow {
  $appArg = "--app=$url"
  $win = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -match 'chrome(.exe)?' -and $_.CommandLine -match [regex]::Escape($appArg)
  }

  if (-not $win) {
    if (Test-Path $ChromePath) {
      Start-Process -FilePath $ChromePath -ArgumentList $appArg | Out-Null
    } else {
      Start-Process $url | Out-Null
    }
  }
}

Write-Host "Power Desktop Monitor gestartet. Ctrl+C zum Beenden." -ForegroundColor Green
while ($true) {
  Ensure-ServerRunning
  Ensure-DesktopWindow
  Start-Sleep -Seconds 5
}
