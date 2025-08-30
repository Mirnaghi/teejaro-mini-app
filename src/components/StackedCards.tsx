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
  onClick?: () => void;
}

interface StackedCardsProps {
  cards: CardData[];
  onCardClick?: (cardId: string) => void;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
  isSwiping: boolean;
}

export function StackedCards({ cards, onCardClick }: StackedCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStateRef = useRef<TouchState>({ startX: 0, startY: 0, startTime: 0, isSwiping: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    if (isAnimating || currentIndex >= cards.length - 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevCard = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
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
      // Cards behind (left)
      return {
        transform: `translateX(-${Math.abs(position) * 20}px) scale(${1 - Math.abs(position) * 0.05})`,
        zIndex: 10 - Math.abs(position),
        opacity: 0.6
      };
    } else if (position === 0) {
      // Current card
      return {
        transform: 'translateX(0px) scale(1)',
        zIndex: 20,
        opacity: 1
      };
    } else {
      // Cards ahead (right)
      return {
        transform: `translateX(${position * 20}px) scale(${1 - position * 0.05})`,
        zIndex: 10 - position,
        opacity: Math.max(0.4, 1 - position * 0.2)
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
      className="relative h-48 mb-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevCard}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:bg-secondary/80 transition-colors"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      {currentIndex < cards.length - 1 && (
        <button
          onClick={nextCard}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:bg-secondary/80 transition-colors"
          disabled={isAnimating}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Stacked Cards */}
      <div className="relative h-full px-8">
        {cards.map((card, index) => {
          const cardStyle = getCardStyle(index);
          return (
          <Card
            key={card.id}
            className={`absolute top-0 left-8 right-8 h-44 ${card.gradientClass} border-border shadow-card cursor-pointer transition-all duration-300 ease-out select-none`}
            style={cardStyle}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-6 h-full flex flex-col justify-between">
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
              <div className="mt-auto">
                <div className="w-12 h-8 bg-gradient-primary rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>

      {/* Dots indicator */}
      {cards.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  );
}