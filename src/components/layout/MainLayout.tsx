
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/80">
      <Sidebar />
      <main className={cn("flex-1 pl-20 lg:pl-64", className)}>
        <div className="container py-6 max-w-7xl animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export { MainLayout };
