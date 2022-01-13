// 格式化時間
function format_time(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    // 顯示時間日期格式 yymmdd

    //適配ios時間日期格式




    if (hour == 0 && minute == 0 && second == 0) {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return [year, month, day].map(formatNumber).replace(/-/g,'/');
        } else {
            return [year, month, day].map(formatNumber).join('-') + ' ';
        }

    } else {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
            // return [year,month,day].map(formatNumber).replace(/-/g,'/')
        } else {
            // return [year, month, day].map(formatNumber).join('-')+'';
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
        }
    }
    
    

}
exports.format_time = format_time;
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
//# sourceMappingURL=format_time.js.map
