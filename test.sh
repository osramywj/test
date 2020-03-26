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
 
echo -e "\u001b[31m error \u001b[0m"
echo -e "\x1b[31m second \x1b[0m"