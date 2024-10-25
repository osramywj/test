import json
import random
import time
import os
from kafka import KafkaProducer

# 初始化变量
# 根据具体情况，修改为当前环境kafka的地址,可为集群，可为单机
# kafkaAddress = "10.102.0.170:18108,10.102.1.202:18108,10.102.1.0:18108"
# kafkaAddress = "10.0.14.159:18108,10.0.12.214:18108,10.0.12.213:18108"
# kafkaAddress = "10.102.1.186:18108"
# kafkaAddress = "10.0.14.161:18108"
# kafkaAddress = "10.102.1.186:18108"
kafkaAddress = "10.102.1.97:18108,10.102.1.225:18108,10.102.1.92:18108"
# kafkaTopic = ['logTopic_1020','cloudwise-doop-log-ingest','logTopic_1021','logTopic_1022','logTopic_1023']
# kafkaTopic = ['topic_userCenter_error_log']
# kafkaTopic = "testpaycore"
# kafkaTopic = "testKafka"
# kafkaTopic = ["testKafka"]
# kafkaTopic = ["graceTopic0726"]
kafkaTopic = ["cloudwise-doop-log-ingest"]
# kafkaTopic = ["graceTopic2"]
# 需要发送到指定kakfa的topic,自定义数据源时，上述创建kafka数据源时，填写的topic名称
# kafkaTopic = ['topic-userCenter_bank','firstName','lastName','phoneNumber']
# kafkaTopic = ['dataSourceSmoke']

producer = KafkaProducer(value_serializer=lambda v: json.dumps(v).encode('utf-8'), bootstrap_servers=kafkaAddress,
                         linger_ms=1, max_request_size=7372800)

# 从当前时间点开始发送，不限时间，快速发送
print("开始发送测试数据------------------")
i = 1
while i >=0:
    now_time = int(round(time.time() * 1000))
    delay_time = int(round(time.time() * 1000) - 5*60*1000)
    # str = now_time - 10*60*1000
    # service = ["Elementary OS", "FreeBSD", "SUSE Linux"]
    service = ["Elementary-OS","FreeBSD","SUSE/Linux","Redis"]
    number = ["1234","10.2"]
    # service = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    # host_ip = ["10.101.1.180","10.0.7.66","127.0.0.1"]
    host_ip = ["10.0.0.1","10.0.0.2","10.0.0.3","10.0.0.4","10.0.0.5","10.0.0.6","10.0.0.7","10.0.0.8","10.0.0.9","10.0.0.10"]
    # host_ip = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    host = ["ftp", "telnet", "mysql", "https", "postGresql", "mongodb"]
    # host_name = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    # log_path = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    host_name = ["localhost", "mailServer", "webServer",
                 "fileServer", "dataServer", "appServer", "dbServer"]
    log_path = ["/var/log/messages", "/var/log/auth.log",
                "/var/log/httpd/access_log", "/var/log/secure"]
    severity = [0, 5, 9, 13, 17, 21]
    # severity_text = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    severity_text = ["ERROR","info","debug","warn","fatal"]
    env = ["sit","prod","uat"]
    grace = ["grace1","grace2"]
    # env = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]

    source = ["nagios","mysql"]
    # source = ["The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()_+-=[]{}|;':,.<>/?`~"]
    # source = ["securityLog", "systemLog",
    #           "applicationLog", "databaseLog", "networkLog","nagios"]
    request_url = ["recommend-api.i.xgimi.com", "api.goss.xgimi.com"]
    router_uri = ["/recV3.0/recVideoRows",
                  "/userGroup/userGroupsById", "/v2/music/my/userInfo"]
    request_method = ["POST", "GET", "PUT", "DELETE"]
    name = ["第一个", "第二个", "第三个"]
    chinese_key = ["用户名", "身份证号码", "手机号", "地址"]
    chinese_value = ["张三", "李四", "王五", "赵六"]
    special_key = ["cw"]
    special_character = ["!@#$%^&", "*()_+", "-=|:;", "'<>",
                         "?/~`", "[]{}", "，。、；‘：“”【】《》？"]

    num_string = ["123", "456"]
    trace_id = ["1691659106481_trace_id", "1691659127027_trace_id"]

    # 特殊字符开头和结尾的日志
    # message1 = str(i)+ '--------' +"AAAAA12索引配置测试数据hello !@#$%^&*()_+", "-=|:;'<>?/~`[]{}，。、；‘：“”【】《》？\|\、、/ testERROR/测试test/" + "hello-world" + "\hello?" + "*WORLD^" + "!ui@" + "#op$" + \
    #            random.choice(special_character) + "113 。、|\AAAAA19910534019 晁亚丽 2023-05-18 10:06:31.713|error |512106|com.alibaba.nacos.client.remote.worker||Server check fail, please check server 10.0.12.87 ,port 19117 is available , error =java.util.concurrent.ExecutionException: com.alibaba.nacos.shaded.io.grpc.StatusRuntimeException: UNAVAILABLE: io exception" + random.choice(special_character)
    # 数字开头的日志
    message2 = str(i)+ '--------' +'hello world Mar 30 14:53:15 10.60.112.110 cf6b40d2f0ad2370df40ab189985d68c c7a1b0acec7840d6b6c9a88ee11e8dd4 - - [12/May/2023:17:32:38 +0800] 0.008 POST http://recommend-api.i.xgimi.com /recV3.0/recVideoRows HTTP/1.1 200 1743 347 "-" "-" "10.60.115.99:80" /recV3.0/recVideoRows "200" "0.000" "0.008" "0.008" cn-east-3 0.008 0 NONE - - -  151d2e39-5a3f-498f-8f2f-32fc96f64ec2 "10.60.112.110" 1452 dc-rec-server-prod-1670640530 -  - "-" "-" "-" "-" "-" "-" "-" "-" "-" "-" remote'
    # 包含中文的日志
    message3 =str(i)+ '--------' + "199105340192023-05-18 10:06:31.304|ERROR |112106|nacos-grpc-client-executor-10.0.12.87-11455||[1684323281038_10.0.12.89_38657]Request stream error, 切换服务错误,error=com.alibaba.nacos.shaded.io.grpc.StatusRuntimeException: UNKNOWN: channel closed"

    message4 = str(i)+ '--------' +"Jun 14 09:47:24 server01 sshd[1234]: Accepted publickey for user123 from 192.168.1.100 port 54321 ssh2",
    message5 =str(i)+ '--------' + "192.168.1.1,Mon Apr 24 13:53:58 CST 2017,[DEBUG],service:com.abc.open.nlp.facade.NLPService"
    message6 = str(i)+ '--------' +'''2023-05-17 19:49:18.513|ERROR |543296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} 
    PARSER_VIABLE_ERRORpectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} pectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"17pectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} 
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} '''

    """
    如果需要补充日志类型,在message3和message100之间补充

    """

    # 多行日志
    # 读取文件内容，发送1M的日志数据
    filename = 'data.txt'  # 指定要读取的文件名
    path = os.getcwd()  # 获取当前工作目录
    file_path = os.path.join(path, filename)  # 拼接文件路径
    with open(file_path, 'r') as f:
        data = f.read()
    message99 = data

    message100 =str(i)+ '--------' + '''2023-05-17 19:49:18.513|ERROR|543296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    PARSER_VIABLE_ERRORpectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)PARSER_VIABLE_ERRORpectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} pectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173} at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"17pectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:634)2023-05-17 19:49:18.513|ERROR |43296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceInterceptor.processCql(DoopServiceInterceptor.java:138)|cql trans obj fail,error:
    error message:位置 1:53,test1:metric:max:doop_monitor_status{rule_id:"173}'''
    # json格式的日志
    message101 ='''{
        "address": {
            "city": "江苏苏州",
            "country": "中国",
            "street": "科技园路."
        },
        "isNonProfit": True,
        "links": [
            {
                "name": "Google",
                "url": "http://www.google.com"
            },
            {
                "name": "Baidu",
                "url": "http://www.baidu.com"
            },
            {
                "name": "SoSo",
                "url": "http://www.SoSo.com"
            }
        ],
        "name": "BeJson",
        "page": 88,
        "url": "http://www.bejson.com"晁亚丽frontend123
    }'''
    # XML格式的日志
    message102 = str(i)+ '--------' +'''<?xml version="1.0" encoding="UTF-8"?>19910534019
<Configuration status="warn" monitorInterval="30" strict="true" schema="Log4J-V2.2.xsd"
               packages="com.zero.scribe.log4j2plugin">
    <Properties>
        <Property name="LOG_NAME" value="dolaServer"/>
        <Property name="LOG_LEVEL" value="ERROR"/>
        <property name="LOG_HOME">${sys:cwLogRootPath:-logs}</property>
        <Property name="LOG_PATTERN" value="%-d{yyyy-MM-dd HH:mm:ss.SSS}|%-6p|%pid|%t|%c{1.}.%M(%F:%L)|%m%n"/>
        <property name="DUBBO_NACOS_ADDRESS">${sys:cwNacosServer}</property>
        <property name="DUBBO_NACOS_NAMESPACE">${sys:cwNacosNamespace}</property>
        <property name="DUBBO_NACOS_USERNAME">${sys:cwNacosUserName}</property>
        <property name="DUBBO_NACOS_PASSWORD">${sys:cwNacosPassword}</property>
    </Properties>

    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </Console>

        <LogAreaAppender name="LogAreaAppender" registryProtocol="nacos" 晁亚丽registryAddress="${DUBBO_NACOS_ADDRESS}"'''

    message200 = str(i)+ '--------' +"2023-07-06 10:09:37.824|ERROR |12751|http-nio-18206-exec-4|com.cloudwise.aops.portal.common.ExceptionHandlerAdvice.exceptionHandler(ExceptionHandlerAdvice.java:44)|unknown exception"

    message201 = str(i) + '--------' + "hello WOrld graceTopic0513"
    message202 = str(i) + '--------' + "hello test world"
    message203 = str(i) + '--------' + "helloor or WORLD"
    message204 = str(i) + '--------' + "hello19910534019- [CW.trace_id:12312552][CW.app_id:7777y7878678][CW.span_id_from:-1]dsjfbbbsihdbfisbi-"
    message205 = str(i) + '--------' + "helloAAAAA00!@#$%^“”*()_+-=|:;<>?/~`[]{}，。、；‘：【】《》？"
    message207 = str(i) + '--------' + "world AAAAA12"
    message206 = str(i)+ '--------' +"[1693916123] SERVICE NOTIFICATION: nagiosadmin;localhost;Root Partition;CRITICAL;notify-service-by-email;DISK CRITICAL - free space: / 2023 MB (3.56% inode=68%):"
    # message300 = "auto_doopLogIndex_1_7-8"
    message300 =str(i)+ '--------' + "[4681] 01 Jan 2022 12:00:08.000 * Starting failover error: promoting server 127.0.0.1:6383 to master"
    message301 = str(i)+ '--------' +"[4681] 01 Jan 2022 12:00:08.000 * Starting failover: promoting server 127.0.0.1:6383 to master"
    message103 = str(i) + "---" + "FGHJGB干活JBHJB"
    message105 = """换行

换换那个


手机电脑佛山店   是本地和妇女诶 \\n"""
    # int_num = [message1, message2, message3, message4, message5, message6, message100, message102]
    int_num = [message103]
    # int_num = [message201,message202,message203,message204,message205,message207]
    # int_num = [message201]
    # message = "2023-10-19 17:24:32|ERROR |1|auto_doopLogIndex_1_7-7"
    # info_list = ["dGhpcyBpcyBhIGV4YW1wbGU", 123]
    name = ["第一个" , "第二个"]

    data ={
        "severity":"29",
        # "grace0226":["one","two"],
        "timestamp": now_time,
        "observed_timestamp": now_time,
        # "name": random.choice(name),
        "service": random.choice(service),
        "store_timestamp": now_time,
        # "host.ip": random.choice(host_ip),
        "host.ip":"10.0.17.0",
        "port":"18080",
        # "host.name":random.choice(host_ip),
        "host.id":"(ip)",
        "business":"（中文）",
        # "app.id":"123",
        # "host.name": random.choice(host_name),
        "log.file.path": random.choice(log_path),
        "log.file.line_no": i,
        "env":random.choice(env),
        "host": random.choice(host),
        "severity_text": random.choice(severity_text),
        "source": random.choice(source),
        # "source":"elasticsearch",
        "grace": "grace",
        # "metricModel":"root1",
        # "logModel1":"log1",
        # "logModel2":"log2",
        # "logModel3":"log3",
        # "model4":"log3",
        # "business":"doop测试",
        # "new":"最长文本",
        # "new2":"！@#￥%……&*（）（*&%￥按鼠标蝴蝶结和差别很大@#$%^&*()dbchnius sdjsc{}|:\"<>?    ajsdbacbh46·7分·7uycbuwdy UE和覅IWC",
        # "new3":"文本属性默认值",
        # "new4":"非必填无值",
        # "new5":"10.0.12.212:18080",
        # "new6":"配置项5",
        # "new7":"无默认值&1个值&正整数",
        # "new8":"2024-06-19",
        # "new9":"第三篇文章",
        # "new10": "第二个",
        # "new10-1": message105,
        # "new10-2": "1E-8",
        # "yinyong":"86oqfruzxl8d6714797dipu8jaok2zg3",
        # " ":" ",
        # "1234.number": random.choice(number),
        # "资源名称":"资源名称测试",
        # "name": "log2",
        # "logNumber":0.000001,
        # "指标名称": "metric11111111",
        # "info":{
        #     "name":"cpu"
        # },
        # "trace_id": "1710752990946_trace_id",
        "decimal_6": random.randint(-2, 10),
        "decimal_long": 0.9999233231231213142635441562382713481,
        "1234": random.choice(num_string),
        # "中文数字": i,
        # "grace_number": random.randint(0, 2),
        # "url": " ",
        # "超长字段名称long——field_name超长字段名称long——field_name超长字段名称long——field_name超长字段名称long——field_name超长字段名称long——field_name": "超长字段名称long——field_value超长字段名称long——field_valu超长字段名称long——field_valu超长字段名称long——field_valu超长字段名称long——field_valu",
        # random.choice(chinese_key): random.choice(chinese_value),
        # random.choice(special_key): random.choice(chinese_value),
        # random.choice(special_character): random.choice(special_character),
        "PHONE": 19910534010,
        # "boolean0506":True,
        "ID":"35078119640307042X",
        # "二进制":10101110,
        # "中文字符": "北京市朝阳区霄云路华瑞大厦",
        # "list": "[1,2,3,'test','_test']",
        # "email_address":"grace.chao@cloudwise.com",
        # "bank": -53,
        # "bank_card19": "6222024947304015711",
        # "bank_card13": "7812345678901",
        # "bank_card14": "57123456789012",
        # "bank_card15": "622848038310831",
        # "bank_card16": "5570123456789012",
        # "bank_card17": "62284803532567982",
        # "bank_card18": "622848039414935897",
        # "bank_card19": "6222080000000000001",
        # "huanhang":message101,
        # "int": random.randint(2, 900),
        # "message": "换行符\n空格符\t转义\r转义\f",
        "cmdb":"新版个人手机银行",
        "name":"cmdbname富集算子测试",
        "namebk":"cmdbnamebk富集算子测试",
        "message": "2023-05-17 19:49:18.513|ERROR|543296|http-nio-19401-exec-3|c.c.d.s.i.DoopServiceIntercep19910534019",
        # "chart":'@#￥%……&*（）（*&……%￥#@！北大街从不是大家bdshbsdj123456789{}|:"<>?',
        # "升级后新增":"升级后新增",

        # "字段中文": "asd",
        # "晁亚丽":"hahahahahhahhahah",
        # "lamber153": 1,
        # "integer_str": str(random.randint(2, 3)),
        # "decimal_2": random.uniform(-3.123456789000987654321, 3.3),
        # "trace_id": "1698311362254_trace_id",
        # "time1": "2020.12.21 13:04:11",
        # "lamber157": -0.557,
        # "tag清洗字段key":str(random.randint(1,100)),
        # random.choice(special_character): random.choice(special_character),
        # "filename": "/home/ifsptsi/tomcat/logs/catalina.out",
        # "network_bytes_written.new.old.number.random.sunshine.happy.peng": random.randrange(-3,6),
        # "shuzu":[1,2,3],
        # "er_shuzu": [[1,2,3],[4,5,6]],
        # "shuzu_json": [
        #     {"duixiang1":"duixiang1"},{"duixaing2":"duixaing2"}
        # ],
        # "a": {
        #     "b": {"Ab1中文": "一转多"},
        #     "C":{
        #         "D":4,
        #         "E":4,
        #         "F":{
        #             "G":5,
        #             "H":{
        #                 "I":6,
        #                 "J":{
        #                     "L":5
        #                 }
        #             }
        #         }
        #     }
        # },
        # "A":{
        #     "B":{
        #         "cList":[
        #             {"CPU":"50%"},
        #             {"Memory":"70%"},
        #             {"Disk":"80%"}
        #         ]
        #     }
        # }

    }
    for topic in kafkaTopic:
        producer.send(topic, data)
    print("分割线--------------------------------")
    # print("已发送:", i + len(kafkaTopic) )
    time.sleep(1)
    # 每条数据间隔时间,单位秒
    data = json.dumps(data)
    print("已发送", i, "条数据:", "数据内容：",data)
    i = i+1
else:
    producer.close()
    print("发送数据结束----------------------")