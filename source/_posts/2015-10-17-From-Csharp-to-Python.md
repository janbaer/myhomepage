title: From C# to Python
comments: false
date: 2015-10-17
categories:
- development
tags:
- c#
- python
- linq
---

Last week I did my first steps with [Python](https://de.wikipedia.org/wiki/Python_(Programmiersprache)) and I was really suprised about this programming language that has such a long history.

It provides features that I wouldn't expect. To dive deeper into the language I solved a **Kata**,
what I mostly do when learning a new programming language. This time I choosen the [StringCalculator kata](http://osherove.com/tdd-kata-1/) from Roy Osherove. You can find the source code on my [github](https://github.com/janbaer/Katas/tree/master/Kata.StringCalculator.Python) page.

One of the nice features I found was **list comprehensions** feature.

```
[number for number in [1, 2, 1000, 1001] if number <= 1000]
# returns [1, 2, 1000]

```

Another nice feature was the built-in **any** function. It does the same like the same linq function from C#. It returns true when any element of the iterable returns true.

```
any(number < 0 for number in [-1,2,3])
# returns true
```

The same is for the **filter** function. It takes a function as first parameter that returns a boolean and returns all elements from the given list whith those elements for which the function returns true.

At least I used a feature that ES6 also provides, the **Destructuring assignment**. So in the Kata I used a regular expression to split the definition of delimiter from the list of numbers.

```
match = myRegex.search(input)
if match:
  delimiter, input = match.groups()

return delimiter, input
```

The regex returned in a positive case two groups. Both groups I could directly assign to the variables *delimiter* and *input* and also return this variables as result of the function. In this case both variables will be automatically packed as a tuple and in the calling function unpacked and assigned to two another variables, very nice...

So I'm just at the beginning of journey through the features of python and I'll post here more about my experiences...





