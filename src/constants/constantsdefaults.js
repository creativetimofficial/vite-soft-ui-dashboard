export var slideitems = [
  {
    name: "Movie Manage",
    icon: "movie",
    text: "moviemanage",
  },
  {
    name: "ShowTime Manage",
    icon: "showtime",
    text: "showtimemanage",
  },
  {
    name: "Ticket",
    icon: "tickets",
    text: "Ticket",
  },
  {
    name: "ReportAndStatistic",
    icon: "reports",
    text: "ReportAndStatistic",
  },
  {
    name: "History",
    icon: "historys",
    text: "History",
  },
  {
    name: "Cinema Room",
    icon: "rooms",
    text: "CinemaRoomManage",
  },
  {
    name: "Account Manage",
    icon: "users",
    text: "Account",
  },
  {
    name: "Dictionary",
    icon: "dictionarys",
    text: "Dictionary",
  },
];

export const listSeat = {
  row: 8,
  col: 10,
};

export function convertLetter(number) {
  return String.fromCharCode(64 + number);
}

export function defaultRole() {
  return [
    {
      role: 1,
      nameRole: "Admin",
    },
    {
      role: 2,
      nameRole: "Employee",
    },
    {
      role: 3,
      nameRole: "Manager",
    },
  ];
}

export const filterMovie = [
  {
    value: 1,
    name: "Đang chiếu",
  },
  {
    value: 0,
    name: "Tất cả",
  },
  {
    value: 2,
    name: "Sắp chiếu",
  },
];
