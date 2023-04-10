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
