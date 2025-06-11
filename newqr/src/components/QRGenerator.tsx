import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Scan, Link, Mail, User, Type, Palette, Settings } from 'lucide-react';
import QRCode from 'qrcode';
import { useTheme } from '../contexts/ThemeContext';

type QRFormat = 'url' | 'text' | 'email' | 'contact';

interface QRData {
  format: QRFormat;
  content: string;
}

const formatIcons = {
  url: Link,
  text: Type,
  email: Mail,
  contact: User,
};

const formatLabels = {
  url: 'URL',
  text: 'Text',
  email: 'Email',
  contact: 'Contact',
};

const errorCorrectionLevels = {
  L: 'Low (~7%)',
  M: 'Medium (~15%)',
  Q: 'Quartile (~25%)',
  H: 'High (~30%)',
};

export const QRGenerator: React.FC = () => {
  const { currentTheme, qrCustomization, setQRCustomization } = useTheme();
  const [qrData, setQrData] = useState<QRData>({
    format: 'url',
    content: ''
  });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  // const [showCustomization, setShowCustomization] = useState(false);

  const generateQRCode = async (data: string) => {
    if (!data.trim()) {
      setQrCodeDataUrl('');
      return;
    }

    setIsGenerating(true);

    try {
      const qrCodeData = await QRCode.toDataURL(data, {
        width: qrCustomization.size,
        margin: qrCustomization.margin,
        color: {
          dark: qrCustomization.foregroundColor,
          light: qrCustomization.backgroundColor
        },
        errorCorrectionLevel: qrCustomization.errorCorrectionLevel
      });
      
      setTimeout(() => {
        setQrCodeDataUrl(qrCodeData);
        setIsGenerating(false);
      }, 500);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode(qrData.content);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [qrData.content, qrCustomization]);

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!qrData.content.trim() || !qrCodeDataUrl) {
      alert('Please generate a QR code first!');
      return;
    }

    try {
      if (format === 'png') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          const downloadSize = Math.max(qrCustomization.size, 800);
          canvas.width = downloadSize;
          canvas.height = downloadSize;
          
          if (ctx) {
            ctx.fillStyle = qrCustomization.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `qrcode-${Date.now()}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
            }, 'image/png');
          }
        };
        
        img.src = qrCodeDataUrl;
      } else {
        const svgString = await QRCode.toString(qrData.content, {
          type: 'svg',
          width: qrCustomization.size,
          margin: qrCustomization.margin,
          color: {
            dark: qrCustomization.foregroundColor,
            light: qrCustomization.backgroundColor
          },
          errorCorrectionLevel: qrCustomization.errorCorrectionLevel
        });
        
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Error downloading QR code. Please try again.');
    }
  };

  const handleFormatChange = (format: QRFormat) => {
    setQrData({ format, content: '' });
  };

  const getPlaceholderText = (format: QRFormat): string => {
    switch (format) {
      case 'url':
        return 'https://example.com';
      case 'text':
        return 'Enter your text here...';
      case 'email':
        return 'mailto:someone@example.com';
      case 'contact':
        return 'John Doe\n+1234567890\njohn@example.com';
      default:
        return '';
    }
  };

  const resetToThemeColors = () => {
    setQRCustomization({
      foregroundColor: currentTheme.primary,
      backgroundColor: currentTheme.background,
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: 'var(--theme-text)' }}
          >
            QR Generator
          </h1>
          <h4
            style={{ color: 'red' }}
          >
            You can change theam to your favorite 4 anime in Navbar
          </h4>
          <p 
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            Generate epic QR codes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <motion.div
            className="backdrop-blur-lg rounded-2xl border border-[var(--theme-primary)]/20 p-8"
            style={{ backgroundColor: 'var(--theme-surface)aa' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ 
              borderColor: 'var(--theme-primary)',
              boxShadow: '0 20px 40px var(--theme-glow)' 
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Scan 
                className="w-6 h-6"
                style={{ color: 'var(--theme-primary)' }}
              />
              <h2 
                className="text-2xl font-bold"
                style={{ color: 'var(--theme-text)' }}
              >
                Generate QR Code
              </h2>
            </div>

            {/* Format Selector */}
            <div className="mb-6">
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--theme-text)' }}
              >
                Format Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(formatIcons) as QRFormat[]).map((format) => {
                  const Icon = formatIcons[format];
                  return (
                    <motion.button
                      key={format}
                      onClick={() => handleFormatChange(format)}
                      className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center space-y-1 ${
                        qrData.format === format
                          ? 'border-[var(--theme-primary)] shadow-lg'
                          : 'border-[var(--theme-primary)]/30'
                      }`}
                      style={{ 
                        backgroundColor: qrData.format === format ? 'var(--theme-glow)' : 'var(--theme-surface)',
                        color: qrData.format === format ? 'var(--theme-primary)' : 'var(--theme-text-secondary)'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{formatLabels[format]}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--theme-text)' }}
              >
                Content
              </label>
              {qrData.format === 'contact' ? (
                <textarea
                  value={qrData.content}
                  onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                  placeholder={getPlaceholderText(qrData.format)}
                  className="w-full p-4 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm transition-all duration-200 focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-glow)] focus:outline-none resize-none"
                  style={{ 
                    backgroundColor: 'var(--theme-surface)',
                    color: 'var(--theme-text)'
                  }}
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={qrData.content}
                  onChange={(e) => setQrData({ ...qrData, content: e.target.value })}
                  placeholder={getPlaceholderText(qrData.format)}
                  className="w-full p-4 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm transition-all duration-200 focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-glow)] focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--theme-surface)',
                    color: 'var(--theme-text)'
                  }}
                />
              )}
            </div>

            {/* Download Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={() => handleDownload('png')}
                disabled={!qrCodeDataUrl}
                className="flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: qrCodeDataUrl ? 'var(--theme-primary)' : 'var(--theme-primary)50',
                  color: 'var(--theme-background)'
                }}
                whileHover={{ 
                  scale: qrCodeDataUrl ? 1.02 : 1,
                  boxShadow: qrCodeDataUrl ? '0 10px 30px var(--theme-glow)' : 'none'
                }}
                whileTap={{ scale: qrCodeDataUrl ? 0.98 : 1 }}
              >
                <Download className="w-5 h-5" />
                <span>PNG</span>
              </motion.button>
              <motion.button
                onClick={() => handleDownload('svg')}
                disabled={!qrCodeDataUrl}
                className="flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border border-[var(--theme-primary)] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: 'transparent',
                  color: qrCodeDataUrl ? 'var(--theme-primary)' : 'var(--theme-primary)50'
                }}
                whileHover={{ 
                  backgroundColor: qrCodeDataUrl ? 'var(--theme-glow)' : 'transparent',
                  scale: qrCodeDataUrl ? 1.02 : 1
                }}
                whileTap={{ scale: qrCodeDataUrl ? 0.98 : 1 }}
              >
                <Download className="w-5 h-5" />
                <span>SVG</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            className="backdrop-blur-lg rounded-2xl border border-[var(--theme-primary)]/20 p-8"
            style={{ backgroundColor: 'var(--theme-surface)aa' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ 
              borderColor: 'var(--theme-primary)',
              boxShadow: '0 20px 40px var(--theme-glow)' 
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Settings 
                  className="w-6 h-6"
                  style={{ color: 'var(--theme-primary)' }}
                />
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Customize QR
                </h2>
              </div>
            </div>

            {/* Color Controls */}
            <div className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Foreground Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={qrCustomization.foregroundColor}
                    onChange={(e) => setQRCustomization({ foregroundColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-[var(--theme-primary)]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={qrCustomization.foregroundColor}
                    onChange={(e) => setQRCustomization({ foregroundColor: e.target.value })}
                    className="flex-1 p-3 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm transition-all duration-200 focus:border-[var(--theme-primary)] focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--theme-surface)',
                      color: 'var(--theme-text)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Background Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={qrCustomization.backgroundColor}
                    onChange={(e) => setQRCustomization({ backgroundColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-[var(--theme-primary)]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={qrCustomization.backgroundColor}
                    onChange={(e) => setQRCustomization({ backgroundColor: e.target.value })}
                    className="flex-1 p-3 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm transition-all duration-200 focus:border-[var(--theme-primary)] focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--theme-surface)',
                      color: 'var(--theme-text)'
                    }}
                  />
                </div>
              </div>

              {/* Size Control */}
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Size: {qrCustomization.size}px
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="50"
                  value={qrCustomization.size}
                  onChange={(e) => setQRCustomization({ size: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, var(--theme-primary) 0%, var(--theme-primary) ${((qrCustomization.size - 200) / 600) * 100}%, var(--theme-surface) ${((qrCustomization.size - 200) / 600) * 100}%, var(--theme-surface) 100%)`
                  }}
                />
              </div>

              {/* Margin Control */}
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Margin: {qrCustomization.margin}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={qrCustomization.margin}
                  onChange={(e) => setQRCustomization({ margin: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, var(--theme-primary) 0%, var(--theme-primary) ${(qrCustomization.margin / 10) * 100}%, var(--theme-surface) ${(qrCustomization.margin / 10) * 100}%, var(--theme-surface) 100%)`
                  }}
                />
              </div>

              {/* Error Correction Level */}
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--theme-text)' }}
                >
                  Error Correction
                </label>
                <select
                  value={qrCustomization.errorCorrectionLevel}
                  onChange={(e) => setQRCustomization({ errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
                  className="w-full p-3 rounded-lg border border-[var(--theme-primary)]/30 backdrop-blur-sm transition-all duration-200 focus:border-[var(--theme-primary)] focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--theme-surface)',
                    color: 'var(--theme-text)'
                  }}
                >
                  {Object.entries(errorCorrectionLevels).map(([key, label]) => (
                    <option key={key} value={key}>{key} - {label}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <motion.button
                onClick={resetToThemeColors}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg border border-[var(--theme-primary)] font-medium transition-all duration-200"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--theme-primary)'
                }}
                whileHover={{ 
                  backgroundColor: 'var(--theme-glow)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Palette className="w-5 h-5" />
                <span>Use Theme Colors</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            className="backdrop-blur-lg rounded-2xl border border-[var(--theme-primary)]/20 p-8 flex flex-col items-center justify-center min-h-[500px]"
            style={{ backgroundColor: 'var(--theme-surface)aa' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ 
              borderColor: 'var(--theme-primary)',
              boxShadow: '0 20px 40px var(--theme-glow)' 
            }}
          >
            <h3 
              className="text-xl font-bold mb-8"
              style={{ color: 'var(--theme-text)' }}
            >
              Live Preview
            </h3>

            <div className="relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-64 h-64 rounded-lg border-2 border-dashed border-[var(--theme-primary)]/50 flex items-center justify-center">
                      <motion.div
                        className="w-8 h-8 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--theme-text-secondary)' }}
                    >
                      Generating epic QR code...
                    </p>
                  </motion.div>
                ) : qrCodeDataUrl ? (
                  <motion.div
                    key="qr-code"
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <img
                        src={qrCodeDataUrl}
                        alt="Generated QR Code"
                        className="w-64 h-64 rounded-2xl"
                        style={{ backgroundColor: qrCustomization.backgroundColor }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 border-2 rounded-2xl"
                        style={{ borderColor: 'var(--theme-primary)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent"
                        initial={{ y: 0 }}
                        animate={{ y: 256 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-64 h-64 rounded-2xl border-2 border-dashed flex items-center justify-center"
                      style={{ borderColor: 'var(--theme-primary)/50' }}
                    >
                      <Scan 
                        className="w-16 h-16 opacity-50"
                        style={{ color: 'var(--theme-primary)' }}
                      />
                    </div>
                    <p 
                      className="text-sm text-center max-w-xs"
                      style={{ color: 'var(--theme-text-secondary)' }}
                    >
                      Enter content to generate your anime-themed QR code
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};