# gitwatch.sh and logwatch.sh should be run vi cron scheduling per the following configuration.
# use crontab -e to edit the crotab as the primary user (bitnami if using AWS bitnami image)

* * * * * ~/scripts/gitwatch.sh >> ~/scripts/gitwatch.out 2>&1
0,5,10,15,20,25,30,35,40,45,50,55 * * * * ~/scripts/logwatch.sh >> ~/scripts/logwatch.out 2>&1
