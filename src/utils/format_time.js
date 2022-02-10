// 格式化時間
function format_time(time) {
  
    // //格式化日期格式
    // var date = new Date(time);
    // //获取年份
    // var year = date.getFullYear();
    // //获取月份
    // var month = date.getMonth() + 1;
    // //获取日期
    // var day = date.getDate();
    // //获取小时
    // var hour = date.getHours();
    // //获取分钟
    // var minute = date.getMinutes();
    // //在小于10的数字前加0
    // var hour = hour < 10 ? '0' + hour : hour;
    // var minute = minute < 10 ? '0' + minute : minute;


    //格式化时间
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    //在小于10的数字前加0
    var hour = hour < 10 ? '0' + hour : hour;
    var minute = minute < 10 ? '0' + minute : minute;

    //月份小于10的在前面加0
    var month = month < 10 ? '0' + month : month;
    //日期小于10的在前面加0
    var day = day < 10 ? '0' + day : day;
    


    //拼接
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    // 在 ios 上显示的时间格式
    
    return time;



}

exports.format_time = format_time;


