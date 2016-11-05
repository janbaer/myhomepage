title: How can I protect my external USB stick with a password on MacOS Sierra 
comments: true
date: 2016-11-05
categories:
- software
tags:
- MacOS

---
To protect your USB-stick with a password you have to format it first with the Disk Utility program to the Mac OS Extended (Journaled) format with the GUI-Partitiontable.

**Attention** Please make a backup before you're formatting it!!!

Then just go into the terminal and enter **diskutil list**. Here should see the USB drive listed (in my case it's /dev/disk2)

In case you've only one partition on this USB stick you've to convert **disk2s2** to a AppleCoreStorage with using you own passphrase. You can do this with the following command.

```
diskutil cs convert disk2s2 -passphrase yoursupersecurepassphrase
```

After some minutes the USB stick should be remounted and it's protect with the passphrase of your choice. When you want you can save the passphrase in your local keychain so that you don't have to enter it always again.

But in case that someone will "find" your USB-stick, he'll have no access to the data that are stored on it without knowing the passphrase.
