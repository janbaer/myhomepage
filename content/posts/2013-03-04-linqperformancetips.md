---
title: LinqPerformanceTips
date: 2013-03-04
draft: false
comments: false
categories:
- develop
tags:
- linq
---

In my latest project I learned some thinks about the performance of Linq when you often query in-memory repositories. Linq is very easy to use and with that you can very quick implement the methods that you need for an repository. But sometimes it's useful to think a little bit more how often a method will be called. In my latest project I had the situation to call the **GetById** method for more than 20.000 times. And my in-memory repository had more than 700 items. In my first attempt I have used the **SingleOrDefault** method to return the correct item. But this was not fast enough. My function has needed more than 2 seconds in sum. My second attempt was, to convert the items into a Dictionary with the id as key and use this dictionary in the *GetById* function. And this was so much faster. It needs just 220 ms for all calls and this was the performance that I needed.

To generate a dictionary very quick, you can use an extension method from the **System.Linq**	 namespace. With the following code you can do this very easy

```
items.ToDictionary(i => i.Id);
```

The same experience I made with the query for any items with the same key. The Linq function **SelectMany** was in summary to slow. In this situation you can't use a dictionary because the key isn't unique. But Linq has also an Extension method to solve this problem. With the **ToLookup** function you can generate a very fast lookup table.

```
items.ToLookup(i => i.{PropertyToLookup});
```
