title: Set-acl with Powershell
date: 2013-04-01
comments: false
categories:
- develop
tags:
- powershell
- iis
- security
---

In meinem letzten Projekt war eine meiner Aufgaben, ein Script zu erstellen, das eine definierte Verzeichnisstruktur erstellt und einem bestimmten User die notwendigen Zugriffrechte darauf gibt.
Weiterhin sollte das Script dann im IIS eine Website mit einem eigenen AppPool in diesem Verzeichnis erstellen.

Ich hatte mich entschieden, das Script mit Powershell zu erstellen, da es hier schon fertige Module von Microsoft gibt, um den IIS zu verwalten, ohne das man dies über WMI machen müsste.

Um dieses Modul allerdings zu verwenden, muss man es in Powershell erst einmal importieren. Das macht man ganz einfach mit foldener Codezeile.

```
Import-Module -Name WebAdministration
```

Damit das Module importiert werden kann, muss der IIS mit den Management Services installiert sein. Will man prüfen, ob das Modul auch wirklich installiert ist, so kann man das mit folgendem Code machen und im negativen Fall den Benutzer darauf hinweisen.

```
if ((get-module -name WebAdministration -erroraction silentlycontinue) -eq $false) {
Write-Host "The Powershell module for WebAdministration is not installed! Please check your IIS installation!" -f Red
return
}
```

Die Website erstellt man dann mit folgendem Code

```
$integrated = 0
New-WebAppPool -Name $appPoolName
Set-ItemProperty IIS:AppPools\$appPoolName managedRuntimeVersion v4.0
Set-ItemProperty IIS:AppPools\$appPoolName managedPipelineMode $integrated
New-Website -Name $webServiceName -PhysicalPath $directoryPath -ApplicationPool $appPoolName
Remove-WebBinding -Name $webServiceName
New-WebBinding -Name $webServiceName -IPAddress "*" -Port $port -HostHeader $webServiceName
```

Seit IIS7 ist es so, das der AppPool nicht mehr wie früher mit dem Account **NetworkService** läuft sondern es dafür eigene **IIS AppPool** Identities gibt. Wenn man einen neuen AppPool erstellt, läuft dieser unter dem Benutzer **IIS AppPools\AppPoolname**. Es müssen diesem Benutzer noch die Zugriffsrechte auf das Verzeichnis gegeben werden. Normalerweise sollten diesem Benutzer nur auf bestimmte Verzeichniss, wie das Log-Verzeichnis Schreibrechte gegeben werden. Auf die anderen Verzeichniss reichen Lesezugriffsrechte. Auch hierfür hat die Powershell schon die notwendigen Commandlets an Board.

```
$acl = Get-Acl -Path $directory
$userAccount = New-Object System.Security.Principal.NTAccount("IIS AppPool", $userName)
$permission = $userAccount, $right, "ContainerInherit,ObjectInherit", "None", "Allow"
$right = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($right)
Set-Acl -AclObject $acl -Path $directory
```

Die meisten Codebeispiele erstellen die Permission mit der folgenden Codezeile

```
$permission = $userAccount, $right
```

Das hat aber den Nachteil, das sich diese Berechtigung nicht auf neue Unterordner veerbt. Deswegen ist die erste Variante in den meisten Fällen sicher die zu bevorzugende.

