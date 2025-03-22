
import { cn } from "@/lib/utils";
import React from "react";

interface BlurPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  darker?: boolean;
}

const BlurPanel = React.forwardRef<HTMLDivElement, BlurPanelProps>(
  ({ children, className, darker = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          darker ? "glass-panel-darker" : "glass-panel",
          "rounded-lg p-4 transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BlurPanel.displayName = "BlurPanel";

export { BlurPanel };
