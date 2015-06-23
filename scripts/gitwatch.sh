#!/bin/bash

TRIGGERFILE="/home/travis/travis_build_trigger"
. ~/.profile
. ~/.bashrc

cd /home/bitnami/projects/defender

if test -f $TRIGGERFILE
then
  TEMPFILE="/tmp/gitcheck$$.out"
  echo "Checking for remote repository updates at `date`"
  git remote update
  git status -uno > $TEMPFILE 2>&1

  cat $TEMPFILE | grep "Your branch is up-to-date" > /dev/null 2>&1
  if test $? -eq 1
  then
      echo "Changes detected. Executing repository refresh..." 
      echo "Stopping current application server process..."
      if test -f ~/grunt.pid 
      then
         GRUNTPID=`cat ~/grunt.pid | awk '{print $1}'`
         echo "    ...(I think the current process PID=$GRUNTPID)"
         if test "$GRUNTPID" != ""
         then
            echo "    ...( sending kill -2 $GRUNTPID)"
            kill -2 "$GRUNTPID" > /dev/null 2>&1
         fi
         rm -f ~/grunt.pid
      fi
      # note that this is a hard over write of local repository
      git fetch --all
      git reset --hard
      git pull
      # change to src directory before starting
      cd /home/bitnami/projects/defender/src
      # run npm install to catch up on dependencies
      echo "Resolving dependencies - in case they changed.."
      bower install
      npm install
      # now restart the grunt server in that background
      echo "Restarting application server process..."
      nohup grunt server >> ~/server.out 2>&1 &
      echo "$!" > ~/grunt.pid
  fi
  echo "Removing trigger file."
  rm -f $TRIGGERFILE
fi
rm -f $TEMPFILE
exit 0
