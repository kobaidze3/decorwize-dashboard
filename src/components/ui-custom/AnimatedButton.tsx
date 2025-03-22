
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  glass?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, glass = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-in-out",
          "after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity",
          "after:duration-500 hover:after:opacity-100",
          "after:bg-gradient-to-r after:from-primary/10 after:to-primary/5",
          glass && "glass-button",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
