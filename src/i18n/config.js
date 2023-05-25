import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "vi", // Ngôn ngữ mặc định
  fallbackLocale: "en", // Nếu không tìm thấy ngôn ngữ được yêu cầu, thì sử dụng ngôn ngữ này
  messages: {
    en: {
      // Định nghĩa các chuỗi đa ngôn ngữ ở đây
      welcome: "Welcome back",
      username: "Username",
      password: "Password",
      rememberme: "Remember me",
      signin: "Sign in",
      signup: "Sign up",
      signinsub: "Enter your username and password to sign in",
      donthaveaccount: "Don't have an account?",
      company: "Company",
      aboutus: "About Us",
      team: "Team",
      products: "Products",
      blog: "Blogs",
      pages: "Pages",
      dashboard: "Dashboard",
      tables: "Tables",
      moviemanage: "Movie Manage",
      bill: "Bill",
      rtl: "Rtl",
      languages: "Languages",
      appconfig: "App config",
      subappconfig: "See dashboard options.",
      sidebarcolors: "Sidebar colors",
      navbarfixed: "Navbar fixed",
      sidenavtype: "Sidenav type",
      subsidenavtype: "Choose between 2 different sidenav types.",
      transparent: "Transparent",
      white: "White",
      lang: "English",
      MovieCode: "Movie Code",
      MovieName: "Movie Name",
      FromDate: "From Date",
      ToDate: "To Date",
      Language: "Language",
      ReleaseDate: "Release Date",
      Actor: "Actor",
      Direction: "Direction",
      Director: "Director",
      Trailer: "Trailer",
      Poster: "Poster",
      Content: "Content",
      Type: "Type",
      PickADay: "Pick A Day",
      Typehere: "Type here...",
      TypeMovie: "Type Movie",
      CategoryMovie: "Category",
      PCategoryMovie: "Select Categorys",
      PTypeMovie: "Select Type Movie",
      Search: "Search",
      showtimemanage: "Showtime Manage",
      welcomesignin: "Welcome!",
      createnewaccount: "Create new account",
      Register: "Register",
      agreeterm: "I agree the Terms and Conditions",
      haveaccount: "Already have an account?",
      Name: "Name",
      Ticket: "Ticket",
      ReportAndStatistic: "Report And Statistic",
      History: "History",
      Revenue: "Revenue",
      Payment: "Payment",
      FEATURE: "FEATURE",
      TimeLine: "Time line",
      CinemaRoomManage: "Cinema Room Manage",
      EnterRoomName: "Enter room name",
      EnterTheRowNumber: "Enter the row number",
      EnterTheColNumber: "Enter the col number",
      RoomName: "Room Name",
      RowNumber: "Row Number",
      ColNumber: "Col Number",
      UpdateSuccessful: "Update successful",
      No: "No",
      Timel: "Time",
      Cost: "Cost",
      SeatType: "Seat Type",
      Releasedate: "Release date",
      Languagel: "Language",
      Account: "Account",
      Password: "Password",
      Name: "Name",
      DateOfBirth: "Date Of Birth",
      PhoneNumber: "Phone Number",
      Role: "Role",
      Cinema: "Cinema",
      Gender: "Gender",
      Email: "Email",
      Avatar: "Avatar",
      Dictionary: "Dictionary",
      TemplateTimeCode: "Template Time Code",
      TemplateTime: "Template Time",
      nActor: "Actor",
      Min: "Min",
      nShowDate: "Show date",
      nEndDate: "End date",
      Statisticsbyday: "Statistics by day",
      Statisticsbymonth: "Statistics by month",
      Statisticsbyyear: "Statistics by year",
      Systemaccount: "System account",
      Customeraccount: "Customer account",
      Detail: "Detail",
      Addnew: "Add new",
      Approve: "Approve",
      Roomlist: "Room list",
      Accountdetails: "Account details",
      Male: "Male",
      Female: "Female",
      Other: "Other",
      Normal: "Normal",
      Morescreenings: "More screenings",
      Moremoviescreenings: "More screenings of the movie",
      Newmovies: "New Movies",
      Moremovieroom: "More movie room",
      Add: "Add",
      Seeshowtimes:"See showtimes",
      Screeningsofthemovie:"Screenings of the movie",
      Back: "Back",
      Cancel: "Cancel",
      Deleteroom:"Delete room",
      Deleteseat: "Delete seat",
      Delete: "Delete",
      Save: "Save",
      Close:"Close",
      Timeframe: "Timeframe",
      Timeframecode: "Timeframe code",
      Moretimeframe: "More Timeframe",
      Moviedictionary: "Movie Dictionary",
      Showtimedictionary: "Showtime Dictionary",
      Typemoviecode:"Type code",
      Typemoviename: "Type name",
      Categorycode: "Category code",
      Categoryname: "Category name",
      Accountapproval: "Account approval",
      Normalupdate: "Normal update",
      VIPupdate:"VIP update",
      Update: "Update",
      Maintenanceupdate: "Maintenance update",
      Normalseat: "Normal seat",
      VIPseat: "VIP seat",
      Maintenance: "Maintenance",
      Selecting: "Selecting",
      Note: "Note",
      Cinemaroom: "Cinema room",
      NewAccount: "New Account",
      NowShowing: "Now Showing",
      AccountName: "Account name",
      Logout: "Logout",
      LanguageCode: "Language code",
      LanguageName: "Language name",
      Addnewlanguage: "Add new language"
    },
    vi: {
      welcome: "Chào mừng trở lại",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      rememberme: "Nhớ mật khẩu",
      signin: "Đăng nhập",
      signup: "Đăng ký",
      signinsub: "Nhập tên người dùng và mật khẩu của bạn để đăng nhập",
      donthaveaccount: "Bạn chưa có tài khoản?",
      company: "Công ty",
      aboutus: "Thông tin",
      team: "Đội ngũ",
      products: "Sản phẩm",
      blog: "Blogs",
      pages: "Trang",
      dashboard: "Trang điều khiển",
      tables: "Bảng",
      moviemanage: "Quản lý phim",
      bill: "Hóa đơn",
      rtl: "Rtl",
      languages: "Ngôn ngữ",
      appconfig: "Cấu hình ứng dụng",
      subappconfig: "Xem tùy chọn.",
      sidebarcolors: "Màu thanh trái",
      navbarfixed: "Ghim thanh trên",
      sidenavtype: "Loại thanh bên",
      subsidenavtype: "Chọn giữa 2 loại thanh bên.",
      transparent: "Trong suốt",
      white: "Trắng",
      lang: "Tiếng Việt",
      MovieCode: "Mã Phim",
      MovieName: "Tên Phim",
      FromDate: "Từ Ngày",
      ToDate: "Đến Ngày",
      Language: "Ngôn Ngữ",
      ReleaseDate: "Ngày Công Chiếu",
      Actor: "Diễn Viên",
      Direction: "Đạo Diễn",
      Director: "Đạo diễn",
      Trailer: "Trailer",
      Poster: "Poster",
      Content: "Nội Dung",
      Type: "Loại",
      PickADay: "Chọn Một Ngày",
      Typehere: "Nhập tại đây ...",
      TypeMovie: "Dạng phim",
      CategoryMovie: "Thể loại",
      PCategoryMovie: "Chọn các thể loại",
      PTypeMovie: "Chọn một dạng phim",
      Search: "Tìm kiếm",
      showtimemanage: "Quản lý suất chiếu",
      welcomesignin: "Xin Chào!",
      createnewaccount: "Tạo một tài khoản mới",
      Register: "Đăng ký",
      agreeterm: "Tôi đồng ý với các Điều khoản và Điều kiện",
      haveaccount: "Bạn đã có sẵn tài khoản?",
      Name: "Tên",
      Ticket: "Vé",
      ReportAndStatistic: "Báo cáo và thống kê",
      History: "Lịch sử",
      Revenue: "Doanh thu",
      Payment: "Thanh toán",
      FEATURE: "TÍNH NĂNG",
      TimeLine: "Thời lượng",
      CinemaRoomManage: "Quản lí phòng chiếu",
      EnterRoomName: "Nhập tên phòng",
      EnterTheRowNumber: "Nhập số hàng",
      EnterTheColNumber: "Nhập số cột",
      RoomName: "Tên Phòng",
      RowNumber: "Số Hàng",
      ColNumber: "Số Cột",
      UpdateSuccessful: "Cập nhật thành công",
      No: "Số",
      Timel: "Thời lượng",
      Cost: "Giá",
      SeatType: "Loại ghế",
      Releasedate: "Ngày công chiếu",
      Languagel: "Ngôn ngữ",
      Account: "Tài khoản",
      Password: "Mật khẩu",
      Name: "Tên",
      DateOfBirth: "Ngày sinh",
      PhoneNumber: "Điện thoại",
      Role: "Quyền",
      Cinema: "Rạp phim",
      Gender: "Giới tính",
      Email: "Email",
      Avatar: "Ảnh đại diện",
      Dictionary: "Danh mục",
      TemplateTimeCode: "Mã khung giờ",
      TemplateTime: "Khung giờ",
      nActor: "Diễn viên",
      Min: "Phút",
      nShowDate: "Ngày chiếu",
      nEndDate: "Ngày kết thúc",
      Statisticsbyday: "Thống kê theo ngày",
      Statisticsbymonth: "Thống kê theo tháng",
      Statisticsbyyear: "Thống kê theo năm",
      Systemaccount: "Tài khoản hệ thống",
      Customeraccount: "Tài khoản khách hàng",
      Detail: "Chi tiết",
      Addnew: "Thêm mới",
      Approve: "Phê duyệt",
      Roomlist: "Danh sách phòng",
      Accountdetails: "Chi tiết tài khoản",
      Male: "Nam",
      Female: "Nữ",
      Other: "Khác",
      Normal: "Thường",
      Morescreenings: "Thêm suất chiếu",
      Moremoviescreenings: "Thêm suất chiếu phim",
      Newmovies: "Thêm mới phim",
      Moremovieroom: "Thêm phòng chiếu phim",
      Add: "Thêm",
      Seeshowtimes:"Xem suất chiếu",
      Screeningsofthemovie:"Các suất chiếu của phim",
      Back: "Trở lại",
      Cancel:"Hủy",
      Deleteroom:"Xóa phòng",
      Deleteseat: "Xóa ghế",
      Delete: "Xóa",
      Save: "Lưu",
      Close: "Đóng",
      Timeframe: "Khung giờ chiếu",
      Timeframecode: "Mã khung giờ",
      Moretimeframe: "Thêm mới khung giờ",
      Moviedictionary: "Danh mục phim",
      Showtimedictionary: "Danh mục suất chiếu",
      Typemoviecode:"Mã loại",
      Typemoviename: "Tên loại",
      Categorycode: "Mã thể loại",
      Categoryname: "Tên thể loại",
      Accountapproval: "Phê duyệt tài khoản",
      Normalupdate: "Cập nhật thường",
      VIPupdate:"Cập nhật VIP",
      Update: "Cập nhật",
      Maintenanceupdate: "Cập nhật bảo trì",
      Normalseat: "Ghế thường",
      VIPseat: "Ghế VIP",
      Maintenance: "Bảo trì",
      Selecting: "Đang chọn",
      Note: "Chú thích",
      Cinemaroom: "Phòng chiếu",
      NewAccount: "Thêm mới tài khoản",
      NowShowing: "Phim đang chiếu",
      AccountName: "Tên tài khoản",
      Logout: "Đăng xuất",
      LanguageCode: "Mã ngôn ngữ",
      LanguageName: "Tên ngôn ngữ",
      Addnewlanguage: "Thêm mới ngôn ngữ"
    },
  },
});

export default i18n;
