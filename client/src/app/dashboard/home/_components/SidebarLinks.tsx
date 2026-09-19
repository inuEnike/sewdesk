import { FaBitcoin, FaFirstOrderAlt } from "react-icons/fa6";
import { RiUserCommunityFill } from "react-icons/ri";
import {
  RxDashboard,
  RxCube,
  RxGroup,
  RxRulerSquare,
  RxCalendar,
  RxCardStack,
  RxBarChart,
  RxBell,
  RxGear,
} from "react-icons/rx";

export const sidebarNavigation = [
  {
    title: "Dashboard",
    icon: RxDashboard,
    path: "/dashboard/home",
    section: "main",
  },
  {
    title: "Orders",
    icon: FaFirstOrderAlt,
    path: "/dashboard/home/orders",
    section: "main",
  },
  {
    title: "Clients",
    icon: RiUserCommunityFill,
    path: "/dashboard/home/clients",
    section: "main",
  },
  {
    title: "Measurements",
    icon: RxRulerSquare,
    path: "/dashboard/home/measurements",
    section: "main",
  },
  {
    title: "Appointments",
    icon: RxCalendar,
    path: "/dashboard/home/appointments",
    section: "main",
  },
  {
    title: "Payments",
    icon: FaBitcoin,
    path: "/dashboard/home/payments",
    section: "main",
  },
  {
    title: "Reports",
    icon: RxBarChart,
    path: "/dashboard/home/reports",
    section: "main",
  },
  {
    title: "Notifications",
    icon: RxBell,
    path: "/dashboard/home/notifications",
    section: "secondary",
  },
  {
    title: "Settings",
    icon: RxGear,
    path: "/dashboard/home/settings",
    section: "secondary",
  },
];
