#!/bin/bash
# Checking if Application ports are in use, and promting user to kill them

ports=$(cat config/config.json | grep port | egrep -o '[0-9]+')

echo "Checking if ports ($ports) are available."

for port in $ports
do
  pid=$(lsof -t -i:$port -sTCP:LISTEN)
  if [ "$pid" -eq "$pid" ] 2>/dev/null;
  then
    echo "Port $port is in use."
    read -p "Press Y to kill it, or N to manually kill process $pid later, or change config/config.json" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
      kill $pid
    else
      [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1
    fi
  else
    echo "Hurray, Port $port is free"
  fi
done
