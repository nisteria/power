param(
  [string]$TaskName = "PowerDesktopMonitor"
)

$scriptPath = Join-Path $PSScriptRoot 'power-desktop-monitor.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description "Starts Power Desktop Monitor (always-on dashboard + watchdog)" -Force | Out-Null
Write-Host "Scheduled Task '$TaskName' erstellt/aktualisiert." -ForegroundColor Green
Write-Host "Starte sie jetzt mit: Start-ScheduledTask -TaskName $TaskName"
