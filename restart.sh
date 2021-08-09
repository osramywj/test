#!/bin/bash

CONFIGS=()
if [[ -f server_config ]]; then
    while read line
    do
        CONFIGS+=("$line")
    done < server_config
fi


function login(){
    CONFIG=(${CONFIGS[$1-1]})

    if [[ ${CONFIG[3]} = "straight" ]];then
        /usr/bin/expect -c "
        spawn ssh ${CONFIG[1]}@${CONFIG[2]}
        send \"curDir=\$\(ls | grep $2\)\n\"
        send \"project=\$\(pm2 l | grep $2 | awk \'{print \\\$4}\'\)\n\"
        send \"cd /home/work/\\\$curDir && git pull && pm2 restart \\\$project\n\"
        interact"
        # 此处其实是两层转义，-c 后是一层， send后是一层
        # 第一层转义后结果为:  
        # send "curDir=$(ls | grep hfsfd-be)\n"
        # send "project=$(pm2 l | grep hfsfd-be | awk '{print \$4}')\n"
        # send "cd /home/work/\$curDir && git pull && pm2 restart \$project\n"
        # 第二层转义结果为:
        # curDir=$(ls | grep hfsfd-be)
        # project=$(pm2 l | grep hfsfd-be | awk '{print $4}')
        # cd /home/work/$curDir && git pull && pm2 restart $project
    else 
        if [[ -n ${CONFIG[3]} ]];then
            loginStr="ssh ${CONFIG[1]}@${CONFIG[2]} -p ${CONFIG[3]}\n"
        else
            loginStr="ssh ${CONFIG[1]}@${CONFIG[2]}\n"
        fi
        /usr/bin/expect -c "spawn ssh jump;send \"$loginStr\";interact"
    fi
}


login $*
