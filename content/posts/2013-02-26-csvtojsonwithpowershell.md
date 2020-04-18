---
title: Csv to Json with Powershell
date: 2013-02-26
draft: false
comments: false
categories:
- develop
tags:
- csv
- powershell
- json
---

In my current project I have got some .csf files with the requirement to import these files
to my project as base data to use it as inmemory repository.

The best solution was these single line of code in powershell.

```
Get-Content -path $inputFile | ConvertFrom-Csv -Delimiter ';' | ConvertTo-Json | Out-File $outputFile
```

You can download the complete powershell script from my [gist repository](https://gist.github.com/janbaer/5045798) at github.
