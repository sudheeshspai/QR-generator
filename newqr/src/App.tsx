import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { Navbar } from './components/Navbar';
import { QRGenerator } from './components/QRGenerator';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <BackgroundAnimation />
        <Navbar />
        <main>
          <QRGenerator />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;