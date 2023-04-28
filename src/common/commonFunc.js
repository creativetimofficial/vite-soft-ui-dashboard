export function convertDateTime(input) {
  // Tạo đối tượng Date
  let date = new Date(input);

  // Lấy giá trị các thành phần ngày tháng
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên phải cộng thêm 1
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Chuyển đổi thành chuỗi datetime
  let datetime = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return datetime;
}


export function convertDateFormat(date) {
  // Tách ngày, tháng và năm từ chuỗi date
  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  var day = date.substring(8, 10);

  // Tạo chuỗi định dạng mới
  var newDate = day + '/' + month + '/' + year;

  return newDate;
}

export function convertTimeFormat(time) {
  // Tách giờ và phút từ chuỗi time
  var hour = time.substring(0, 2);
  var minute = time.substring(3, 5);

  // Tạo chuỗi định dạng mới
  var newTime = hour + ':' + minute;

  return newTime;
}


export function convertToType(a, type) {
  switch(type) {
    case 'Number':
      return Number(a);
    case 'String':
      return String(a);
    case 'Boolean':
      return Boolean(a);
    case 'Array':
      return Array.from(a);
    case 'Object':
      return Object(a);
    case 'Date':
      return new Date(a);
    default:
      return a;
  }
}