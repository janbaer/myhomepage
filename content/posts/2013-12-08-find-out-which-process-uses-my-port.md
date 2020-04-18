---
title: Find out which process uses my port
date: 2013-12-08
draft: false
comments: false
categories:
- develop
tags:
- node.js
- system
- macos
---

Today I had the problem, that someone has used the port 3000 on my macbook and I couldn't start my node.js server.
At first I tried to close all open terminal windows and exit the terminal app, but this wasn't the solution for my problem.

Now I've tried to find out wich process uses the port. For that I entered the following command in the terminal:

```
lsof -i :3000
```

This command returns me informations about the process that is using my port. With the processid I'm now be able to kill the process.

```
kill -9 11381
```
