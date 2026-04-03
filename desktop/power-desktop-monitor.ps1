param(
  [int]$Port = 4177,
  [string]$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)

$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
$dashboardDir = Join-Path $root 'dashboard'
$serverScript = Join-Path $dashboardDir 'server.js'
$url = "http://localhost:$Port"

# Single-instance guard
$mutexName = 'Global\PowerDesktopMonitorSingleton'
$createdNew = $false
$mutex = New-Object System.Threading.Mutex($true, $mutexName, [ref]$createdNew)
if (-not $createdNew) {
  Write-Host 'Power Desktop Monitor läuft bereits. Beende zweiten Start.' -ForegroundColor Yellow
  exit 0
}

function Ensure-ServerRunning {
  $running = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -match 'node(.exe)?' -and $_.CommandLine -match [regex]::Escape($serverScript)
  }

  if (-not $running) {
    Start-Process -FilePath 'node' -ArgumentList "`"$serverScript`"" -WorkingDirectory $dashboardDir -WindowStyle Hidden | Out-Null
    Start-Sleep -Seconds 2
  }
}

function OpenDesktopWindowOnce {
  # Accept any Chrome process already showing localhost dashboard (tab or app mode)
  $existing = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -match 'chrome(.exe)?' -and $_.CommandLine -match [regex]::Escape("localhost:$Port")
  }

  if (-not $existing) {
    $appArg = "--app=$url"
    if (Test-Path $ChromePath) {
      Start-Process -FilePath $ChromePath -ArgumentList $appArg | Out-Null
    } else {
      Start-Process $url | Out-Null
    }
  }
}

try {
  Write-Host "Power Desktop Monitor gestartet. Ctrl+C zum Beenden." -ForegroundColor Green
  Ensure-ServerRunning
  OpenDesktopWindowOnce

  while ($true) {
    Ensure-ServerRunning
    Start-Sleep -Seconds 5
  }
}
finally {
  if ($mutex) {
    $mutex.ReleaseMutex() | Out-Null
    $mutex.Dispose()
  }
}
