export default {
  getTime: function () {
    var now = new Date();
    var year = now.getFullYear();
    var mou = now.getMonth() + 1;
    var day = now.getDate();
    var week = now.getDay();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    return {
      "year": year,
      "mou": mou,
      "day": day,
      "week": week,
      "hour": hour,
      "min": min,
      "sec": sec,
    }
  }
}
