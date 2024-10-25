#!/bin/bash

serverName=$1
ip=$2

function package() {
  echo "开始打包>>>>>>>>>>"
  mvn clean package -Dmaven.test.skip=true -Dfile.encoding=UTF-8 -am -pl $serverName
  echo "打包完成>>>>>>>>>>"
}

function upload() {
  jarList=`ls $serverName/target | grep $serverName | grep '.tar.gz'`

  scp -P 36000 jarPath   root@$ip:/data/app/
}

function main(){
  upload
}

main $*