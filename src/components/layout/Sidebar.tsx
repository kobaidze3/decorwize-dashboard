
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedButton } from "../ui-custom/AnimatedButton";
import { BlurPanel } from "../ui-custom/BlurPanel";
import { ChevronLeft, ChevronRight, LayoutDashboard, Wallpaper, Home } from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "Wallpapers",
      path: "/wallpapers",
      icon: <Wallpaper className="h-5 w-5" />
    },
    {
      name: "Interiors",
      path: "/interiors",
      icon: <Home className="h-5 w-5" />
    }
  ];

  return (
    <div className={cn("relative flex h-screen flex-col", className)}>
      <BlurPanel
        darker
        className={cn(
          "fixed z-10 h-screen transition-all duration-300 ease-in-out flex flex-col py-6",
          collapsed ? "w-20" : "w-64",
          "rounded-none border-r border-r-border/50"
        )}
      >
        <div className="flex items-center justify-between px-4 mb-6">
          <div
            className={cn(
              "flex items-center gap-3 transition-opacity duration-300",
              collapsed ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="rounded-full bg-primary p-1.5">
              <Wallpaper className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-medium">DecorWise</h1>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-1.5 hover:bg-muted transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="space-y-2 px-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 transition-all duration-200",
                "hover:bg-muted/80 hover:text-primary",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              {item.icon}
              <span
                className={cn(
                  "ml-3 transition-all duration-300",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="px-3 mt-6">
          <AnimatedButton
            variant="outline"
            className={cn(
              "w-full justify-center",
              collapsed ? "aspect-square p-2" : "px-4 py-2"
            )}
          >
            <Wallpaper className="h-5 w-5" />
            <span
              className={cn(
                "ml-2 transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}
            >
              Visualize
            </span>
          </AnimatedButton>
        </div>
      </BlurPanel>
    </div>
  );
};

export { Sidebar };
