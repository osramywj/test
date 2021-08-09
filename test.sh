#!/bin/bash

  
# showprogress()  
# {  
#         code=""  
#         for((i=1;i<=20;i++)); do  
#                 code=${code}"$1"  
  
#                 if [ $2 -eq "1" ]; then  
#                         printf "%3d%% \x1b[31m%s\x1b[0m\r" $(($i*5)) $code  
#                 else  
#                         printf "%3d%% \x1b[41m\x1b[31m%s\x1b[0m\r" $(($i*5)) $code  
#                 fi  
#                 sleep 0.5  
#         done  
#         echo  
# }  
  
# showprogress "#" 1  
# showprogress "1" 2  
# for TOKEN in $@
# do
#    echo $TOKEN
# done
 
# echo -e "\u001b[31m error \u001b[0m"
# echo -e "\x1b[31m second \x1b[0m"

# arr=(1 2 3 4)
# arr2=(5 6)
# arr3=(${arr[@]} ${arr2[@]})
# unset arr2[1]
# echo ${arr2[@]}


# if [ `ps -ef | grep -c "ssh"` -lt 1 ]; then
#     echo "true"
# elif ((1>2)); then
#     echo false
# else
#     echo 333
# fi

# for i in $@;do
#     case $i in
#         1)
#             echo $i
#             ;;
#         2)
#             echo $(($i+1))
#             ;;
#         *)
#             echo 'hahahaha'
#             ;;
#         esac
# done

# for ((i=0; i<3; i++));do
#     echo $i
# done
# for i in *.sh
# do
#     echo $i
# done




# test
# echo $?
# echo $foo




# 
# if ((1<=1));then
    # echo true
# fi
# str1=111
# str2=222
# str3=333
# if [ $str1 != $str2 ] && [ $str1 != $str3 ] ;then
#     echo true
# fi
# if grep 2 t.js;then
#     echo 111
# fi

# filename=t.js
# word1=2
# word2=2

# if grep $word1 $filename && grep $word2 $filename
# then
#   echo "$word1 and $word2 are both in $filename."
# fi

# echo -n "输入一个1到3之间的数字（包含两端）> "
# read num
# case $num in 
#     [[:lower:]] ) echo $num;;
#     [0-9]) echo "数字"$num ;;
#     *) echo "default";;
# esac

# grep -E 'a[[:upper:]]'  test.ts
# read -t 10 -sp "请输入密码：" pass1 && printf "\n" &&
# read -t 10 -sp "请再次出入密码" pass2 && printf "\n" && [[ $pass1=$pass2 ]] 

# if [[ $? ]];then
#     echo '成功'
# else
#     echo '失败'
# fi



# test=3
# function test(){
#     local foo=3
#     return $foo
# }

# # declare -r n=10
# declare -p 

# sum=0
# echo "请输入您要计算的数字，按 Ctrl+D 组合键结束读取"
# while read n
# do
#     ((sum += n))
# done
# echo "The sum is: $sum"


# while read line
# do
    # echo $line
# done < server_config
# read line server_config
# echo $line

# while read str; do
#     echo $str
# done <server_config

# sum=0
# echo "请输入您要计算的数字，按 Ctrl+D 组合键结束读取"
# while read n
# do
#     ((sum += $n))
# done
# echo "The sum is: $sum"
# {
#     read name 
#     read url
#     read age
# } < t.js

# echo $name
# echo $url
# echo $age
# read -p "Enter some information > " name url age
# echo "网站名字：$name"
# echo "网址：$url"
# echo "年龄：$age"
# read -e -p "输入文件名:" str 

# gsed  'y/L/dd/' tt.js
# gsed  -e   '/9/d' t.js

# gsed -E 's/\w+/[&]/g' t.js
# sed -i '.bak'  's/1/repalce_text/g' t.js
# gsed -En '/TABLE/s/.*\"bank\"\.(\w+) row.*/\1/p' t.js
# gsed -En 's/\|\s+[0-9]+\s+\|\s+(\w+)\s+.*/\1/p' t.js
# gsed -En 's/^\|\s*\d+\s*\|\s*(\S+)\s*\|.*/\1/p' t.js

# awk  '{print $4}' t.js


# gsed '/one/a This is an appended line.' t.js
# gsed -n '/one/{p;s/This/test/p}' t.js

# sed 's/System\\nAdministrator/Desktop\\nUser/;s/System Administrator/Desktop User/' t.js
# awk 'BEGIN {FS=",";OFS="-"} {print $1,$2,"FNR="FNR,"NR="NR}' t.js t.js
# awk 'BEGIN {testing="This is a test";print testing}' 
# awk '{if($NF ~ /[0-9]+ms/){if(+$NF==0){ print $0 }}}' t.js
# awk '{if($NF ~ /[0-9]+ms/){print +$NF}}' t.js
# awk '{if($NF ~ /([0-9]+)ms/){gsub(/ms/,"00",$NF); print $NF}}' t.js
# awk '{if($NF ~ /([0-9]+)ms/){ print substr($NF,0,2)}}' t.js
# awk '{if($(NF-1) ~ /[0-9]+ms/){ if(+$(NF-1) > 3000){ print $0 }}}' hfsfd-op.log
# grep --color "^\(\w\+\).*\1$" t.js
# grep  -o 'aaa\|111' t.js
# cut -nb 1,2,3 t.js
# gsed -n l t.js
# find . -iname 't.js' -print0 | xargs -d
# ./node_modules/lodash/fp/T.js ./t.js
# echo '111x222x3333x444' | xargs -dx
# awk '{arr[111]++;print arr[111]}' t.js
# sort -k 3n -k 1 t.js
# sort -k 3n -k 1r t.js
# sort -k 1 -k 3n t.js
# sort -n -k 2 -k 3r t.js
# sort -n -k 2 -k 3r t.js

grep "COLLSCAN" 81.log | sed 'filter: ' |awk '{if(+$NF > 1000) print $6,}' 
