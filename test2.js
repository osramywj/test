function differenceA2B(elements, comparisons){
    let differences = [];
    elements.forEach(ele => {
        comparisons.forEach(comparison => {
            const intersection =  _intersection(ele, comparison);
            if(!_.isEmpty(intersection)){
                const diff = _difference(ele, intersection);
                if(!_.isEmpty(diff)) differences = differences.concat(diff);
            }
        });
    });

    return differences;
}

/**
 * 求交集
 * @param {*} ele 
 * @param {*} comparison 
 */
function _intersection(ele, comparison){
    let intersection = {};
    const maxStartTime = _.max([ele.startTime, comparison.startTime]);
    const minEndTime = _.min([ele.endTime, comparison.endTime]);
    if(maxStartTime < minEndTime) {
        intersection = {
            startTime: maxStartTime,
            endTime: minEndTime
        };
    }

    return intersection;
}

function _difference(ele, comparison){
    let differences = [];
    const intersection = _intersection(ele, comparison);
    if(_.isEmpty(intersection)) {
        differences.push(ele);
        return differences;
    }

    if(ele.startTime < intersection.startTime) differences.push({startTime: ele.startTime, endTime: intersection.startTime});
    if(intersection.endTime < ele.endTime) differences.push({startTime: intersection.endTime, endTime: ele.endTime});
    return differences;
}

const elements=[{startTime:1562715000000,endTime:1562727600000}]
const comparison=[{startTime:1562716800000,endTime:1562719500000},{startTime:1562720400000,endTime:1562723100000}]
const res = differenceA2B(elements, comparison).map(t => ({startTime: new Date(t.startTime), endTime: new Date(t.endTime)}));
// console.log(res);






/**
 * 计算‘有效闲时’和‘课表’
 *
 * @param {Object} lessonInfo
 * @param {Array}  lessonInfo.lessonTimes
 * @param {Array}  lessonInfo.freeTimes
 * @param {Object} configInfo
 * @param {Object} option
 * @param {Object} option.startTime
 * @param {Object} option.endTime
 * @returns {Object}  freeTime
 * @returns {Array} freeTime.availableFreeTime      - 有效闲时
 * @returns {Array}  freeTime.teacherLessonRange          - 课表
 *
 */
function getFreeTime(lessonInfo, configInfo, option) {
    let {lessonTimes, freeTimes} = lessonInfo;
    let startTime, endTime;
    if (!_.isNil(option.endTime)) {
        startTime = option.startTime,
            endTime = option.endTime;
    } else {
        startTime = option.startTime;
        endTime = option.startTime + 3600 * 1000;
    }
    lessonTimes = lessonTimes.filter(lessonInfo => {
        return startTime <= lessonInfo.startTime && lessonInfo.startTime <= endTime;
    });

    let {workdayConfig, weekendConfig, holidayConfig} = _getRecommendTeacherValidIdleTimeConfig(configInfo);

    holidayConfig = holidayConfig.map(function (item) {
        let yearStart = moment(startTime).startOf('year').valueOf();
        return [item[0] + yearStart, item[1] + yearStart];
    });

    let startWeekday = moment(startTime).isoWeekday();

    //获取startTime 后period天的有效闲时区间
    let availableFreeTimeOfWeek = [];
    let period = Math.ceil((endTime - startTime) / (24 * 60 * 60 * 1000));
    for (let i = startWeekday; i < startWeekday + period; i++) {
        let res = [];
        let dayStart = moment(startTime).add(i - startWeekday, 'days').startOf('day').valueOf();
        //判断是否是节假日或周末
        let isWeekend = i <= 7 ? i > 5 : i - 7 > 5;
        if (_isInRange(dayStart, holidayConfig) || isWeekend) {
            res = weekendConfig.map(function (item) {
                return [item[0] + dayStart, item[1] + dayStart];
            });
        } else {
            res = workdayConfig.map(function (item) {
                return [item[0] + dayStart, item[1] + dayStart];
            });
        }
        availableFreeTimeOfWeek = availableFreeTimeOfWeek.concat(res);
    }

    //转化成时间戳的闲时
    let freePeriodRange = [];
    if (freeTimes.length > 0) {
        _.each(freeTimes, function (item) {
            let addition = 0;
            if (item.dayOfWeek < startWeekday) {
                addition = 7 - (startWeekday - item.dayOfWeek);
            } else {
                addition = item.dayOfWeek - startWeekday;
            }
            let dayStart = moment(startTime).add(addition, 'days').startOf('day').valueOf();
            let start = item.startOffsetMilliseconds + dayStart;
            let end = item.endOffsetMilliseconds + dayStart;
            freePeriodRange.push([start, end]);
        });
    }

    //有效闲时
    let availableFreeTime = _intersection(freePeriodRange, availableFreeTimeOfWeek);

    let teacherLessonRange = [];

    if (lessonTimes.length > 0) {
        _.each(lessonTimes, function (item) {
            let start = item.startTime;
            let end = item.endTime;
            teacherLessonRange.push([start, end]);
        });
    }

    let freeTime = {
        availableFreeTime: availableFreeTime,
        teacherLessonRange: teacherLessonRange
    };

    return freeTime;
}

