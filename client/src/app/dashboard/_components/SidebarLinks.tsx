import { useParams } from "next/navigation";
import { FaBitcoin, FaFirstOrderAlt } from "react-icons/fa6";
import { RiUserCommunityFill } from "react-icons/ri";
import {
  RxDashboard,
  RxRulerSquare,
  RxCalendar,
  RxBarChart,
  RxBell,
  RxGear,
} from "react-icons/rx";

const SideNavLinks = () => {
  const { slug } = useParams();

  return [
    {
      title: "Dashboard",
      icon: RxDashboard,
      path: `/dashboard/${slug}/home`,
      section: "main",
    },
    {
      title: "Orders",
      icon: FaFirstOrderAlt,
      path: `/dashboard/${slug}/orders`,
      section: "main",
    },
    {
      title: "Clients",
      icon: RiUserCommunityFill,
      path: `/dashboard/${slug}/clients`,
      section: "main",
    },
    {
      title: "Measurements",
      icon: RxRulerSquare,
      path: `/dashboard/${slug}/measurements`,
      section: "main",
    },
    {
      title: "Appointments",
      icon: RxCalendar,
      path: `/dashboard/${slug}/appointments`,
      section: "main",
    },
    {
      title: "Payments",
      icon: FaBitcoin,
      path: `/dashboard/${slug}/payments`,
      section: "main",
    },
    {
      title: "Reports",
      icon: RxBarChart,
      path: `/dashboard/${slug}/reports`,
      section: "main",
    },
    {
      title: "Notifications",
      icon: RxBell,
      path: `/dashboard/${slug}/notifications`,
      section: "secondary",
    },
    {
      title: "Settings",
      icon: RxGear,
      path: `/dashboard/${slug}/settings`,
      section: "secondary",
    },
  ];
};

export default SideNavLinks;
