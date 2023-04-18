
export var slideitems = [
  {
    name: "Movie Manage",
    icon: "virtual-reality",
    text: 'moviemanage'
  },
  {
    name: "ShowTime Manage",
    icon: "virtual-reality",
    text: 'showtimemanage'
  },
  {
    name: "Ticket",
    icon: "dashboard",
    text: "Ticket"
  },
  {
    name: "ReportAndStatistic",
    icon: "dashboard",
    text: "ReportAndStatistic"
  },
  {
    name: "History",
    icon: "dashboard",
    text: "History"
  },
  {
    name: "Revenue",
    icon: "dashboard",
    text: "Revenue"
  },
  {
    name: "Payment",
    icon: "dashboard",
    text: "Payment"
  },
  {
    name: "Cinema Room",
    icon: "dashboard",
    text: "CinemaRoomManage"
  }
];


export const listSeat = {
  row: 8,
  col: 10,
  
}

export function convertLetter(number){
  return String.fromCharCode(64 + number);
}