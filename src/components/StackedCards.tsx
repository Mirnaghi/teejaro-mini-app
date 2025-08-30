import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardData {
  id: string;
  title: string;
  status: "Active" | "Coming Soon" | "Blocked";
  cardNumber: string;
  gradientClass: string;
  balance: string;
  onClick?: () => void;
}

interface StackedCardsProps {
  cards: CardData[];
  onCardClick?: (cardId: string) => void;
  onCardChange?: (cardIndex: number, balance: string) => void;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
  isSwiping: boolean;
}

export function StackedCards({ cards, onCardClick, onCardChange }: StackedCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStateRef = useRef<TouchState>({ startX: 0, startY: 0, startTime: 0, isSwiping: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    if (isAnimating || currentIndex >= cards.length - 1) return;
    setIsAnimating(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    if (onCardChange) {
      onCardChange(newIndex, cards[newIndex].balance);
    }
  };

  const prevCard = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onCardChange) {
      onCardChange(newIndex, cards[newIndex].balance);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleCardClick = (cardId: string) => {
    if (onCardClick && !touchStateRef.current.isSwiping) {
      onCardClick(cardId);
    }
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isSwiping: false
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStateRef.current.startX) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
    const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
    
    // If horizontal movement is greater than vertical, prevent scrolling
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      touchStateRef.current.isSwiping = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStateRef.current.startX || isAnimating) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStateRef.current.startX;
    const deltaY = touch.clientY - touchStateRef.current.startY;
    const deltaTime = Date.now() - touchStateRef.current.startTime;
    
    // Minimum swipe distance and maximum time for a valid swipe
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;
    
    // Check if it's a valid horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance && 
        Math.abs(deltaX) > Math.abs(deltaY) && 
        deltaTime < maxSwipeTime) {
      
      if (deltaX > 0) {
        // Swipe right - go to previous card
        prevCard();
      } else {
        // Swipe left - go to next card
        nextCard();
      }
    }
    
    // Reset touch state after a delay to prevent immediate clicks
    setTimeout(() => {
      touchStateRef.current.isSwiping = false;
    }, 100);
  };

  const getCardStyle = (index: number) => {
    const position = index - currentIndex;
    
    if (position < 0) {
      // Cards behind - hidden
      return {
        transform: `translateY(-${Math.abs(position) * 12}px) scale(${1 - Math.abs(position) * 0.1})`,
        zIndex: 10 - Math.abs(position),
        opacity: 0
      };
    } else if (position === 0) {
      // Current card
      return {
        transform: 'translateY(0px) scale(1)',
        zIndex: 20,
        opacity: 1
      };
    } else {
      // Cards ahead - visible stack below
      return {
        transform: `translateY(${position * 12}px) scale(${1 - position * 0.04})`,
        zIndex: 20 - position,
        opacity: Math.max(0.6, 1 - position * 0.15)
      };
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "secondary";
      case "Coming Soon": return "outline";
      case "Blocked": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-56 mb-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stacked Cards */}
      <div className="relative h-full px-2">
        {cards.map((card, index) => {
          const cardStyle = getCardStyle(index);
          return (
          <Card
            key={card.id}
            className={`absolute top-0 left-2 right-2 h-52 ${card.gradientClass} border-border shadow-card cursor-pointer transition-all duration-300 ease-out select-none`}
            style={cardStyle}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
              {/* Card Background Patterns */}
              {card.id === "visa-virtual" && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/30 rounded-lg rotate-45"></div>
                </div>
              )}
              {card.id === "crypto-card" && (
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute top-12 right-12 w-4 h-4 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                    <Badge variant={getBadgeVariant(card.status)} className="mt-1">
                      {card.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
                  </div>
                </div>
              </div>
              
              {/* Balance Display on Card */}
              <div className="relative z-10 mt-auto">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/80 mb-1">Balance</p>
                    <p className="text-2xl font-bold text-white">{card.balance}</p>
                  </div>
                  <div className="w-12 h-8 bg-gradient-primary rounded-md"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>

    </div>
  );
}