#!/bin/bash

# source env in case running from cron
. ~/.profile
. ~/.bashrc

# get the end timestamp for this interval
# if nothing is in the log we can still transmit 0s for the current interval,
NEWLASTUPDATE=`date -Is | awk '{s=$1; sub(/[+]/,".",s); print s "Z"}'`
#NEWLASTUPDATE=`cat $INTERVALLOG | awk -F"^" '{lts=$2} END {print lts}'`

SCRIPTDIR="/home/bitnami/scripts"
echo " "
echo "**** Defender executing custom health check on $NEWLASTUPDATE"
TIMESTAMPFILE="$SCRIPTDIR/logwatch.last.timestamp"
SERVERLOG="/home/bitnami/server.out"
INTERVALLOG="$SCRIPTDIR/logs/log`date '+%Y%m%d%H%M'`.out"
EC2_INSTANCE_ID="`wget -T 10 -t 1 -q -O - http://169.254.169.254/latest/meta-data/instance-id || hostname `"

if test "$1" = "-dryrun"
then
    SENDMETRIC=0
else
    SENDMETRIC=1
fi

if test ! -d $SCRIPTDIR/logs
then
    mkdir $SCRIPTDIR/logs
fi

if test ! -f $TIMESTAMPFILE
then
    echo "2015-01-01T00:00:00.211Z" > $TIMESTAMPFILE
fi
LASTUPDATE=`cat $TIMESTAMPFILE | awk '{print $1}'`
echo "**** Checking for interval updates since $LASTUPDATE"

# extract output for any morgan message since last poll
cat $SERVERLOG | awk 'BEGIN {laststamp="'$LASTUPDATE='"}
{
   if ((NF==10)&&($NF=="ms")&&($5>laststamp)) {
     # this is a log message to parse put
     # $1 user
     # $5 timestamp
     # $6 page status
     # $4 URL
     # $9 response time
     split($4, a, ":")
     url=a[1]
     printf("%s^%s^%s^%s^%s\n",$1,$5,$6,url,$9)
   }
}' > $INTERVALLOG 

# app upp down
ps -ef | grep "/opt/bitnami/nodejs/bin/.node.bin.*/home/bitnami/projects/defender/src/server/app.js" | grep -v grep > /dev/null 2>&1
if test $? -eq 0
then
    echo "Defender Application is up and running."
    DOWNSTATUS=0
else
    echo "Defender Application is DOWN"
    DOWNSTATUS=1
fi   
# transmit down status to AWS cloudwatch
test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name ApplicationDownCount --namespace "Defender.ApplicationMetrics" --value $DOWNSTATUS --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# pages served metric
PAGESSERVED=`cat $INTERVALLOG | wc -l`
echo "Pages Served in this interval: $PAGESSERVED"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name PageViewCount --namespace "Defender.ApplicationMetrics" --value $PAGESSERVED --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# number of different users served metric
USERSSERVED=`cat $INTERVALLOG | awk -F"^" '{print $1}' | sort -u | wc -l`
echo "Users Served in this interval: $USERSSERVED"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name UserCount --namespace "Defender.ApplicationMetrics" --value $USERSSERVED --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# number of errors 
ERRORPAGES=`cat $INTERVALLOG | awk -F"^" '{if ((substr($3,1,1)=="4")||(substr($3,1,1)=="5")) print $0 }' | wc -l`
echo "Application errors in this interval: $ERRORPAGES"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name PageErrorCount --namespace "Defender.ApplicationMetrics" --value $ERRORPAGES --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# average response time non error pages
AVGRESPONSETIME=`cat $INTERVALLOG | awk -F"^" 'BEGIN {
  sum=0
  count=0
}
{ if ((substr($3,1,1)!="4")&&(substr($3,1,1)!="5")) {
   count++
   sum=sum+$5
  } 
} 
END {if (count>0) {
       avg=sum/count
     } else {
       avg=0
     }
     printf("%12.3f\n",avg)}'`
echo "Average successful page response time (ms): $AVGRESPONSETIME"
test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name AverageResponseTime --namespace "Defender.ApplicationMetrics" --value $AVGRESPONSETIME --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# max response time non error pages
MAXRESPONSETIME=`cat $INTERVALLOG | awk -F"^" 'BEGIN {
  max=0
}
{ if ((substr($3,1,1)!="4")&&(substr($3,1,1)!="5")) {
   res=$5
   if (res>max) max=res
  } 
} 
END {printf("%12.3f\n",max)}'`
echo "Maximum successful page response time (ms): $MAXRESPONSETIME"
test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name MaxResponseTime --namespace "Defender.ApplicationMetrics" --value $MAXRESPONSETIME --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# Security Metrics
AUTHLOG="/var/log/auth.log"
LASTAUTHLENGTHFILE="$SCRIPTDIR/authloglen.dat"
CURAUTHLOGLENGTH=`sudo cat $AUTHLOG | wc -l`
if test -f $LASTAUTHLENGTHFILE
then
    LASTAUTHLOGLENGTH=`cat $LASTAUTHLENGTHFILE | awk '{print $1}'`
else
    LASTAUTHLOGLENGTH=0
fi

KERNLOG="/var/log/kern.log"
LASTKERNLENGTHFILE="$SCRIPTDIR/kernloglen.dat"
CURKERNLOGLENGTH=`sudo cat $KERNLOG | wc -l`
if test -f $LASTKERNLENGTHFILE
then
    LASTKERNLOGLENGTH=`cat $LASTKERNLENGTHFILE | awk '{print $1}'`
else
    LASTKERNLOGLENGTH=0
fi

# Failed root logins
FAILEDROOTLOGINS=`sudo cat $AUTHLOG | awk '{if ((NR>'$LASTAUTHLOGLENGTH')&&(NR<='$CURAUTHLOGLENGTH')) print $0}' | grep "authentication failure.*user=root$" | wc -l `
echo "Failed root login attempts in this interval: $FAILEDROOTLOGINS"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name FailedRootLogins --namespace "Defender.SecurityMetrics" --value $FAILEDROOTLOGINS --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# Failed non-root logins
FAILEDNONROOTLOGINS=`sudo cat $AUTHLOG | awk '{if ((NR>'$LASTAUTHLOGLENGTH')&&(NR<='$CURAUTHLOGLENGTH')) print $0}' | grep "authentication failure.*user=" | grep -v ".*user=root$" | wc -l `
echo "Failed non-root login attempts in this interval: $FAILEDNONROOTLOGINS"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name FailedNonRootLogins --namespace "Defender.SecurityMetrics" --value $FAILEDNONROOTLOGINS --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# Sudo Commands Executed
SUDOCOUNT=`sudo cat $AUTHLOG | awk '{if ((NR>'$LASTAUTHLOGLENGTH')&&(NR<='$CURAUTHLOGLENGTH')) print $0}' | grep "sudo: .*COMMAND=" | wc -l `
echo "Sudo commands executed in this interval: $SUDOCOUNT"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name SudoCmdsExecuted --namespace "Defender.SecurityMetrics" --value $SUDOCOUNT --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# Brute Force Login Attacks Stopped 
BFLOGINCOUNT=`sudo cat $KERNLOG | awk '{if ((NR>'$LASTKERNLOGLENGTH')&&(NR<='$CURKERNLOGLENGTH')) print $0}' | grep "LoginBlock:" | wc -l `
echo "Brute Force Login attacks detected in this interval: $BFLOGINCOUNT"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name BruteForceLoginsBlocked --namespace "Defender.SecurityMetrics" --value $BFLOGINCOUNT --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

# Port Scans Detected/Stopped 
PORTSCANCOUNT=`sudo cat $KERNLOG | awk '{if ((NR>'$LASTKERNLOGLENGTH')&&(NR<='$CURKERNLOGLENGTH')) print $0}' | grep "Portscan:" | wc -l `
echo "Port scans detected in this interval: $PORTSCANCOUNT"
    test "$SENDMETRIC" -eq 1 && aws cloudwatch put-metric-data --metric-name PortScansBlocked --namespace "Defender.SecurityMetrics" --value $PORTSCANCOUNT --timestamp $NEWLASTUPDATE --dimensions InstanceId=$EC2_INSTANCE_ID

echo "Setting last timestamp to $NEWLASTUPDATE"
echo "$NEWLASTUPDATE" > $TIMESTAMPFILE
echo "$CURAUTHLOGLENGTH" > $LASTAUTHLENGTHFILE
echo "$CURKERNLOGLENGTH" > $LASTKERNLENGTHFILE
exit 0
