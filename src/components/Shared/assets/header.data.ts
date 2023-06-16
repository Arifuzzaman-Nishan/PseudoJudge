import { AiOutlineHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbBrandGravatar } from "react-icons/tb";

export const headerData = [
  {
    id: 1,
    title: "Home",
    icon: AiOutlineHome,
    path: "/",
  },
  {
    id: 2,
    title: "Notifications",
    icon: IoNotificationsOutline,
    path: "/notifications",
  },
  {
    id: 3,
    title: "Avatar",
    icon: TbBrandGravatar,
    path: "",
  },
];
