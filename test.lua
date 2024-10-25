--[[
Author: june.yang 1027612662@qq.com
Date: 2023-08-04 16:07:47
LastEditors: june.yang 1027612662@qq.com
LastEditTime: 2023-08-04 16:17:49
FilePath: /test/test.lua
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
--]]
num = 300
s = "hello double"
t = 'hello single'
u = [[ 多行
    文本]]

t = nil

-- while num < 110 do
--   num = num + 1
-- end


-- if num < 200 then 
--   print('over 200')
-- elseif s ~= 'hello double' then 
--   io.write('hahahahha')
-- else
--   thisIsGlobal = 5

--   local line = io.read();
--   print('echo '..line)
-- end

-- foo = unknownVar
-- print(foo)
fredSum = 0
for j = 1, 5, 2 do 
  print('j:'..j)
  fredSum = fredSum + j 
  print("fredSum:"..fredSum)
end
