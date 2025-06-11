import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'dragon-ball' | 'attack-titan' | 'demon-slayer' | 'one-piece';
export type WebTheme = 'dark' | 'light';

export interface Theme {
  name: ThemeName;
  displayName: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  glow: string;
}

export interface QRCustomization {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const themes: Record<ThemeName, Theme> = {
  'dragon-ball': {
    name: 'dragon-ball',
    displayName: 'Dragon Ball',
    primary: '#ff6b00',
    secondary: '#ff9500',
    accent: '#ffb800',
    background: '#0a0604',
    surface: '#1a1208',
    text: '#ffffff',
    textSecondary: '#ffcc88',
    glow: '#ff6b0050',
  },
  'attack-titan': {
    name: 'attack-titan',
    displayName: 'Attack on Titan',
    primary: '#8b0000',
    secondary: '#654321',
    accent: '#ff4444',
    background: '#0f0505',
    surface: '#2a1a1a',
    text: '#ffffff',
    textSecondary: '#ccaaaa',
    glow: '#8b000050',
  },
  'demon-slayer': {
    name: 'demon-slayer',
    displayName: 'Demon Slayer',
    primary: '#4a90e2',
    secondary: '#2c5aa0',
    accent: '#87ceeb',
    background: '#050a0f',
    surface: '#0f1a2a',
    text: '#ffffff',
    textSecondary: '#aaccff',
    glow: '#4a90e250',
  },
  'one-piece': {
    name: 'one-piece',
    displayName: 'One Piece',
    primary: '#dc143c',
    secondary: '#b22222',
    accent: '#ff6347',
    background: '#0a0505',
    surface: '#1a0f0f',
    text: '#ffffff',
    textSecondary: '#ffaaaa',
    glow: '#dc143c50',
  },
};

const getWebThemeColors = (webTheme: WebTheme, animeTheme: Theme) => {
  if (webTheme === 'light') {
    return {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#1a1a1a',
      textSecondary: '#666666',
      // Keep anime theme colors for accents
      primary: animeTheme.primary,
      secondary: animeTheme.secondary,
      accent: animeTheme.accent,
      glow: animeTheme.glow,
    };
  }
  return animeTheme;
};

interface ThemeContextType {
  currentTheme: Theme;
  webTheme: WebTheme;
  qrCustomization: QRCustomization;
  setTheme: (themeName: ThemeName) => void;
  setWebTheme: (webTheme: WebTheme) => void;
  setQRCustomization: (customization: Partial<QRCustomization>) => void;
  themes: Record<ThemeName, Theme>;
}

const defaultQRCustomization: QRCustomization = {
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  size: 400,
  margin: 2,
  errorCorrectionLevel: 'H',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAnimeTheme, setCurrentAnimeTheme] = useState<Theme>(themes['dragon-ball']);
  const [webTheme, setWebTheme] = useState<WebTheme>('dark');
  const [qrCustomization, setQRCustomizationState] = useState<QRCustomization>(defaultQRCustomization);

  // Compute final theme based on web theme and anime theme
  const currentTheme = {
    ...currentAnimeTheme,
    ...getWebThemeColors(webTheme, currentAnimeTheme),
  };

  useEffect(() => {
    const savedAnimeTheme = localStorage.getItem('qrx-anime-theme') as ThemeName;
    const savedWebTheme = localStorage.getItem('qrx-web-theme') as WebTheme;
    const savedQRCustomization = localStorage.getItem('qrx-qr-customization');

    if (savedAnimeTheme && themes[savedAnimeTheme]) {
      setCurrentAnimeTheme(themes[savedAnimeTheme]);
    }
    if (savedWebTheme) {
      setWebTheme(savedWebTheme);
    }
    if (savedQRCustomization) {
      try {
        const parsed = JSON.parse(savedQRCustomization);
        setQRCustomizationState({ ...defaultQRCustomization, ...parsed });
      } catch (e) {
        console.error('Failed to parse QR customization from localStorage');
      }
    }
  }, []);

  const setTheme = (themeName: ThemeName) => {
    setCurrentAnimeTheme(themes[themeName]);
    localStorage.setItem('qrx-anime-theme', themeName);
  };

  const setWebThemeHandler = (newWebTheme: WebTheme) => {
    setWebTheme(newWebTheme);
    localStorage.setItem('qrx-web-theme', newWebTheme);
  };

  const setQRCustomization = (customization: Partial<QRCustomization>) => {
    const newCustomization = { ...qrCustomization, ...customization };
    setQRCustomizationState(newCustomization);
    localStorage.setItem('qrx-qr-customization', JSON.stringify(newCustomization));
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      webTheme,
      qrCustomization,
      setTheme, 
      setWebTheme: setWebThemeHandler,
      setQRCustomization,
      themes 
    }}>
      <div style={{ 
        '--theme-primary': currentTheme.primary, 
        '--theme-secondary': currentTheme.secondary, 
        '--theme-accent': currentTheme.accent, 
        '--theme-background': currentTheme.background, 
        '--theme-surface': currentTheme.surface, 
        '--theme-text': currentTheme.text, 
        '--theme-text-secondary': currentTheme.textSecondary, 
        '--theme-glow': currentTheme.glow 
      } as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};