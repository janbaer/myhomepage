title: How to run a scheduled job within a Docker container
comments: true
date: 2016-10-23
categories:
- software
tags:
- Docker

---
For some reasons it could be necessary to execute a job in scheduled time.
When running the job within a Docker container there're two ways to do this.

The first would be to create a cron job on the server on which Docker is
running and let them execute the job with ``docker run``.

The second way would be to let do everything within the Docker container.
But you don't need to implement any scheduling functionality since it's out of
the box available from any Linux based container.

For example when your container is using the tiny Alpine base image you can use
**crond** for it. The following code snippets are showing you everything what
is todo.

### run.sh

```
#!/bin/sh

NOW=$(date +"%T")

echo "Hello from the job at ${NOW} in $(pwd)" >> /dev/stdout
```

### Dockerfile

```
FROM alpine:latest

COPY ./job.sh /etc/periodic/15min/job
RUN chmod +x /etc/periodic/15min/job

CMD ["crond", "-fS"]
```

The dockerfile is doing two things. It's copying the **job.sh** into a
predefined folder and mark them as executable.

All scripts that are within this folder will be executed by
**crond** every 15 minutes. There're more predefined folders under
**etc/periodic** to let run a job hourly, daily, weekly or once per month.
In case you need more flexibility you've to change the crontabs file for the
**root** user manually.

The program **crond** comes with the tiny Alpine image but it will not be
executed automatically as a background daemon.

It's possible to let run **crond** as a foreground process, which is intersting
for us. Since we need a process wich is running always, otherwise our Docker
container will be finished immdiately after it was started. So with giving
**dockerd** the **-f** flag as argument it will run constantly as a foreground
process and our Docker container will also running continuously.

Please keep in mind that it's required that the script in the targetfolder
don't have the .sh extension, otherwise **run-parts** which is used from
**crond**, will not use your script.

Please keep also in mind that the workingdirectory where the **job.sh** will be
executed is the **/root** folder. So maybe you've to change
the working directory in the **job.sh** at first before executing whatever
you've to execute...


