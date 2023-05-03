/**
 * 
 * @returns Trả ra kiểu dữ liệu uuid
 */
export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


/**
 * 
 * @returns Hàm trả ra địa chỉ url avatar mặc định khi avatar bị rỗng
 */
export function urlAvatarDefault(){
  return "avatar/c270fd44-e7d3-11ed-906e-907841e9040c.png";
}
  