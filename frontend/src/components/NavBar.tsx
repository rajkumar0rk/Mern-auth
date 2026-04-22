import { useMutation } from "@tanstack/react-query";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Link } from "react-router";
import { logout } from "@/lib/api";
import queryClient from "@/config/queryClient";
import { navigateTo } from "@/lib/navigatios";

const NavBar = () => {
  const { mutate: loggedOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigateTo("/");
    },
  });
  return (
    <NavigationMenu className="flex flex-none max-w-full bg-black/50 justify-between min-h-fit h-18 px-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <div className="px-8 py-3 text-indigo-300 underline">
            DEV-COMMUNITY
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-8 py-3">
            <Link to="/user"> Profile</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-8 py-3">
            <Link to={"/user/settings"}>Settings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="px-9 py-3 bg-white text-black/80"
            onClick={() => loggedOut()}
          >
            Logout
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;
