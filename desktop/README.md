# Power Desktop Variante (Always-On)

## Starten (manuell)
```powershell
cd C:\Users\lechd\OneDrive\Dokumente\GitHub\power\desktop
.\start-power-desktop-monitor.cmd
```

## Was sie macht
- Hält den Dashboard-Server (`dashboard/server.js`) dauerhaft am Leben.
- Öffnet eine dedizierte Desktop-App-Ansicht in Chrome (`--app=http://localhost:4177`).
- Prüft alle 5 Sekunden und startet Server/Fenster bei Bedarf neu.

## Autostart beim Login (permanent)
```powershell
cd C:\Users\lechd\OneDrive\Dokumente\GitHub\power\desktop
powershell -ExecutionPolicy Bypass -File .\install-autostart-task.ps1
Start-ScheduledTask -TaskName PowerDesktopMonitor
```

## Stoppen
```powershell
Get-CimInstance Win32_Process | ? { $_.CommandLine -match 'power-desktop-monitor.ps1' } | % { Stop-Process -Id $_.ProcessId -Force }
```
