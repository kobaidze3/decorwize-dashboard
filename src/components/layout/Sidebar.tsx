
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedButton } from "../ui-custom/AnimatedButton";
import { BlurPanel } from "../ui-custom/BlurPanel";
import { ChevronLeft, ChevronRight, LayoutDashboard, Wallpaper, Home, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Auto-collapse on mobile
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
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
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: <CreditCard className="h-5 w-5" />
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
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[var(--primary-color)] p-1.5">
                <Wallpaper className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-medium text-[var(--text-primary)]">DecorWise</h1>
            </div>
          )}
          <button
            onClick={toggleCollapsed}
            className={cn(
              "rounded-full p-1.5 hover:bg-muted transition-colors",
              collapsed ? "mx-auto" : ""
            )}
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
                "hover:bg-muted/80 hover:text-[var(--primary-color)]",
                location.pathname === item.path
                  ? "bg-[var(--primary-color)]/10 text-[var(--primary-color)]"
                  : "text-muted-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
              title={collapsed ? item.name : ""}
            >
              {item.icon}
              {!collapsed && (
                <span className="ml-3">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="px-3 mt-6">
          <AnimatedButton
            variant="outline"
            className={cn(
              "w-full justify-center",
              collapsed ? "p-2" : "px-4 py-2",
              "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90"
            )}
            title={collapsed ? "Visualize" : ""}
          >
            <Wallpaper className="h-5 w-5" />
            {!collapsed && (
              <span className="ml-2">
                Visualize
              </span>
            )}
          </AnimatedButton>
        </div>
      </BlurPanel>
    </div>
  );
};

export { Sidebar };
