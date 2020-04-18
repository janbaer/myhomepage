---
title: Using hooks in git
date: 2013-09-01
draft: false
comments: false
categories:
- develop
tags:
- git
---

Wenn man nach "git hooks" sucht, findet man jede Menge Links zu guten Beschreibungen, was es für verschiedene Hooks in Git gibt und was man alles damit machen kann.

Deshalb möchte ich mich in diesem Artikel darauf beschränken, zu beschreiben, wie ich den **post-commit** hook in einem meiner Projekte verwende.

Ich habe für mich mit [MarkDoc](http://markdoc.org)ein kleines Wiki erstellt das ich über die Github-Websites über [wiki.janbaer.de](http://wiki.janbaer.de) erreiche. Dieses Wiki wird mit einfachen Textdateien im **Markdown** Format erstellt und über ein **Python** Script in HTML umgewandelt.

Ich habe jeweils für Text- und HTML-Dateien ein eigenes Git-Repository eingerichet, damit ich die HTML-Dateien über GitHub als Webseiten publishen kann.

Nun möchte ich, das, sobald ich einen Commit in meinem Source Repository gemacht habe, automatisch die HTML-Dateien erstellt und das Ergebnis dann gleich zu Github gepusht wird.

Um den Vorgang zu automatisieren, habe ich im Unterordner **.git/hooks** die Datei **post-commit-sample** in **post-commit** umbenannt und mit **chmod** aus ausführbar markiert.

```
cd .git/hooks
mv post-commit-sample post-commit
chmod +x post-commit
cd ../..
```

In die **post-commit** Datei habe ich jetzt folgende Befehle eingefügt

```
message=$(git log -1 HEAD --pretty=format:%s)
git push
markdoc build
pushd .
cd ~/DropBox/WebSites/wiki
git add .
git commit -m "$message"
git push
popd .
```


In der ersten Zeile hole ich mir die Commit-Message aus meinem letzten Commit, damit ich diese an Commit für das zweite Git-Repository verwenden kann. Danach werden zuerst mal meine Änderungen auf Github gepusht. Über **markdoc build** werden die neuen HTML-Dateien erstellt. Danach wechsle ich in das Verzeichnis, in dem sich mein zweites Git-Repository befindet und führe dort die nötigen Git-Befehle aus, um die neuen oder geänderten Dateien zu commiten und zu Github zu pushen.

Leider gibt es keinen Hook für **pre-push**. Diesen könnte man gut verwenden, um einen lokalen Build mit anschließenden UnitTests durchzuführen. Das möchte ich ungern bei jedem Commit machen.

