
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  className?: string;
}

export function PopupMenu({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  showHeader = true, 
  className 
}: PopupMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] flex items-end justify-center transition-all duration-300",
      isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
    )}>
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Popup Content - Bottom Sheet Style */}
      <div className={cn(
        "relative w-full max-w-lg bg-background rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out",
        "max-h-[85vh] overflow-hidden",
        isOpen ? "translate-y-0" : "translate-y-full",
        className
      )}>
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-2" />
        
        {showHeader && (
          <div className="flex items-center justify-between p-4 pb-2">
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="ml-auto hover:bg-secondary/80 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        
        <div className="px-4 pb-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
