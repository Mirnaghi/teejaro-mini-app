import { useEffect, useState } from 'react';

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
  };
  expand: () => void;
  close: () => void;
  ready: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, callback: () => void) => void;
  offEvent: (eventType: string, callback: () => void) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  requestViewport: (params: { height?: number; is_state_stable?: boolean; is_expanded?: boolean }) => void;
  requestFullscreen?: () => void;
  setAllowVerticalSwipe?: (allow: boolean) => void;
  disableVerticalSwipes?: () => void;
  enableVerticalSwipes?: () => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramWebApp['initDataUnsafe']['user'] | null>(null);
  const [isInTelegram, setIsInTelegram] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setWebApp(tg);
      setUser(tg.initDataUnsafe.user || null);
      setIsInTelegram(true);
      
      // Initialize the app
      tg.ready();
      tg.expand();
      
      // Request fullscreen viewport with stability
      if (typeof tg.requestViewport === 'function') {
        tg.requestViewport({
          is_expanded: true,
          is_state_stable: true
        });
      }
      
      // Enable full screen mode and prevent closing on swipe down
      if (typeof tg.enableClosingConfirmation === 'function') {
        tg.enableClosingConfirmation();
      }
      
      // Prevent viewport changes when closing
      if (typeof tg.onEvent === 'function') {
        tg.onEvent('viewportChanged', () => {
          if (!tg.isExpanded) {
            tg.expand();
            // Re-request stable viewport
            if (typeof tg.requestViewport === 'function') {
              tg.requestViewport({
                is_expanded: true,
                is_state_stable: true
              });
            }
          }
        });
      }
      
      // Set theme colors based on Telegram theme
      if (tg.colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Make app sticky - try multiple approaches to prevent vertical swipe closure
      if (typeof tg.setAllowVerticalSwipe === 'function') {
        tg.setAllowVerticalSwipe(false);
      } else if (typeof tg.disableVerticalSwipes === 'function') {
        tg.disableVerticalSwipes();
      }
      
      // Additional method to prevent closing
      if (typeof tg.onEvent === 'function') {
        tg.onEvent('settingsButtonClicked', () => {
          // Prevent settings closure
        });
      }
      
      // Set viewport to maximum height to reduce swipe sensitivity
      if (typeof tg.requestViewport === 'function') {
        tg.requestViewport({
          height: window.innerHeight,
          is_expanded: true,
          is_state_stable: true
        });
      }
      
      // Optionally request fullscreen for a more immersive experience
      if (typeof tg.requestFullscreen === 'function') {
        // Uncomment the line below if you want fullscreen mode
        // tg.requestFullscreen();
      }
      
      // Add CSS to prevent overscroll behavior
      document.body.style.overscrollBehavior = 'none';
      document.body.style.touchAction = 'pan-x pan-y';
      document.documentElement.style.overscrollBehavior = 'none';
    }
  }, []);

  const showBackButton = (callback: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(callback);
    }
  };

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide();
    }
  };

  const showMainButton = (text: string, callback: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text);
      webApp.MainButton.show();
      webApp.MainButton.onClick(callback);
    }
  };

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide();
    }
  };

  const hapticFeedback = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    if (webApp && 'HapticFeedback' in webApp) {
      (webApp as any).HapticFeedback.impactOccurred(style);
    }
  };

  return {
    webApp,
    user,
    isInTelegram,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
    hapticFeedback,
  };
};