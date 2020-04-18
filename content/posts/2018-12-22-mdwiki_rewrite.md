---
title: MDWiki rewrite
date: 2018-12-22
draft: false
description: A short article about the rewrite of MDWiki
comment: false
tags: 
  - develop
---

As I wrote in my previous blog entry before a while I decided to give up the domains for my personal projects and let it run as subdomains under my personal domain janbaer.de.

Before a while I realized, how easy it is to host a PWA on Github as a **gh-page** and thanks to Github and with the help of **Let's encrypt** your PWA can also run over HTTPs which gives you more security but also the ability to use ServiceWorkers. The only constraint you have to live with is, that you'll have no serve backend to use Node.js for example. So there'll be also no server side rendering.

But that was fine for my projects and that's why I decided to rewrite MDWiki completely for the  third time. In the first version I was using Angular 1 with Node.js on the backend site. After 3 years I wanted to rewrite it and I decided to use Next.js wich is using React.js and Node.js in the backend.

So for the third version I decided to not make a complete rewrite and just to make some slightly changes to be able to use some code from the second version. That's why I don't wanted to leave the React.js world completely. But I wanted to replace it with [Preact.js](https://preactjs.com/) which has a much smaller footprint than React.js. And because of there's no server side code, I completely dropped Next.js.

But instead of using Webpack directly for the module bundling I decided to use [Parcel.js](https://parceljs.org/) which is another more lighweight module bundler.

And because of my experience from the second version of MDWiki and also my daily work with **React.js** it took me less than two months to rewrite MDWiki with the same functionality as from the second version and let it run under [mdwiki.janbaer.de](https://mdwiki.janbaer.de). When I started with the project I wanted to use a small CSS framework and I started with [UIKit](https://getuikit.com/docs/introduction). But then I realized that I don't used so much from the framework and I could write it on my own.

Another feature I also used, is a ServiceWorker, to be able to also be runnable offline. ServiceWorker you can only use when your website is served via https.

The result is now a very lightweight and very easy deployable PWA, that has just a few dependencies.

