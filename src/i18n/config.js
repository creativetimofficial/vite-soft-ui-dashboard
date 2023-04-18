import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'vi', // Ngôn ngữ mặc định
    fallbackLocale: 'en', // Nếu không tìm thấy ngôn ngữ được yêu cầu, thì sử dụng ngôn ngữ này
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
        Trailer: "Trailer",
        Poster: "Poster",
        Content: "Content",
        Type: "Type",
        PickADay:"Pick A Day",
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
        CinemaRoomManage: "Cinema Room Manage"
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
        ReleaseDate: "Ngày Phát Hành",
        Actor: "Diễn Viên",
        Direction: "Đạo Diễn",
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
        CinemaRoomManage: "Quản lí phòng chiếu"
      }
    }
  })

  export default i18n;

