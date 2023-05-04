export var slideitems = [
  {
    name: "Movie Manage",
    icon: "virtual-reality",
    text: "moviemanage",
  },
  {
    name: "ShowTime Manage",
    icon: "virtual-reality",
    text: "showtimemanage",
  },
  {
    name: "Ticket",
    icon: "dashboard",
    text: "Ticket",
  },
  {
    name: "ReportAndStatistic",
    icon: "dashboard",
    text: "ReportAndStatistic",
  },
  {
    name: "History",
    icon: "dashboard",
    text: "History",
  },
  {
    name: "Cinema Room",
    icon: "dashboard",
    text: "CinemaRoomManage",
  },
  {
    name: "Account Manage",
    icon: "dashboard",
    text: "Account",
  },
  {
    name: "Dictionary",
    icon: "dashboard",
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
