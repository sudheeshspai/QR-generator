import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Sun, Moon, Palette, Github } from 'lucide-react';
import { useTheme, ThemeName, WebTheme } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const { currentTheme, webTheme, setTheme, setWebTheme, themes } = useTheme();
  const [isAnimeThemeDropdownOpen, setIsAnimeThemeDropdownOpen] = useState(false);
  const [isWebThemeDropdownOpen, setIsWebThemeDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['About', 'Contact'];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-[var(--theme-primary)]/20"
      style={{ backgroundColor: 'var(--theme-surface)aa' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Zap 
              className="w-8 h-8"
              style={{ color: 'var(--theme-primary)' }}
            />
            <span 
              className="text-2xl font-bold tracking-wider"
              style={{ color: 'var(--theme-text)' }}
            >
              Hash's QR
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) =>
              item === "About" ? (
                <motion.a
                  key={item}
                  href="https://sudheeshspai.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2"
                  style={{ color: 'var(--theme-text-secondary)' }}
                  whileHover={{ color: 'var(--theme-primary)', scale: 1.15 }}
                  title="Website"
                >
                  {/* Use a globe icon for website, fallback to Zap if you don't have a globe icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M2 12h20M12 2c2.5 3.5 2.5 16.5 0 20M12 2c-2.5 3.5-2.5 16.5 0 20" />
                  </svg>
                  <span className="ml-2">Website</span>
                </motion.a>
              ) : (
                <motion.a
                  key={item}
                  href="https://www.linkedin.com/in/sudheesh-s-pai-36ab8a290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-3 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--theme-text-secondary)' }}
                  whileHover={{ 
                    color: 'var(--theme-primary)',
                    scale: 1.05 
                  }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              )
            )}

            {/* GitHub Icon */}
            <motion.a
              href="https://github.com/sudheeshspai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2"
              style={{ color: 'var(--theme-text-secondary)' }}
              whileHover={{ color: 'var(--theme-primary)', scale: 1.15 }}
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>

            {/* Web Theme Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setIsWebThemeDropdownOpen(!isWebThemeDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-text)' 
                }}
                whileHover={{ 
                  borderColor: 'var(--theme-primary)',
                  boxShadow: '0 0 15px var(--theme-glow)' 
                }}
                whileTap={{ scale: 0.95 }}
              >
                {webTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-sm font-medium">{webTheme === 'dark' ? 'Dark' : 'Light'}</span>
                <motion.div
                  animate={{ rotate: isWebThemeDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isWebThemeDropdownOpen && (
                  <motion.div
                    className="absolute top-full mt-2 right-0 w-32 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-lg overflow-hidden"
                    style={{ backgroundColor: 'var(--theme-surface)' }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {(['dark', 'light'] as WebTheme[]).map((theme) => (
                      <motion.button
                        key={theme}
                        onClick={() => {
                          setWebTheme(theme);
                          setIsWebThemeDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm font-medium transition-colors duration-200 border-b border-[var(--theme-primary)]/10 last:border-b-0 flex items-center space-x-2"
                        style={{ 
                          color: webTheme === theme ? 'var(--theme-primary)' : 'var(--theme-text-secondary)',
                          backgroundColor: webTheme === theme ? 'var(--theme-glow)' : 'transparent'
                        }}
                        whileHover={{ 
                          backgroundColor: 'var(--theme-glow)',
                          color: 'var(--theme-primary)' 
                        }}
                      >
                        {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                        <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Anime Theme Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setIsAnimeThemeDropdownOpen(!isAnimeThemeDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-text)' 
                }}
                whileHover={{ 
                  borderColor: 'var(--theme-primary)',
                  boxShadow: '0 0 15px var(--theme-glow)' 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">{currentTheme.displayName}</span>
                <motion.div
                  animate={{ rotate: isAnimeThemeDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isAnimeThemeDropdownOpen && (
                  <motion.div
                    className="absolute top-full mt-2 right-0 w-48 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-lg overflow-hidden"
                    style={{ backgroundColor: 'var(--theme-surface)' }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.values(themes).map((theme) => (
                      <motion.button
                        key={theme.name}
                        onClick={() => {
                          setTheme(theme.name);
                          setIsAnimeThemeDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 border-b border-[var(--theme-primary)]/10 last:border-b-0"
                        style={{ 
                          color: currentTheme.name === theme.name ? theme.primary : 'var(--theme-text-secondary)',
                          backgroundColor: currentTheme.name === theme.name ? 'var(--theme-glow)' : 'transparent'
                        }}
                        whileHover={{ 
                          backgroundColor: 'var(--theme-glow)',
                          color: 'var(--theme-primary)' 
                        }}
                      >
                        {theme.displayName}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              className="p-2 rounded-lg"
              style={{ color: 'var(--theme-primary)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Open menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <div className="w-full h-0.5 bg-current mb-1"></div>
                <div className="w-full h-0.5 bg-current mb-1"></div>
                <div className="w-full h-0.5 bg-current"></div>
              </div>
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden flex flex-col space-y-2 mt-2 p-4 rounded-lg border border-[var(--theme-primary)]/30 bg-[var(--theme-surface)] shadow-lg"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) =>
                item === "About" ? (
                  <a
                    key={item}
                    href="https://sudheeshspai.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-base font-medium"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path stroke="currentColor" strokeWidth="2" d="M2 12h20M12 2c2.5 3.5 2.5 16.5 0 20M12 2c-2.5 3.5-2.5 16.5 0 20" />
                    </svg>
                    Website
                  </a>
                ) : (
                  <a
                    key={item}
                    href="https://www.linkedin.com/in/sudheesh-s-pai-36ab8a290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-base font-medium"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    {item}
                  </a>
                )
              )}
              <a
                href="https://github.com/sudheeshspai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-base font-medium"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
              {/* Mobile Theme Switchers */}
              <div className="flex flex-col space-y-2 mt-2">
                {/* Web Theme Switcher */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setWebTheme(webTheme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center px-3 py-2 rounded-lg border border-[var(--theme-primary)]/30"
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      color: 'var(--theme-text)',
                      width: '100%',
                    }}
                  >
                    {webTheme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    <span className="text-sm font-medium">{webTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
                  </button>
                </div>
                {/* Anime Theme Switcher */}
                <div className="flex flex-col space-y-1">
                  {Object.values(themes).map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => setTheme(theme.name)}
                      className="w-full px-3 py-2 rounded-lg text-left text-sm font-medium border border-[var(--theme-primary)]/10 flex items-center"
                      style={{
                        color: currentTheme.name === theme.name ? theme.primary : 'var(--theme-text-secondary)',
                        backgroundColor: currentTheme.name === theme.name ? 'var(--theme-glow)' : 'transparent'
                      }}
                    >
                      {/* Add emoji or icon for popular anime themes */}
                      {theme.name === ('black' as ThemeName) && (
                        <span className="mr-2 animate-bounce"></span>
                      )}
                      {theme.name === ('orange' as ThemeName) && <span className="mr-2"></span>}
                      {theme.name === ('blue' as ThemeName) && <span className="mr-2"></span>}
                      {theme.name === ('light read' as ThemeName) && <span className="mr-2"></span>}
                      {theme.name === ('demon-slayer' as ThemeName) && <span className="mr-2"></span>}
                      {/* fallback: no icon */}
                      {theme.displayName}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};