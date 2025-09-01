import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardData {
  id: string;
  title: string;
  status: "Active" | "Coming Soon" | "Blocked";
  cardNumber: string;
  gradientClass: string;
  balance: string;
  onClick?: () => void;
}

interface AnimatedCardsCarouselProps {
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

export function AnimatedCardsCarousel({ cards, onCardClick, onCardChange }: AnimatedCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStateRef = useRef<TouchState>({ startX: 0, startY: 0, startTime: 0, isSwiping: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout>();

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
    if (onCardChange) {
      onCardChange(newIndex, cards[newIndex].balance);
    }
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onCardChange) {
      onCardChange(newIndex, cards[newIndex].balance);
    }
  };

  const goToCard = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    if (onCardChange) {
      onCardChange(index, cards[index].balance);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && cards.length > 1) {
      autoSlideRef.current = setInterval(() => {
        nextCard();
      }, 4000);
    } else {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isHovered, currentIndex, cards.length]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
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
    
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;
    
    if (Math.abs(deltaX) > minSwipeDistance && 
        Math.abs(deltaX) > Math.abs(deltaY) && 
        deltaTime < maxSwipeTime) {
      
      if (deltaX > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    
    setTimeout(() => {
      touchStateRef.current.isSwiping = false;
    }, 100);
  };

  const getCardStyle = (index: number) => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);
    
    if (position === 0) {
      // Current card - center stage with glow effect
      return {
        transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
        zIndex: 30,
        opacity: 1
      };
    } else if (position > 0) {
      // Cards to the right
      return {
        transform: `translateX(${position * 300}px) translateY(${absPosition * 20}px) scale(${1 - absPosition * 0.1}) rotateY(-${Math.min(absPosition * 45, 60)}deg)`,
        zIndex: 30 - absPosition,
        opacity: Math.max(0.4, 1 - absPosition * 0.3)
      };
    } else {
      // Cards to the left
      return {
        transform: `translateX(${position * 300}px) translateY(${absPosition * 20}px) scale(${1 - absPosition * 0.1}) rotateY(${Math.min(absPosition * 45, 60)}deg)`,
        zIndex: 30 - absPosition,
        opacity: Math.max(0.4, 1 - absPosition * 0.3)
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
      className="relative w-full h-72 mb-8 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 3D Cards Container */}
      <div 
        ref={containerRef}
        className="relative h-full flex items-center justify-center perspective-1000"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1000px' }}
      >
        {cards.map((card, index) => {
          const cardStyle = getCardStyle(index);
          const isActive = index === currentIndex;
          
          return (
            <Card
              key={card.id}
              className={`absolute w-80 h-52 ${card.gradientClass} border-border cursor-pointer select-none will-change-transform transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-2xl`}
              style={cardStyle}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                {card.id === "empty-virtual" ? (
                  // Empty card with create button
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-6 h-6 text-primary" />
                      </div>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleCardClick(card.id)}
                        className="w-full"
                      >
                        Create Card
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Regular card content
                  <>
                    <div>
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
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Balance</p>
                          <p className="text-2xl font-bold text-foreground">{card.balance}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {cards.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 animate-fade-in"
            onClick={prevCard}
            disabled={isAnimating}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 animate-fade-in"
            onClick={nextCard}
            disabled={isAnimating}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {cards.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-40">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}